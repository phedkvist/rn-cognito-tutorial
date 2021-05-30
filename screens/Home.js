import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import Auth from '@aws-amplify/auth';
import axios from 'axios';
import NewOrder from '../components/Admin/NewOrder';
import InProgress from '../components/Admin/InProgress';
import Transit from '../components/Admin/Transit';
import Completed from '../components/Admin/Completed';
//import { AsyncStorage } from '@aws-amplify/core';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  //  justifyContent: 'center',
    alignItems: 'center',
//    top:50,
    backgroundColor: 'red'

   // position:'absolute',

  },
  text: {
    textAlign: 'center'
  },
  footer:{
    alignItems: 'center',
    bottom:50,
    position:'absolute',

  }
});

export default function Home({ signOut }) {

  const [todaysOrder, setTodaysOrder] = useState('');
  const [todayNewOrder, setTodayNewOrder] = useState('');
  const [todayAcceptedOrder, setTodayAcceptedOrder] = useState('');
  const [todayTransitOrder, setTodayTransitOrder] = useState('');
  const [todayCompletedOrder, setTodayCompletedOrder] = useState('');
  const [todayNewOrderShow, setTodayNewOrderShow] = useState(false);
  const [todayAcceptedOrderShow, setTodayAcceptedOrderShow] = useState(false);
  const [todayTransitOrderShow, setTodayTransitOrderShow] = useState(false);
  const [todayCompletedOrderShow, setTodayCompletedOrderShow] = useState(false);


 const handleNewClick=async() => {
  setTodayNewOrderShow(true);
  setTodayAcceptedOrderShow(false);
  setTodayTransitOrderShow(false);
  setTodayCompletedOrderShow(false);

 }

 const handleAcceptedClick=async() => {
  setTodayNewOrderShow(false);
  setTodayAcceptedOrderShow(true);
  setTodayTransitOrderShow(false);
  setTodayCompletedOrderShow(false);

 }

 const handleTransitClick=async() => {
  setTodayNewOrderShow(false);
  setTodayAcceptedOrderShow(false);
  setTodayTransitOrderShow(true);
  setTodayCompletedOrderShow(false);

 }

 const handleCompletedClick=async() => {
  setTodayNewOrderShow(false);
  setTodayAcceptedOrderShow(false);
  setTodayTransitOrderShow(false);
  setTodayCompletedOrderShow(true);

 }


  const validateUser=async()=>{
    const user = await Auth.currentAuthenticatedUser();
    //console.log("User : ", user);
    const session = await Auth.currentSession();
    const access_token=session.idToken.jwtToken;
    const branch_id="BN01";
    const api_key="gsIQPdhCyw4e2N027vuwJ8kaR5OCYbPIROh4FQh1";
    const api_url="https://5u2flh2gtk.execute-api.eu-west-2.amazonaws.com/dev";
    await axios.get(`${api_url}/admin/todayorder/${branch_id}`,{
      headers: {
        Authorization: access_token,
        'x-api-key':api_key
      }
    }).then((response) => {
     // console.log("Response Received : ", response.data);
    setTodaysOrder(response.data);
    const tempTodayOrder=response.data;
    const todayNewOrder=tempTodayOrder.filter(order => order.order_status === "New").map(order => order);
    const todayAcceptedOrder=tempTodayOrder.filter(order => order.order_status === "Accepted").map(order => order);
    const todayTransitOrder=tempTodayOrder.filter(order => order.order_status === "Transit").map(order => order);
    const todayCompletedOrder=tempTodayOrder.filter(order => order.order_status === "Delivered").map(order => order);
    setTodayNewOrder(todayNewOrder);
    setTodayAcceptedOrder(todayAcceptedOrder);
    setTodayTransitOrder(todayTransitOrder);
    setTodayCompletedOrder(todayCompletedOrder);
    //alert("completed order : ", todayCompletedOrder.length);
    //console.log("New Order : ", todayCompletedOrder);
    });
    
       
   // alert("User : ", user);

  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Burger Nations Dashboard</Text>
      <Text style={styles.text}>Today's Order - {todaysOrder.length}</Text>
      <View style={styles.header}>

      <Button onPress={()=>handleNewClick()}>New - {todayNewOrder.length}</Button>
      <Button onPress={()=>handleAcceptedClick()}> Processing - {todayAcceptedOrder.length}</Button>
      <Button onPress={()=>handleTransitClick()}> Delivering - {todayTransitOrder.length}</Button>
      <Button onPress={()=>handleCompletedClick()}> Completed - {todayCompletedOrder.length}</Button>
    </View>
    <View>
      {(todayNewOrderShow)?<NewOrder todayNewOrder={todayNewOrder}/>:(todayAcceptedOrderShow)?<InProgress todayAcceptedOrder={todayAcceptedOrder}/>:(todayTransitOrderShow)?<Transit />:(todayCompletedOrderShow)?<Completed todayCompletedOrder={todayCompletedOrder}/>:<Text> </Text>}
     </View>
     <View style={styles.footer}> 
     <Button onPress={() => validateUser()}>Refresh Data</Button>

      <Button onPress={() => signOut()}>Sign Out</Button>
    </View>

    </View>
  )
}
