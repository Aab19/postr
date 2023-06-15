import React from 'react'
import {useTranslation} from 'react-i18next'
import {StyleSheet, Text, View} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {theme} from 'utils/styles'

import {Detail, Post, Setting, Splash, Timeline} from 'screens'

import {IconTimeline} from 'assets/img'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabPage = () => {
  const {t} = useTranslation()
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          switch (route.name) {
            case t('timeline'):
              return (
                <IconTimeline
                  style={focused ? styles.activeTab : styles.inactiveTab}
                />
              )
            default:
              return
          }
        },
        tabBarActiveTintColor: theme.redSoft,
        tabBarInactiveTintColor: theme.violet60,
      })}>
      <Tab.Screen
        name={t('timeline')}
        component={Timeline}
        options={{headerShown: false, statusBarColor: theme.whiteSmoke}}
      />
    </Tab.Navigator>
  )
}

const Router = ({connectionStatus}) => {
  return (
    <>
      {!connectionStatus && (
        <View className="bg-[#714668] fixed p-4">
          <Text className="text-white">Network disconnected</Text>
        </View>
      )}
      <Stack.Navigator
        initialRouteName={`${connectionStatus ? 'Tab' : 'Splash'}`}
        headerShown={false}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
            statusBarColor: theme.whiteSmoke,
          }}
        />

        <Stack.Screen
          name="Tab"
          component={TabPage}
          options={{
            headerShown: false,
            statusBarColor: theme.whiteSmoke,
          }}
        />

        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            headerShown: false,
            statusBarColor: theme.whiteSmoke,
          }}
        />

        <Stack.Screen
          name="Settings"
          component={Setting}
          options={{
            headerShown: false,
            statusBarColor: theme.whiteSmoke,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            headerShown: false,
            statusBarColor: theme.whiteSmoke,
          }}
        />
      </Stack.Navigator>
    </>
  )
}

const styles = StyleSheet.create({
  activeTab: {
    color: theme.redSoft,
  },
  inactiveTab: {
    color: theme.violet60,
  },
})

export default Router
