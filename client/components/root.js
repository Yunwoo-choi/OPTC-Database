import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomePage from './Home/HomeScreen';
import Characters from './Characters/CharactersScreen';
import TeamCalculator from './Calculator/CalculatorScreen';
import Settings from './Settings/SettingsScreen';

import { SplashScreen } from 'expo';

const RootStack = createBottomTabNavigator({
  Home: {
    screen: createStackNavigator({
      Home: {
        screen: HomePage,
        navigationOptions: () => ({
          title: "News",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        })
      }
    })
  },
  Characters: {
    screen: createStackNavigator({
      Characters: {
        screen: Characters,
        navigationOptions: () => ({
          title: "Add Search Bar",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        })
      }
    })
  },
  Calculator: {
    screen: createStackNavigator({
      TeamCalculator: {
        screen: TeamCalculator,
        navigationOptions: () => ({
          title: "Add Title",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        })
      }
    })
  },
  Settings: {
    screen: createStackNavigator({
      Settings: {
        screen: Settings,
        navigationOptions: () => ({
          title: "Settings",
          headerTitleStyle: {
            fontWeight: "bold"
          }
        })
      }
    })
  },
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Characters') {
          iconName = `ios-people${focused ? '' : '-outline'}`;
        } else if (routeName === 'Calculator') {
          iconName = `ios-calculator${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-cog${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
)

class Root extends Component {

  // componentDidMount() {
  //   SplashScreen.preventAutoHide();
  // }

  render() {
    // if (!this.props.doneInitialSubscriptions) {
    //   return null;
    // } else {
    //   SplashScreen.hide()
    return <RootStack />;
    // }
  }
}

export default Root;