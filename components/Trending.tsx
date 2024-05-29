import * as Animatable from 'react-native-animatable'

import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import { icons } from '@/constants';

type TrendingItemProps = {
  activeItem: VideoPostProps;
  item: VideoPostProps;
};

// Define custom animations
const customZoomIn = {
  0: { transform: [{ scale: 0.9 }] },
  1: { transform: [{ scale: 1.1 }] },
};

const customZoomOut = {
  0: { transform: [{ scale: 1.1 }] },
  1: { transform: [{ scale: 0.9 }] },
};

// Register custom animations
Animatable.initializeRegistryWithDefinitions({
  zoomIn: customZoomIn,
  zoomOut: customZoomOut,
});

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {

  const [play, setPlay] = useState(false)
  return (
    <Animatable.View
      className='mr-5'
      animation={activeItem.$id === item.$id ? "zoomIn" : "zoomOut"}
      duration={500}
    >
      {
        play ?
          <Text className='text-white'>Playing</Text>
          :
          <TouchableOpacity className='relative items-center justify-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
            <ImageBackground source={{ uri: item.thumbnail }} className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40' resizeMode='cover' />
            <Image source={icons.play} className='absolute w-12 h-12' resizeMode='contain' />
          </TouchableOpacity>
      }

    </Animatable.View>
  )
}

type VideoCardProps = {
  latestVideoPosts: VideoPostProps[];
};

const Trending: React.FC<VideoCardProps> = ({ latestVideoPosts }) => {

  // States
  const [activeItem, setActiveItem] = useState(latestVideoPosts[1])

  // Functions
  type props = {
    viewableItems: VideoPostProps[];
  }
  const viewableItemsChanged = ({ viewableItems }: { viewableItems: { item: VideoPostProps }[] }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  }

  return (
    <FlatList
      data={latestVideoPosts}
      keyExtractor={(item: any) => item.$id}
      horizontal
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />)
      }
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170, y: 0 }}
    >

    </FlatList>
  );

}

export default Trending;
