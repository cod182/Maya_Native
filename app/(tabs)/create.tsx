import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ResizeMode, Video, } from 'expo-av';

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants'

const Create = () => {


  type VideoProps = {
    uri: string;
  }

  type ThumbProps = {
    uri: string;
  }

  type VideoUploadProps = {
    title: string;
    video: VideoProps | null;
    thumbnail: ThumbProps | null;
    prompt: string;
  }
  const [form, setForm] = useState<VideoUploadProps>({ title: '', video: null, thumbnail: null, prompt: '' });
  const [uploading, setUploading] = useState(false);

  const submit = () => { }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>

        <FormField title='Video Title' value={form.title} placeholder='Give your video a title...' handleChangeText={(e) => setForm({ ...form, title: e })} otherStyles='mt-10' />

        <View className='space-y-2 mt-7'>
          <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>
          <TouchableOpacity>
            {
              form.video
                ?
                <Video source={{ uri: form.video?.uri }} resizeMode={ResizeMode.COVER} className='w-full h-64 rounded-2xl' useNativeControls isLooping />
                :
                <View className='items-center justify-center w-full h-40 px-4 bg-black-100 rounded-2xl'>
                  <View className='items-center justify-center border border-dashed w-14 h-14 border-secondary-100'>
                    <Image source={icons.upload} resizeMode='contain' className='w-1/2 h-1/2' />
                  </View>
                </View>
            }
          </TouchableOpacity>
        </View>

        <View className='space-y-2 mt-7'>
          <Text className='text-2xl text-white font-psemibold'>Thumbnail Image</Text>
          <TouchableOpacity>
            {
              form.thumbnail
                ?
                <Image source={{ uri: form.thumbnail?.uri }} resizeMode='cover' className='w-full h-64 rounded-2xl' /> :
                <View className='flex-row items-center justify-center w-full h-16 px-4 space-x-2 border-2 bg-black-100 rounded-2xl border-black-200'>
                  <Image source={icons.upload} resizeMode='contain' className='w-5 h-1/2' />
                  <Text className='text-sm text-gray-100 font-pmedium'>Choose a File</Text>
                </View>
            }
          </TouchableOpacity>
        </View>

        <FormField title='Ai Prompt' value={form.prompt} placeholder='Prompt used to created video' handleChangeText={(e) => setForm({ ...form, prompt: e })} otherStyles='mt-7' />

        <CustomButton title='submit & publish' handlePress={submit} containerStyles='mt-7' isLoading={uploading} />


      </ScrollView>
    </SafeAreaView>
  )
}

export default Create