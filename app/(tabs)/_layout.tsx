import { Image, Text, View } from 'react-native'
import { Redirect, Tabs } from 'expo-router';

import { icons } from '../../constants'

type TabIconProps = {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}
const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
        source={icon}
        resizeMode='contain'
        tintColor={color}
        className='w-6 h-6'
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>{name}</Text>
    </View>
  )
}



const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: '#ffa001', tabBarInactiveTintColor: '#cdcde0', tabBarStyle: { backgroundColor: '#161622', borderTopWidth: 1, borderTopColor: '#232533', height: 85 } }}
      >
        <Tabs.Screen
          name='home'
          options={({
            title: 'Home',
            headerShown: false,
            tabBarItemStyle: {
              maxWidth: 400,
            },
            tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name='Home'
                focused={focused}
              />
            ),
          })}
        />

        <Tabs.Screen
          name='bookmark'
          options={{
            tabBarItemStyle: {
              maxWidth: 400,
            },
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name='Bookmark'
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name='create'
          options={{
            tabBarItemStyle: {
              maxWidth: 400,
            },
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name='Create'
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name='profile'
          options={{
            tabBarItemStyle: {
              maxWidth: 400,
            },
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name='Profile'
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout