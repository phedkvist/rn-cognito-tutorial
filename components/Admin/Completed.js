import React from 'react'
import { View, Text, SectionList, StyleSheet, FlatList } from 'react-native';



  const styles = StyleSheet.create({
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });
  

export default function Completed(props) {
    return (
        <View>
            <Text>Completed - {props.todayCompletedOrder.length}</Text>

            <FlatList
            data={props.todayCompletedOrder}
            keyExtractor={({ order_no }, index) => order_no}
            renderItem={({ item }) => (
              <Text>{item.order_no + '. ' + item.order_status}</Text>
            )}
          />
            
        </View>
    )
}
