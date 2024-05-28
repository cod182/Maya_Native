import { Image, Text, View } from 'react-native'

import CustomButton from './CustomButton';
import React from 'react'
import { images } from '../constants'
import { router } from 'expo-router';

type Props = {
  title: string;
  subtitle: string
}
const EmptyState = ({ title, subtitle }: Props) => {
  return (
    <View className='items-center justify-center w-full px-4'>
      <Image source={images.empty} className='h-[270px] w-[215px]' resizeMode='contain' />
      <Text className='mt-2 text-xl text-center text-white capitalize font-psemibold'>{title}</Text>
      <Text className='text-sm text-gray-100 capitalize font-pmedium'>{subtitle}</Text>
      <CustomButton title='Create Video' handlePress={() => router.push('/create')} containerStyles='w-full my-5' />
    </View>
  )
}

export default EmptyState