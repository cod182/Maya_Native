import { Alert, Image, ScrollView, Text, View } from 'react-native'
import { Link, router } from 'expo-router';
import React, { useState } from 'react'

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createUser } from '../../lib/appwrite'
import { images } from '../../constants'
import { useGlobalContext } from '@/context/globalProvider';

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill all fields');
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username)
      setUser(result);
      setIsLoggedIn(true)

      router.replace('/home') // redirect to home
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView>
        <View className='w-full min-h-[85vh] px-4 my-6 justify-center'>
          <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]' />
          <Text className='mt-10 text-2xl text-white text-semibold font-psemibold'>Sign Up to Maya</Text>
          <FormField
            title='username'
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles='mt-10'
          />

          <FormField
            title='email'
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
            title='Create Account'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex-row justify-center gap-2 pt-5'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already Have An Account?
            </Text>
            <Link href='sign-in' className='text-lg font-psemibold text-secondary-100'>
              Sign In
            </Link>
          </View>

        </View>
      </ScrollView>
    </ SafeAreaView >
  )
}

export default SignUp