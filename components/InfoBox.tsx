import { Text, View } from 'react-native'

import React from 'react'

type Props = {
  title: string;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }: Props) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>{title}</Text>
      <Text className='text-sm text-center text-gray-100 font-prregular'>{subtitle}</Text>
    </View>
  )
}

export default InfoBox