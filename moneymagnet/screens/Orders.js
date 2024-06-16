import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SearchBar } from '../partials/SearchBar';
import { TileOrder } from '../partials/TileOrder';
import { SeparatorHorizontal } from '../partials/SeparatorHorizontal';
import { LoadingIndicator } from '../partials/LoadingIndicator';
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../theme';
import rtdb from '../data/RealtimeDatabase';

export function Orders({ route }) {
  const [orders, setOrders] = useState([]);
  const [ordersBackup, setOrdersBackup] = useState([]);

  const [headerText, setHeaderText] = useState('Orders');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getOrders(); 
  }, []);

 

  const handleSearchTextChange = searchText => {
    if (searchText != "") {
      setHeaderText('Search Results');
      setOrders(prevOrders => prevOrders.filter(order => order.fundName.toLowerCase().includes(searchText.toLowerCase())));
    } 
    else {
      setHeaderText('Orders');
      setOrders(ordersBackup);
    }
  }

  const getOrders = () => {
    setIsLoading(true);
    rtdb.getOrders(data => {
      setOrders(data);
      setOrdersBackup(data);
      setIsLoading(false);
    })
  }

  return (
    <>
      <SearchBar placeholder='Search orders...' onTextChange={handleSearchTextChange}/> 

      <ScrollView style={styles.container}>
        { route.params.isNewOrderPlaced && (
          <View style={styles.newOrderIndicatorContainer}>
              <FontAwesome5 name="check-double" size={20}/>
              <Text style={styles.newOrderIndicatorText}>Order Placed. Check the status below.</Text>
          </View>
        )}   

        <Text style={styles.headerText}>{headerText}</Text>

        { isLoading && <LoadingIndicator/> }

        { (!isLoading && orders) && orders
          .map((order, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <SeparatorHorizontal />}
  
              <TileOrder
                orderId={order.orderId}
                orderType={order.orderType}
                fundName={order.fundName}
                amount={order.amount}
                status={order.status}
                timestamp={order.timestamp}
                error={order.error}
              />
            </React.Fragment>
          )) }
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: 'white',
    },
    newOrderIndicatorContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.lightGray,
      padding: 15,
      borderRadius: 15,
    },
    newOrderIndicatorText: {
      fontWeight: 'bold',
      fontSize: 20,
      marginLeft: 15,
    },
    headerText: {
      fontSize: 20,
      marginVertical: 15,
    },
});