import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

export function LoadingIndicator() {
  return(
    <View style={styles.container}>
      <ActivityIndicator size="large" color={'gray'}/>
      <Text style={styles.text}>Just a moment...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    color: 'gray',
    fontWeight: 'bold',
    marginTop: 10
  }
});

