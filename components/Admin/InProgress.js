import React from 'react';
import { View, Text,StyleSheet, FlatList } from 'react-native';
import Auth from '@aws-amplify/auth';
import axios from 'axios';


import Button from '../Button';



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
    },
    Button:{
     //    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    bottom:150,
    position:'absolute',

    
    }
  });
  


export default function InProgress(props) {

    const handleDeliveryClick =async(order_no)=>{
        console.log("Button clicked for Order : ",order_no);
        const session = await Auth.currentSession();
        // console.log("Session :", session.accessToken.payload.username);
         //console.log("Session :", session.idToken.jwtToken);
        const access_token=session.idToken.jwtToken;
         const orderedby=session.accessToken.payload.username;
         const api_key="gsIQPdhCyw4e2N027vuwJ8kaR5OCYbPIROh4FQh1";
   // const api_url="https://5u2flh2gtk.execute-api.eu-west-2.amazonaws.com/dev";
    const api_url="https://apiv1.burgernations.co.uk";

    
         const next_state="Transit";
         const branchid="BN01";
                   const params = {
               "order_status": next_state,
               "order_no":order_no,
               "order_accepted_by":orderedby,
               "branch_id" : branchid
               };
             //console.log("Inputs received :", params);
             //console.log("processing update for email ID : ", username);
             await axios.patch(`${api_url}/orders/neworder/${order_no}`, params,{
               headers: {
                 Authorization: access_token,
                 'x-api-key':api_key
   
               }
             }).then((response) => console.log("Response : ", response));
         
    }

    return (
        <View>
            <Text>InProgress - {props.todayAcceptedOrder.length}</Text>

            <FlatList
            data={props.todayAcceptedOrder}
            keyExtractor={({ order_no }, index) => order_no}
            renderItem={({ item }) => (
                <View>
              <Text>{item.order_no + '. ' + item.order_status}</Text>
              <Button onPress={()=>{handleDeliveryClick(item.order_no)}}>Ready for Delivery</Button>
              </View>
              
            
            )}
          />
         </View>
    )
}
