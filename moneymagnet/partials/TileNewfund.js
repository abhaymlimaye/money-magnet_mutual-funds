import { StyleSheet, View, Text, Pressable, Button } from 'react-native';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { ModalBuyOrSell } from './ModalBuyOrSell';
import theme from '../theme';

export function TileNewfund({ symbol, name, fund_family, performance_rating, risk_rating }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Pressable style={isExpanded ? styles.containerExpanded : styles.container} onPress={()=>setIsExpanded(!isExpanded)}> 
        <Text style={styles.headerText}>{name}</Text>

        <View style={styles.fundfamilyContainer}>
            <Text style={styles.fundfamilyLabel}>Managed by: </Text>
            <Text style={styles.fundfamilyValue}>{fund_family}</Text>
        </View>

        <View style={styles.ratingsContainer}>
            <View style={styles.performanceContainer}>
                <FontAwesome5 name="chart-line" size={15} color={"green"}/>
                <Text style={styles.performanceText}>Performance:  {performance_rating!==null ? performance_rating : "NA"}</Text>
            </View>

            <View style={styles.riskContainer}>
                <FontAwesome5 name="radiation-alt" size={15} color={"red"}/>
                <Text style={styles.riskText}>Risk:  {risk_rating!==null ? risk_rating : "NA"}</Text>
            </View>
        </View>

        {isExpanded && <View style={styles.buttonsContainer}>  
            <Button title='SIP' disabled={true}/>
            <Text>  </Text>
            <Button title='BUY' color={theme.colors.blue} onPress={()=>setShowModal(true)}/>
        </View>}
      </Pressable>

        <ModalBuyOrSell orderType="buy" fundName={name} fundId={symbol} showModal={showModal} setShowModal={setShowModal}/>
    </>
  );
}

/**
 * {
        "symbol": "QCGRIX",
        "name": "CREF Growth Account - R3",
        "country": "United States",
        "fund_family": "",
        "fund_type": "",
        "performance_rating": null,
        "risk_rating": null,
        "currency": "USD",
        "exchange": "NASDAQ",
        "mic_code": "XNAS"
    }
 */

const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: 'white',
    },
    containerExpanded: {
        padding: 15,
        //backgroundColor: '#f0f0f0',
        backgroundColor: theme.colors.lightGray,
    },
    headerText: {
      fontSize: 17,
      fontWeight: 'bold',
        marginBottom: 10
    },
    fundfamilyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 15
    },
    fundfamilyLabel: {
        color: 'dimgray'
    },
    fundfamilyValue: {
        fontSize: 15,
        fontWeight: '500',
        color: 'dimgray'
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    performanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: 'green',
    }, 
    performanceText: {
        color: 'green',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    riskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,    
    },
    riskText: {
        color: 'red',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    buttonsContainer: {
        marginTop: 15,
    },
});