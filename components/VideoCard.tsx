import { Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ResizeMode, Video } from 'expo-av';
import { bookmarkPost, getBookmarksForVideo, getUserBookmarkForVideo } from '@/lib/appwrite';

import { TouchableOpacity } from 'react-native';
import { icons } from '@/constants';
import { useGlobalContext } from '@/context/globalProvider';

type VideoCardProps = {
  post: VideoPostProps;
};

const VideoCard: React.FC<VideoCardProps> = ({ post }) => {
  // Destructure post
  const { title, thumbnail, video, creator, $id, bookmarked_by } = post;
  const { user } = useGlobalContext();

  // Functions

  const checkIfBookmarked = async () => {
    let hasBookmarked = await getUserBookmarkForVideo($id, user.$id)
    if (hasBookmarked.length === 1) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }

  const checkNumberOfBookmarks = async () => {
    const numberofBookmarks = await getBookmarksForVideo($id);
    setBookmarks(numberofBookmarks.length)
  }

  // States
  const { username, avatar } = creator;
  const [play, setPlay] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState(0)
  // useEffects 

  useEffect(() => {
    checkIfBookmarked();
  }, [])

  return (
    <View className='flex-col items-center px-4 mb-14'>
      <View className='flex-row items-start fap-3'>
        <View className='flex-row items-center justify-center flex-1'>
          <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-normal items-center p-0.5'>
            <Image source={{ uri: avatar }} className='w-full h-full rounded-lg' resizeMode='cover' />
          </View>
          <View className='justify-center flex-1 ml-3 gap-y-1'>
            <Text numberOfLines={1} className='text-sm text-white font-psemibold'>{title}</Text>
            <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>{username}</Text>

          </View>
        </View>
        <View className='flex-row items-center justify-center h-full pt-2'>
          {bookmarks >= 1 && (
            <Text className='mr-2 text-white font-psemibold'>{bookmarks}</Text>
          )}
          <TouchableOpacity activeOpacity={0.7} onPress={
            async () => {
              await bookmarkPost(bookmarked ? 'remove' : 'add', user.$id, $id);
              setBookmarked(!bookmarked);
              checkNumberOfBookmarks();
            }
          }>
            <Image source={bookmarked ? icons.bookmark : icons.plus} className={`w-5 h-5 `} resizeMode='contain' />

          </TouchableOpacity>
        </View>
      </View>

      {play ? (
        <Video
          source={{
            uri: video
          }}
          className='w-full mt-3 h-60 rounded-xl'
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={
            status => {
              if ("didJustFinish" in status && status.didJustFinish) {
                setPlay(false)
              }
            }
          }
        />
      ) : (
        <TouchableOpacity className='relative items-center justify-center w-full mt-3 h-60 rounded-xl' activeOpacity={0.7} onPress={() => setPlay(true)}>
          <Image source={{ uri: thumbnail }} className='w-full h-full mt-3 rounded-cl' resizeMode='cover' />
          <Image source={icons.play} className='absolute w-12 h-12' resizeMode='contain' />
        </TouchableOpacity>
      )}

    </View>
  )
}

export default VideoCard