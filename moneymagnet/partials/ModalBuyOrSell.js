import { View, Text, Pressable, Modal, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import theme from '../theme';
import rtdb from '../data/RealtimeDatabase';

export function ModalBuyOrSell({orderType, fundId, fundName, showModal, setShowModal}) {
    const navigation = useNavigation();

    const [ordertypeIndicator] = useState({
        "buy": { 
            headerLabel: "Buy Order",
            inputLabel: "Investment Amount",
            btnLabel: "BUY",
            alertLabel: "Buy",
            iconName: "shopping-bag", 
            color: theme.colors.blue,
            backgroundColor: theme.colors.lightBlue
        },
        "sell": { 
            headerLabel: "Sell Order",
            inputLabel: "Redemption Amount", 
            btnLabel: "SELL",
            alertLabel: "Sell",
            iconName: "coins", 
            color: theme.colors.yellow,
            backgroundColor: theme.colors.lightYellow
        }
    });

    const [amount, setAmount] = useState("");
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleBtnPress = () => {
        Alert.alert(
            `Execute ${ordertypeIndicator[orderType]?.alertLabel} Order`,
            "Are you sure? This action cannot be undone.", 
            [{ text: "Confirm", onPress: placeOrder }, { text: "Cancel" }]
        );
    }

    const placeOrder = () => {
        setIsProcessing(true);
        rtdb.placeOrder(fundId, fundName, parseInt(amount), orderType)
        .then(() => {
            wrapup();
            console.log("1-s Order place success.");
        })
        .catch (error => {
            wrapup();
            console.error("1-f Order place failure: ", error);
        })
    }

    const wrapup = () => {
        setTimeout(()=> {
            setIsProcessing(false);
            setShowModal(false);
            navigation.navigate('Orders', { isNewOrderPlaced: true });
        }, 1500);  
    }

    const handleChangeAmount = (amountText) => {
        const amountString = amountText.replace(/[^0-9]/g, '');
        setAmount(amountString);
        const amountInt = parseInt(amountString);
        setIsBtnDisabled(amountString === "" || amountInt < 10 || amountInt % 10 !== 0);
    }

    return(
        <Modal visible={showModal} animationType="fade" transparent={true} statusBarTranslucent={true}>
            <View style={styles.modal}>
                <View style={styles.modalContent}>

                    <View style={styles.modalHeader}>
                        <View style={styles.modalTitleContainer}>
                            <FontAwesome5 name={ordertypeIndicator[orderType]?.iconName} color={ordertypeIndicator[orderType]?.color} size={20}/>
                            <Text style={styles.modalTitle}>{ordertypeIndicator[orderType]?.headerLabel}</Text>
                        </View>  
                        <Pressable onPress={()=>setShowModal(false)}><FontAwesome5 name="times" size={20}/></Pressable>
                    </View>
                    
                    <View style={{...styles.modalSubheader, backgroundColor: ordertypeIndicator[orderType]?.backgroundColor}}>
                        <Text style={styles.modalSubtitle}>{fundName}</Text>        
                    </View>

                    <View style={styles.modalBody}>
                        <Text>{ordertypeIndicator[orderType]?.inputLabel}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="$"
                            maxLength={15}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={handleChangeAmount}
                            editable={!isProcessing}
                        ></TextInput>

                        <Text style={isBtnDisabled ? styles.hintTextWarn : styles.hintText}>Min $10 and multiple of $10</Text>

                        <Text></Text>

                        <View style={styles.infoContainer}>
                            <FontAwesome5 name="info-circle" size={15} color={'gray'}/>
                            <Text>  </Text>
                            <Text style={styles.infoText}>Order once placed cannot be cancelled.{'\n'}Please verify your order details before proceeding.</Text>
                        </View>         
                    </View>

                    <View style={styles.modalFooter}>
                        <Button title={isProcessing ? "Placing Order..." : ordertypeIndicator[orderType]?.btnLabel} color={ordertypeIndicator[orderType]?.color} onPress={handleBtnPress} disabled={isBtnDisabled || isProcessing}/>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {    
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        flex: 0,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    modalHeader: {
        padding: 20,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
    },
    modalTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    modalSubheader: {   
        padding: 20,
        width: "100%",
        //backgroundColor: "#dfeaf7",
    },
    modalSubtitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    modalBody: {
        padding: 20,
        width: "100%",
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginTop: 15,
    },
    hintText: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
    },
    hintTextWarn: {
        marginTop: 5,
        fontSize: 12,
        color: 'red',
    },
    infoContainer: {
        flexDirection: 'row',
    },
    infoText: {
        fontSize: 12,
        color: 'gray',
    },
    modalFooter: {
        padding: 20,
        width: "100%",
    }
});