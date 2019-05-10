import React from 'react'
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native'
import { Redirect } from 'react-router-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Link } from 'react-router-native'
import TouchID from 'react-native-touch-id'

export default class BiometricAuthentication extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            biometricType: null,
            error: null,
            isAuthenticated: null
        }
    }

    async componentDidMount() {
        try {
            const isTouchIdSupported = await TouchID.isSupported()
            this.setState({ biometricType: isTouchIdSupported })
        } catch (e) {
            this.setState({ error: 'No authentication method found' })
        }
    }

    async _pressHandler() {
        this.setState({ error: null })

        try {
            await TouchID.authenticate('Use your biometric authentication to login.', {
                fallbackLabel: 'Use passcode',
                passcodeFallback: true
            })
            await AsyncStorage.setItem('refresh_token', '123')
            await AsyncStorage.setItem('access_token', '123')
            setTimeout(() => {
                this.setState({ isAuthenticated: true })
            }, 500)
        } catch (error) {
            this.setState({ error: error.message, isAuthenticated: false })
        }
    }

    _navigateToLogin() {

    }

    render() {
        const { biometricType, error, isAuthenticated } = this.state
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.button} onPress={() => this._pressHandler()}>
                    <Text style={styles.buttonText}>Authenticate with {biometricType || 'Passcode'}</Text>
                </TouchableHighlight>

                <Link to="/login/credentials">
                    <Text style={styles.linkText}>Use username/password to login</Text>
                </Link>

                {error &&
                    <Text style={styles.error}>{error}</Text>
                }

                {isAuthenticated &&
                    <Redirect to="/private" />
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    error: {
        textAlign: 'center',
        color: 'red'
    },
    button: {
        margin: 10,
        borderRadius: 4,
        backgroundColor: '#1462FF',
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: '#ffffff',
    },
    linkText: {
        color: '#1462FF',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#1462FF'
    }
})
