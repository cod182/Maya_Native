import { Alert, FlatList, Image, ListRenderItemInfo, RefreshControlBase, RefreshControlComponent, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import EmptyState from '@/components/EmptyState'
import { RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import VideoCard from '@/components/VideoCard'
import { getAllPosts } from '@/lib/appwrite'
import { images } from '../../constants'
import useAppwrite from '@/lib/useAppwrite'

const Home = () => {

  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true); //Recall posts & Videos 
    await refetch();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: ListRenderItemInfo<VideoPostProps>) => (
          <VideoCard post={item} />
        )}
        ListHeaderComponent={
          () => (
            <View className='px-4 my-6 space-y-6'>
              <View className='flex-row items-start justify-between mb-6'>
                <View>
                  <Text className='text-sm text-gray-100 font-pmedium'>Welcome back</Text>
                  <Text className='text-2xl text-white font-psemibold'>Codie</Text>
                </View>
                <View className='mt-1.5'>
                  <Image source={images.logoSmall} className='h-10 w-9' resizeMode='contain' />
                </View>
              </View>

              <SearchInput value='' handleChangeText={() => { }} />

              {/* Latest Videos */}
              <View className='flex-1 w-full pt-5 pb-8'>
                <Text className='mb-3 text-lg text-gray-100 font-pregular'>Latest Videos</Text>
                <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }] ?? []} />
              </View>

            </View>
          )}
        ListEmptyComponent={
          <EmptyState title='no videos found' subtitle='be the first to upload' />
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home