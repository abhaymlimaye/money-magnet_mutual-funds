import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Discover } from './screens/Discover';
import { Holdings } from './screens/Holdings';
import { Sips } from './screens/Sips';
import { Orders } from './screens/Orders';
import { Header } from './partials/Header';
import theme from './theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider><SafeAreaView>
      <View style={styles.container}><NavigationContainer>

          <Header/>
          
          <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: styles.tabBarStyle }}>      
            <Tab.Screen name='Discover' 
                options={{ tabBarIcon: ({color})=> (<FontAwesome5 name="search-dollar" size={15} color={color}/>) }}
                component={Discover}
                initialParams={{ isNewOrderPlaced: false }}
            />

            <Tab.Screen name='Holdings'
                options={{ tabBarIcon: ({color})=> (<FontAwesome5 name="th-list" size={15} color={color}/>) }}
                component={Holdings}
                initialParams={{ isNewOrderPlaced: false }}
            />

            <Tab.Screen name='SIPs'
                options={{ tabBarIcon: ({color})=> (<FontAwesome5 name="calendar-day" size={15} color={color}/>) }}
                component={Sips}
                initialParams={{ isNewOrderPlaced: false }}
            />

            <Tab.Screen name='Orders'
              options={{ tabBarIcon: ({color})=> (<FontAwesome5 name="shopping-cart" size={15} color={color}/>) }}
              component={Orders}
              initialParams={{ isNewOrderPlaced: false }}
            />
          </Tab.Navigator>

        </NavigationContainer></View>
    </SafeAreaView></SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tabBarStyle: {
    backgroundColor: theme.colors.lightGray,
  },
});
