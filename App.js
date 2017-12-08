import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StackNavigator, TabNavigator } from 'react-navigation'

import CreateQuestion from './CreateQuestion/CreateQuestion'
import CreateSelectionView from './CreateSelectionView/CreateSelectionView'
import DeckView from './DeckView/DeckView'
import CreateDeck from './CreateDeck/CreateDeck'
import DetailDeckView from './DetailDeckView/DetailDeckView'


import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

import { Constants } from 'expo'


const TabsNavigator = TabNavigator({
  DeckView: {
    // Should be 'DeckView' but for convenience it's set to 'CreateSelectionView'
    screen: DeckView,
    // screen: CreateSelectionView,

    // sceneConfig: {

    // },

    navigationOptions: {
      tabBarLabel: "View Decks",
      labelSize: { size: 25 },
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={ 27 } color={ tintColor }/>
    }

  },
  CreateDeckOrQuestion: {
    screen: CreateSelectionView,
    // screen: DeckView,

    navigationOptions: {
      tabBarLabel: "Create Deck or Card",
      labelSize: { size: 25 },
      // tabBarIcon: ({ tintColor }) => <MaterialIcons name={ Platform.OS ===  'ios' ? 'add-box' : 'add-circle' }  size={ Platform.OS ===  'ios' ? 31 : 27 } color={ tintColor }/>
      tabBarIcon: ({ tintColor }) => <MaterialIcons name={ 'add-box'}  size={  31 } color={ tintColor }/>
    }
  },
},
  {
    navigationOptions: {
      header: null,
      backgroundColor: '#4fbf40',
      //
  },
    tabBarOptions: {
      shadowColor: '#4fbf40',

      // activeTintColor: '#4fbf40',
      // backgroundColor: '#4fbf40',
    }

})

const MainNavigator = StackNavigator({
  Home: {
    screen: TabsNavigator
  },

  CreateDeck: {
      screen: CreateDeck,

      navigationOptions: {
        headerTintColor: '#ffffff',
        title: 'Choose An Option',

        headerStyle: {
          backgroundColor: '#4fbf40'
        }
    }
  },

  CreateQuestion: {
      screen: CreateQuestion,

      navigationOptions: {
        headerTintColor: '#ffffff',
        title: 'Add Question',

        headerStyle: {
          backgroundColor: '#4fbf40'
        }
    }
  },

  DetailDeckView: {
      screen: DetailDeckView,
      navigationOptions: {
        headerTintColor: '#ffffff',
        // title: 'Deck Detail',


        headerStyle: {
          backgroundColor: '#4fbf40'
        }
    }
  },

})



const GreenStatusBar = ({ backgroundColor }) => {
  // StatusBar.setBackgroundColor('#4fbf40', false)
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor='rgba(0,0,0,0)' />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <GreenStatusBar backgroundColor='#4fbf40' />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
