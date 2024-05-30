import { FlatList, ListRenderItemInfo, RefreshControl, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'

import EmptyState from '@/components/EmptyState'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { getUserBookmarks } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useGlobalContext } from '@/context/globalProvider'

const bookmark = () => {
  const { user } = useGlobalContext();
  const { data: bookmarks, refetch } = useAppwrite(() => getUserBookmarks(user.$id));

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true); //Recall posts & Videos 
    await refetch();
    setRefreshing(false);
  }
  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: ListRenderItemInfo<VideoPostProps>) => (
          <VideoCard post={item} />
        )}
        ListHeaderComponent={
          () => (
            <View className='px-4 my-6'>
              <Text className='text-3xl text-white font-psemibold'>Saved Posts</Text>
              <View className='mt-6 mb-8'>
                <SearchInput placeholder='Search your saved posts' />
              </View>

            </View>
          )}
        ListEmptyComponent={
          <EmptyState title={`You haven't saved any posts`} subtitle='Why not create a video?' />
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />
    </SafeAreaView>
  )
}

export default bookmark