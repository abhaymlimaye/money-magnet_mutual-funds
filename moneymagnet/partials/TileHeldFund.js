import { StyleSheet, View, Text, Pressable, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { ModalBuyOrSell } from './ModalBuyOrSell';
import theme from '../theme';

export function TileHeldFund({ fundId, fundName, amount }) {
    useEffect(() => {
        // Simulate profit/loss change every 3 seconds
        setInterval(() => {
            const pnl = (Math.random() * 2 - 1)/8;   // Simulated profit/loss value between -1/8 and 1/8
            setSimulatedProfitLoss(pnl);
            setProfitLossStatus(pnl > 0 ? "profit" : pnl < 0 ? "loss" : "none");
        }, 8000);
    }, []);

    const [isExpanded, setIsExpanded] = useState(false);
    const [modalType, setModalType] = useState(null);

    const [simulatedProfitLoss, setSimulatedProfitLoss] = useState(0);
    const [profitLossStatus, setProfitLossStatus] = useState("none");
    const [profitLossIndicator] = useState({
        "profit": { iconName: "caret-up", color: "green" },
        "loss": { iconName: "caret-down", color: "red" },
        "none": { iconName: "minus", color: "orange" }
    });

  return (
    <>
      <Pressable style={isExpanded ? styles.containerExpanded : styles.container} onPress={()=>setIsExpanded(!isExpanded)}> 
        <Text style={styles.headerText}>{fundName}</Text>

        <View style={styles.subheaderContainer}>
            <View style={styles.fundidContainer}>
                <Text style={styles.fundidLabel}>Symbol: </Text><Text style={styles.fundidValue}>{fundId}</Text>
            </View>
            
            <View style={styles.performanceContainer}>
                <Text style={{...styles.performanceText, color: profitLossIndicator[profitLossStatus]?.color}}>{(simulatedProfitLoss * 100).toFixed(2)}%   </Text>
                <FontAwesome5 name={profitLossIndicator[profitLossStatus]?.iconName} color={profitLossIndicator[profitLossStatus]?.color} size={25}/>       
            </View>
        </View>

        <View style={styles.detailsContainer}>
            <View>
                <Text>P&L</Text>
                <Text style={styles.detailsValue}>${(simulatedProfitLoss * amount).toFixed(2)}</Text>
            </View>

            <View>
                <Text>Invested</Text>
                <Text style={styles.detailsValue}>${amount}</Text>
            </View>

            <View style={styles.detailsCurrentContainer}>
                <Text>Current</Text>
                <Text style={styles.detailsValue}>${(amount + (simulatedProfitLoss * amount)).toFixed(2)}</Text>
            </View>
        </View>

        {isExpanded && <View style={styles.buttonsContainer}>  
            <Button title='SELL' color={theme.colors.yellow} onPress={()=>setModalType("sell")}/>
            <Text>  </Text>
            <Button title='BUY' color={theme.colors.blue} onPress={()=>setModalType("buy")}/>
        </View>}
      </Pressable>

        <ModalBuyOrSell orderType={modalType} fundName={fundName} fundId={fundId} showModal={!!modalType} setShowModal={() => setModalType(null)}/>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: 'white',
    },
    containerExpanded: {
        padding: 15,
        backgroundColor: theme.colors.lightGray,
    },
    headerText: {
      fontSize: 17,
      fontWeight: 'bold',
        marginBottom: 10
    },
    subheaderContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    fundidContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    fundidLabel: {
        color: 'dimgray'
    },
    fundidValue: {
        fontWeight: 'bold',
        color: 'dimgray'
    },
    performanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    performanceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'dimgray'
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    detailsValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    detailsCurrentContainer: {
        backgroundColor: theme.colors.lightGray, 
        paddingVertical: 5, 
        paddingHorizontal: 8, 
        borderRadius: 5
    },
    buttonsContainer: {
        marginTop: 15,
    }
});