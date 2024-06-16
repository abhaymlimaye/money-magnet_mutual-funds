import { StyleSheet, View } from 'react-native';

export function SeparatorHorizontal() {
  return (
      <View style={styles.container}>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 1,
        backgroundColor: 'lightgray',
        marginVertical: 5,
    },
});