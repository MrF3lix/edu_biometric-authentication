import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Public = () => (
    <View style={styles.container}>
        <Text>Public</Text>
    </View>
)

export default Public

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
