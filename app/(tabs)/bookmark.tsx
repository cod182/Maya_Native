import { ActivityIndicator, FlatList, ListRenderItemInfo, RefreshControl, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPost, getUserBookmarks } from '@/lib/appwrite'

import EmptyState from '@/components/EmptyState'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
import useAppwrite from '@/lib/useAppwrite'
import { useGlobalContext } from '@/context/globalProvider'

const bookmark = () => {
  //Destructuring
  const { user } = useGlobalContext();
  const { data: bookmarks, refetch } = useAppwrite(() => getUserBookmarks(user.$id));


  // States
  const [refreshing, setRefreshing] = useState(false);
  const [videos, setVideos] = useState<any[]>();
  const [loading, setLoading] = useState(true);

  // Functions

  const getVideos = async () => {
    setLoading(true);
    setRefreshing(true); //Recall posts & Videos 
    let videoArray: VideoPostProps[] = [];

    const videoPromises = bookmarks.map(async ({ videoId }: any) => {
      const video = await getPost(videoId.$id);
      return video;
    });

    // Wait for all promises to resolve
    videoArray = await Promise.all(videoPromises);
    videoArray.sort((a, b) => {
      const dateA = new Date(a.$createdAt).getTime();
      const dateB = new Date(b.$createdAt).getTime();
      return dateA - dateB; // Sorting in descending order (newest first)
    });

    setVideos(videoArray);;
    setRefreshing(false); //Recall posts & Videos 
    setLoading(false);

    return videoArray;
  };

  const onRefresh = async () => {
    setRefreshing(true); //Recall posts & Videos 
    await refetch();
    setRefreshing(false);
  }

  // UseEffects
  useEffect(() => {
    getVideos();
  }, [bookmarks])



  return (
    <SafeAreaView className='h-full bg-primary'>
      <FlatList
        data={videos}
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
          !loading ? (
            <EmptyState title={`You haven't saved any posts`} subtitle='Why not create a video?' />
          )
            :
            (
              <View className='items-center justify-center bg-primary/30'>
                <ActivityIndicator size="large" className='text-secondary' />
              </View>
            )
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

      />
    </SafeAreaView>
  )
}

export default bookmark