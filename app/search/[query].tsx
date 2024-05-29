import { FlatList, ListRenderItemInfo, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import EmptyState from '@/components/EmptyState'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch()
  }, [query])


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
            <View className='px-4 my-6'>
              <Text className='text-sm text-gray-100 font-pmedium'>Search Results</Text>
              <Text className='text-2xl text-white font-psemibold'>{query}</Text>

              <View className='mt-6 mb-8'>
                <SearchInput initialQuery={query?.toString()} />
              </View>

            </View>
          )}
        ListEmptyComponent={
          <EmptyState title='no videos found for this search query' subtitle='be the first to upload' />
        }
      />
    </SafeAreaView>
  )
}

export default Search