import { StyleSheet, View, TextInput } from 'react-native';
import theme from '../theme';

export function SearchBar({ placeholder, onTextChange }) {
  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder={"🔍  "+placeholder}
            onChangeText={onTextChange}
        ></TextInput>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      //backgroundColor: '#f2f2f2'
      backgroundColor: theme.colors.lightGray
    },
    input: {
        backgroundColor: 'white',
        width: '100%',
        height: 35,
        borderRadius: 20,
        paddingStart: 15
    }
});