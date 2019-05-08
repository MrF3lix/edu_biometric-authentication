import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { Route, Redirect } from 'react-router-native'

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: null,
            hasRefreshToken: null,
            isLoading: false
        }
    }

    componentDidMount = async () => {
        this._updateAuthorizationStatus()
    }

    componentDidUpdate = async () => {
        if(!this.state.isLoading) {
            this._updateAuthorizationStatus()
        }
    }

    _updateAuthorizationStatus = async () => {
        this.setState({ isLoading: true })

        const isAuthenticated = await this._checkStorageForAuthentication()
        const hasRefreshToken = await this._checkStorageForRefreshToken()

        this.setState({ isLoading: false, isAuthenticated, hasRefreshToken })
    }

    _checkStorageForRefreshToken = async () => {
        try {
            const refresh_token = await AsyncStorage.getItem('refresh_token')
            return refresh_token != null
        } catch (error) {
            return false
        }
    }

    _checkStorageForAuthentication = async () => {
        try {
            const access_token = await AsyncStorage.getItem('access_token')
            return access_token != null
        } catch (error) {
            return false
        }
    }

    render() {
        const { component: Component, ...props } = this.props
        const { hasRefreshToken, isAuthenticated } = this.state

        return (
            <Route
                {...props}
                render={props => (
                    <React.Fragment>
                        {isAuthenticated === true &&
                            <Component {...props} />
                        }
                        {hasRefreshToken === true && isAuthenticated === false &&
                            <Redirect to="/login" />
                        }
                        {hasRefreshToken === false && isAuthenticated === false &&
                            <Redirect to="/login/credentials" />
                        }
                    </React.Fragment>
                )}
            />
        )
    }
}


export default PrivateRoute
