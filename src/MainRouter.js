import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'
import Public from './Public'
import Private from './Private'
import PrivateRoute from './_shared/PrivateRoute'
import BiometricAuthentication from './Authentication/BiometricAuthentication'
import CredentialAuthentication from './Authentication/CredentialAuthentication'

const MainRouter = () => (
    <View style={styles.container}>
        <NativeRouter>
            <Route exact path="/" component={Public} />
            <PrivateRoute exact path="/private" component={Private} />
            <Route exact path="/login" component={BiometricAuthentication} />
            <Route exact path="/login/credentials" component={CredentialAuthentication} />
            <View style={styles.nav}>
                <Link to="/">
                    <Text style={styles.linkText}>Public</Text>
                </Link>
                <Link to="/private">
                    <Text style={styles.linkText}>Private</Text>
                </Link>
            </View>
        </NativeRouter>
    </View>
)

export default MainRouter

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 25
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        padding: 20,
    },
    linkText: {
        color: '#1462FF',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#1462FF'
    }
})
