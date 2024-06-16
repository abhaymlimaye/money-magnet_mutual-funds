import { StyleSheet, View, Text, Pressable, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import theme from '../theme';

export function TileOrder({ orderId, orderType, fundName, amount, status, timestamp, error }) {
    const [statusIndicator] = useState({
        "pending": { label: "Processing", iconName: "clock", color: "darkcyan" },
        "complete": { label: "Complete", iconName: "check-circle", color: "green" },
        "failed": { label: "Failed", iconName: "times-circle", color: "red" }
    });
    const [ordertypeIndicator] = useState({
        "buy": { label: "Buy", iconName: "shopping-bag", color: theme.colors.blue },
        "sell": { label: "Sell", iconName: "coins", color: theme.colors.yellow }
    });
   
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formatedTimestamp = timestamp => {
        const date = new Date(timestamp);
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
    }

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.ordertypeContainer}>
                <FontAwesome5 name={ordertypeIndicator[orderType].iconName} color={ordertypeIndicator[orderType].color} size={20}/>
                <Text style={styles.headerText}>  {ordertypeIndicator[orderType].label} Order</Text>
            </View>
            

            <View style={styles.amountContainer}>
                <Text>Amount: </Text>
                <Text style={styles.amountText}>${amount}</Text>
            </View>
        </View>

        <Text style={styles.subheaderText}>{fundName}</Text>

        <View style={styles.timeAndStatusContainer}>
            <Text>{formatedTimestamp(timestamp)}</Text>

            <View style={styles.statusContainer}>
                <FontAwesome5 name={statusIndicator[status].iconName} color={statusIndicator[status].color} size={15}/>
                <Text style={{...styles.statusText, color: statusIndicator[status].color}}>  {statusIndicator[status].label}</Text>
            </View>
        </View>

        { error && (<View style={styles.errorContainer}>
            <FontAwesome5 name="exclamation-circle"  size={15}/>
            <Text style={styles.errorText}>  {error}</Text>
        </View>) }

        <Text style={styles.orderidText}>Order ID: {orderId}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: 'white',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    ordertypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    amountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'dimgray'
    },
    subheaderText: {
        fontSize: 17,
        //fontWeight: 'bold',
        marginBottom: 15
    },
    timeAndStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        fontWeight: 'bold'
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginBottom: 15,
        backgroundColor: '#f8d7da',
    },
    errorText: {
        //color: 'gray',
        fontStyle: 'italic'
    },
    orderidText: {
        color: 'gray',
    }
});