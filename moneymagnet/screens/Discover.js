import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { SearchBar } from '../partials/SearchBar';
import { TileNewfund } from '../partials/TileNewfund';
import { SeparatorHorizontal } from '../partials/SeparatorHorizontal';
import { LoadingIndicator } from '../partials/LoadingIndicator';
import { getAllFunds } from '../data/services';

export function Discover() {
  const [funds, setFunds] = useState([]);
  const [fundsBackup, setFundsBackup] = useState([]);

  const [headerText, setHeaderText] = useState('Top 10 Funds');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllFunds().then(data => {
      setFunds(data);
      setFundsBackup(data);
      setIsLoading(false);
    })
    .catch(error => {
      setIsLoading(false)
    });
  }, []);

  const handleSearchTextChange = searchText => {
    if (searchText != "") {
      setHeaderText('Search Results');
      setFunds(prevFunds => prevFunds.filter(fund => fund.name.toLowerCase().includes(searchText.toLowerCase())));
    } 
    else {
      setHeaderText('Top 10 Funds');
      setFunds(fundsBackup);
    }
  }

  return (
    <>
      <SearchBar placeholder='Search new funds...' onTextChange={handleSearchTextChange}/>    

      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>{headerText}</Text>

        { isLoading && <LoadingIndicator/> }

        { (!isLoading && funds) && funds
          .sort((a, b) => {     
            if (b.performance_rating !== a.performance_rating)
              return b.performance_rating - a.performance_rating; // Sort by performance_rating in decreasing order
            else     
              return a.risk_rating - b.risk_rating; // If performance_rating is the same, sort by risk_rating in increasing order
          
          })
          .slice(0, 10) // Limit to top 10
          .map((fund, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <SeparatorHorizontal />}
  
              <TileNewfund
                symbol={fund.symbol}
                name={fund.name}
                fund_family={fund.fund_family}
                performance_rating={fund.performance_rating}
                risk_rating={fund.risk_rating}
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