import { FlatList, Text, View } from 'react-native'

import EmptyState from './EmptyState';
import React from 'react'

type Post = {
  id: number;
}

type Props = {
  posts: Post[] | [];
}

const Trending = ({ posts }: Props) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.id.toString()}
      renderItem={({ item }) => (
        <Text className='text-3xl text-white'>{item.id}</Text>
      )}
      horizontal

    >

    </FlatList>
  )
}

export default Trending