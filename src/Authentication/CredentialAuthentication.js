import React from 'react'
import { Redirect } from 'react-router-native'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class CredentialAuthentication extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            error: null,
            isLoading: false,
            isAuthenticated: false,
        }
    }

    _clickLogin = async () => {
        this.setState({ error: null, isLoading: true })
        const { username, password } = this.state

        if (username === 'Admin' && password === 'Admin') {
            await this._storeAccessToken()
            await this._storeRefreshToken()
            setTimeout(() => {
                this.setState({ isLoading: false, isAuthenticated: true })
            }, 500)
        } else {
            this.setState({ error: 'Wrong', isLoading: false })
        }

    }

    _storeAccessToken = async () => {
        try {
            await AsyncStorage.setItem('access_token', '123')
        } catch (error) {
            throw error
        }
    }

    _storeRefreshToken = async () => {
        try {
            await AsyncStorage.setItem('refresh_token', '123')
        } catch (error) {
            throw error
        }
    }

    render() {
        const { username, password, error, isLoading, isAuthenticated } = this.state
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={value => this.setState({ username: value })}
                    value={username}
                    placeholder="Username"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={value => this.setState({ password: value })}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                />

                {error &&
                    <Text style={styles.error}>{error}</Text>
                }

                <Button
                    onPress={() => this._clickLogin()}
                    disabled={isLoading}
                    title="Login"
                    color="#1462FF"
                />

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
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    input: {
        borderColor: 'black',
        borderRadius: 4,
        borderWidth: 0.3,
        width: '100%',
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    button: {
        margin: 10,
        borderRadius: 4,
        backgroundColor: '#1462FF',
        paddingVertical: 15,
        paddingHorizontal: 10,
        minWidth: 150
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center'
    },
    error: {
        textAlign: 'center',
        color: 'red'
    },
})
