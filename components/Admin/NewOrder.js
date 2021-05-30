import React from 'react'
import { View, Text } from 'react-native'

export default function NewOrder(todayNewOrder) {
    return (
        <View>
            <Text>New Order - {todayNewOrder.length}</Text>
        </View>
    )
}
