import { StyleSheet, Text, View } from 'react-native';

import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Maya!</Text>
      <StatusBar></StatusBar>
      <Link href='/profile' style={{ color: 'blue' }}>Go to profile</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})