import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SearchBar } from '../partials/SearchBar';
import { TileHeldFund } from '../partials/TileHeldFund';
import { SeparatorHorizontal } from '../partials/SeparatorHorizontal';
import { LoadingIndicator } from '../partials/LoadingIndicator';
import rtdb from '../data/RealtimeDatabase';

export function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [holdingsBackup, setHoldingsBackup] = useState([]);

  const [headerText, setHeaderText] = useState('Portfolio');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getHoldings(); 
  }, []);

  const handleSearchTextChange = searchText => {
    if (searchText != "") {
      setHeaderText('Search Results');
      setHoldings(prevFunds => prevFunds.filter(fund => fund.fundName.toLowerCase().includes(searchText.toLowerCase())));
    } 
    else {
      setHeaderText('Portfolio');
      setHoldings(holdingsBackup);
    }
  }

  const getHoldings = () => {
    setIsLoading(true);
    rtdb.getHoldings(data => {
      setHoldings(data);
      setHoldingsBackup(data);
      setIsLoading(false);
    })
  }

  return (
    <>
      <SearchBar placeholder='Search holdings...' onTextChange={handleSearchTextChange}/>    

      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>{headerText}</Text>

        { isLoading && <LoadingIndicator/> }

        { (!isLoading && holdings) && holdings
          .map((fund, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <SeparatorHorizontal />}
  
              <TileHeldFund
                fundId={fund.fundId}
                fundName={fund.fundName}
                amount={fund.amount}
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
    headerText: {
      fontSize: 20,
      marginVertical: 15,
    },
});