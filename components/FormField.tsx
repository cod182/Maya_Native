import { Image, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import { TouchableOpacity } from 'react-native';
import { icons } from '../constants'

type Props = {
  title: string;
  value: string;
  handleChangeText: (e: string) => void
  otherStyles: string;
  placeholder?: string;
  keyboardType?: string;
}

const FormField = ({ title, value, handleChangeText, otherStyles, keyboardType, placeholder }: Props) => {

  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 capitalize font-pmedium'>{title}</Text>

      <View className='flex-row items-center w-full h-16 px-4 border-2 bg-black-100 border-black-200 rounded-2xl focus:border-secondary-100'>
        <TextInput
          className='flex-1 w-full text-base text-white font-psemibold'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={(e) => handleChangeText(e)}
          secureTextEntry={title === 'password' && !showPassword}
        />
        {title === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className='w-6 h-6 ' resizeMode='contain' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField