import { initializeApp } from "firebase/app"
import { getDatabase, ref, child, push, update, get, onValue, on, runTransaction, serverTimestamp } from "firebase/database"

class RealtimeDatabase {
    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyAtecgRrNBEO96UOA_EszqzhaIItgS8WHA",
            authDomain: "crossplatform-lab-e922f.firebaseapp.com",
            databaseURL: "https://crossplatform-lab-e922f-default-rtdb.firebaseio.com",
            projectId: "crossplatform-lab-e922f",
            storageBucket: "crossplatform-lab-e922f.appspot.com",
            messagingSenderId: "798170205892",
            appId: "1:798170205892:web:bbb9956676d9d5b70d0391"
        };
        const db = getDatabase(initializeApp(firebaseConfig));

        this.ordersRef = ref(db, "orders"); 
        this.holdingsRef = ref(db, "holdings");      
    }

    ordersChildRef = childRef => child(this.ordersRef, childRef);
    holdingsChildRef = childRef => child(this.holdingsRef, childRef);

    placeOrder = async (fundId, fundName, amount, orderType) => {
        console.log('\n\n\n1-p Order placing...');

        // Push the new order to the 'orders' node
        const snapshot = await push(this.ordersRef, { fundId, fundName, amount, orderType, status: 'pending', timestamp: serverTimestamp() }); 
        
        // Simulate order execution
        this.simulateExecuteOrder(snapshot.key, fundId, fundName, amount, orderType); 
    }

    simulateExecuteOrder = async(orderId, fundId, fundName, amount, orderType) => {
        console.log('2-p Simulating execution...');

        // Simulate delay of 8 seconds to mimic order processing
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        await delay(8000); 

        try {
            // Check if the order is executable
            await this.determineExecutability(fundId, amount, orderType); 

            // If executable, Update holdings
            await this.updateHoldings(fundId, fundName, amount, orderType);

            // If holdings updated successfully, update order status with 'complete'
            this.updateOrderStatus(orderId, 'complete')
        }
        catch(error) {
            // If not executable or holdings not updated, update order status with error
            this.updateOrderStatus(orderId, 'failed', error);
        }  
    }

    determineExecutability = async(fundId, amount, orderType) => {
        console.log('3-p Determining executability...');

        // Check if the buy order amount exceeds the limit
        if (orderType === "buy")    
            return amount > 100000 ? Promise.reject('Amount exceeds the allowable limit') : Promise.resolve();
        // Check if the sell order amount exceeds the existing holdings
        else if (orderType === "sell") {
            const snapshot = await get(this.holdingsChildRef(fundId));
            if (!snapshot.exists()) Promise.reject('No holdings found');
            return snapshot.val().amount < amount ? Promise.reject('Insufficient holdings') : Promise.resolve();
        }
        else return Promise.reject('Invalid order type');
    }

    updateHoldings = (fundId, fundName, amount, orderType) => {
        console.log('4-p Updating holdings...');

        return runTransaction(this.holdingsChildRef(fundId), currentHolding => {
            if (currentHolding === null) {  // If the fund is not already held
                if (orderType === "buy") return { fundName: fundName, amount: amount }; // Add it to portfolio
                else if (orderType === "sell") return null; // Selling without any holdings, remove the node
                else return currentHolding; // Do nothing
            } 
            else { // If the fund is already held
                if (orderType === "buy") return { ...currentHolding, amount: (currentHolding.amount || 0) + amount }; // Add the order amount to the existing amount
                else if (orderType === "sell") { 
                    const updatedAmount = (currentHolding.amount || 0) - amount;    // Subtract the order amount from the existing amount
                    if (updatedAmount === 0) return null; // Remove the node if all holdings are sold
                    return { ...currentHolding, amount: updatedAmount }; // Update the amount
                }
                else return currentHolding; // Do nothing
            }
        });
    }

    updateOrderStatus = (orderId, status, error) => {
        console.log(`5-p Updating order status to ${status}...`);

        const updatedOrder = error ? { status: status, error: error } : { status: status };
        update(this.ordersChildRef(orderId), updatedOrder);
    }

    getHoldings = callback => {
        onValue(this.holdingsRef, snapshot => {
            let holdings = [];
            snapshot.exists() && snapshot.forEach( childSnapshot => { holdings.push({fundId: childSnapshot.key, ...childSnapshot.val()}); } );
            callback(holdings);
        });
    }
      
     getOrders = callback => {
        onValue(this.ordersRef, snapshot => {
            let orders = [];
            snapshot.exists() && snapshot.forEach( childSnapshot => { orders.push({orderId: childSnapshot.key, ...childSnapshot.val()}); } );
            orders.sort((a, b) => b.timestamp - a.timestamp);
            callback(orders);
        });
     } 
}

export default new RealtimeDatabase();