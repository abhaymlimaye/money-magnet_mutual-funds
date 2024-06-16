import { StyleSheet, View, Text, Image } from 'react-native';
import theme from '../theme';

export function Header() {
  return (
      <View style={styles.container}>
        <Image source={require('../assets/icon.png')} style={styles.logoImage}/>
        <Text style={styles.headerText}>Money Magnet</Text>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
    },
    logoImage: {
      width: 30,
      height: 30,
      resizeMode: 'contain',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginStart: 15,
      //color: theme.colors.blue,
    }
});