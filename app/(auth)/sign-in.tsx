import { Image, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants'

const SignIn = () => {

  const [form, setForm] = useState({ email: '', password: '', })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = () => {

  }
  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView>
        <View className='w-full h-full px-4 my-6 justify-normal'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]' />
          <Text className='mt-10 text-2xl text-white text-semibold font-psemibold'>Log in to Maya</Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='password'
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Sign In'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex-row justify-center gap-2 pt-5'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't Have An Account?
            </Text>
            <Link href='sign-up' className='text-lg font-psemibold text-secondary-100'>
              Sign Up
            </Link>
          </View>

        </View>
      </ScrollView>
    </ SafeAreaView >
  )
}

export default SignIn