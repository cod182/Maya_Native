import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';

import CustomButton from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar'
import { images } from '../constants'
import { useGlobalContext } from '@/context/globalProvider';

export default function App() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href='/home' />

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView
        contentContainerStyle={{ height: "100%" }}
      >
        <View
          className='w-full justify-center items-center min-h-[85vh] px-4'
        >
          <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain' />
          <Image source={images.cards} className='max-w-[380px] w-full h-[300px]' resizeMode='contain' />
          <View className='relative mt-5'>
            <Text className='text-4xl font-bold text-center text-white'>
              Discover Endless Possibilities with{' '}
              <Text className='text-secondary-200'>
                MAYA
              </Text>
            </Text>
            <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-2 -right-8' resizeMode='contain' />
          </View>
          <Text className='text-sm text-center text-gray-100 font-pregular mt-7'>
            Where creativity meets innovation: embark on a journey of limitless exploration with Maya
          </Text>
          <CustomButton title='Continue with Email' handlePress={() => { router.push('/sign-in') }} containerStyles='w-full mt-7' />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  )
}