import { Alert, Image, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { router, usePathname } from 'expo-router';

import { TouchableOpacity } from 'react-native';
import { icons } from '../constants'

type Props = {
  initialQuery?: string;
}

const SearchInput = ({ initialQuery }: Props) => {
  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery || '')

  return (


    <View className='flex-row items-center w-full h-16 px-4 space-x-4 border-2 bg-black-100 border-black-200 rounded-2xl focus:border-secondary-100'>
      <TextInput
        className='flex-1 w-full text-base text-white mt-0.5 font-pregular'
        value={query}
        placeholder='Search for a video'
        placeholderTextColor='#cdcde0'
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) { return Alert.alert('Missing Query', 'Please enter a search term') };
          if (pathname.startsWith('/search')) { router.setParams({ query }) } else { router.push(`/search/${query}`); }
        }
        }>
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>

    </View>

  )
}

export default SearchInput