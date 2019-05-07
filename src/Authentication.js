import React from 'react'
import { StyleSheet, TouchableHighlight, Text, View, Alert } from 'react-native'
import TouchID from 'react-native-touch-id'

export default class Authentication extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            biometricType: null,
            error: null
        }
    }

    async componentDidMount() {
        this.setState({isLoading: true})

        try {
            const isTouchIdSupported = await TouchID.isSupported()
            this.setState({biometricType: isTouchIdSupported})
        } catch(e) {
            this.setState({error: 'No authentication method found'})
        }

        this.setState({isLoading: false})
    }

    async _pressHandler() {
        this.setState({error: null})

        try {
            await TouchID.authenticate('Use your biometric authentication to login.', {
                fallbackLabel: 'Use passcode',
                passcodeFallback: true
            })
            Alert.alert('Authenticated Successfully')
        } catch(error) {
            Alert.alert('Authentication Failed')
            this.setState({error: error.message})
        }
    }

    render() {
        const { isLoading, biometricType, error } = this.state
        return (
            <View style={styles.container}>
                {isLoading &&
                        <Text style={styles.welcome}>Loading...</Text>
                }
                <TouchableHighlight style={styles.button} onPress={() => this._pressHandler()}>
                    <Text style={styles.buttonText}>Authenticate with {biometricType || 'Passcode'}</Text>
                </TouchableHighlight>
                {error &&
                    <Text style={styles.error}>{error}</Text>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    error: {
        textAlign: 'center',
        color: 'red'
    },
    buttonText: {
        color: '#ffffff',
    },
    button: {
        margin: 10,
        borderRadius: 4,
        borderWidth: 0.5,
        backgroundColor: '#1462FF',
        paddingVertical: 15,
        paddingHorizontal: 10,
    }
})