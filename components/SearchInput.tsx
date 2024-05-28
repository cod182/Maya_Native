import { Image, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import { TouchableOpacity } from 'react-native';
import { icons } from '../constants'

type Props = {

  value: string;
  handleChangeText: (e: string) => void
}

const SearchInput = ({ value, handleChangeText }: Props) => {

  return (


    <View className='flex-row items-center w-full h-16 px-4 space-x-4 border-2 bg-black-100 border-black-200 rounded-2xl focus:border-secondary-100'>
      <TextInput
        className='flex-1 w-full text-base text-white mt-0.5 font-pregular'
        value={value}
        placeholder='Search for a video'
        placeholderTextColor='#7b7b8b'
        onChangeText={(e) => handleChangeText(e)}
      />

      <TouchableOpacity>
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>

    </View>

  )
}

export default SearchInput