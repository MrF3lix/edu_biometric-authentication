import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text, Button, StyleSheet } from 'react-native'

const LogoutComplete = async () => {
    try {
        await AsyncStorage.removeItem('access_token')
        await AsyncStorage.removeItem('refresh_token')
    } catch (e) {
        throw e
    }
}

const SmallLogout = async () => {
    try {
        await AsyncStorage.removeItem('access_token')
    } catch (e) {
        throw e
    }
}

const Private = () => (
    <View style={styles.container}>
        <Text>Private</Text>
        <Button
            onPress={() => SmallLogout()}
            title="Small logout"
            color="#1462FF"
        />
        <Button
            onPress={() => LogoutComplete()}
            title="Complete logout"
            color="#1462FF"
        />
    </View>
)

export default Private

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
