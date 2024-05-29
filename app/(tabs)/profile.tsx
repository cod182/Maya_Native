import { FlatList, Image, ListRenderItemInfo, Text, TouchableOpacity, View } from 'react-native'

import EmptyState from '@/components/EmptyState'
import InfoBox from '@/components/InfoBox'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '@/components/VideoCard'
import { getUserPosts } from '@/lib/appwrite'
import { icons } from '@/constants'
import useAppwrite from '@/lib/useAppwrite'
import { useGlobalContext } from '@/context/globalProvider'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));

  const logout = () => { }



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
            <View className='items-center justify-center w-full px-4 mt-6 b-12'>
              <TouchableOpacity className='items-end w-full mb-10' onPress={logout}>
                <Image source={icons.logout} resizeMode='contain' className='w-6 h-6' />
              </TouchableOpacity>

              <View className='items-center justify-center w-16 h-16 border rounded-lg border-secondary-100'>
                <Image source={{ uri: user?.avatar }} className='w-[90%] h-[90%] rounded-lg' resizeMode='cover' />
              </View>
              <InfoBox title={user?.username} containerStyles='mt-5' titleStyles='text-lg' />
              <View className='flex-row mt-5'>
                <InfoBox title={posts.length || 0} subtitle='posts' containerStyles='mr-10' titleStyles='text-xl' />
                <InfoBox title='1.2k' subtitle='followers' titleStyles='text-xl' />

              </View>
            </View>
          )}
        ListEmptyComponent={
          <EmptyState title='You have not created any videos' subtitle='Upload your first video' />
        }
      />
    </SafeAreaView>
  )
}

export default Profile