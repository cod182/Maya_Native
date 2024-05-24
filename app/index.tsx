import { Text, View } from 'react-native';

import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-3xl font-pblack'>Maya</Text>
      <StatusBar />
      <Link href='/home' className='text-blue-300'>Go to profile</Link>
    </View>
  )
}