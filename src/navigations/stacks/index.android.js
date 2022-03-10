/*
 * @Author: czy0729
 * @Date: 2022-03-09 23:39:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-10 17:02:33
 */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as Screens from '@screens'
import navigationsParams from '@/config'
import TabBar from './tab-bar'
import { forHorizontalIOS } from './config'

const defaultScreenOptions = {
  headerShown: false,
  cardStyleInterpolator: forHorizontalIOS
}

const Tab = createBottomTabNavigator()
function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Home' tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name='Discovery' component={Screens.Discovery} />
      <Tab.Screen name='Timeline' component={Screens.Timeline} />
      <Tab.Screen name='Home' component={Screens.Home} />
      <Tab.Screen name='Rakuen' component={Screens.Rakuen} />
      <Tab.Screen name='User' component={Screens.User} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator()
function Stacks() {
  return (
    <Stack.Navigator
      initialRouteName={navigationsParams.initialRouteName}
      screenOptions={defaultScreenOptions}
    >
      <Stack.Screen name='HomeTab' component={BottomTabNavigator} />
      {Object.keys(Screens).map(name => (
        <Stack.Screen key={name} name={name} component={Screens[name]} />
      ))}
    </Stack.Navigator>
  )
}

export default Stacks