import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StackNavigator, TabNavigator } from 'react-navigation'

import CreateQuestion from './components/CreateQuestion'
import CreateSelectionView from './components/CreateSelectionView'
import DeckView from './components/DeckView'
import CreateDeck from './components/CreateDeck'
import DetailDeckView from './components/DetailDeckView'
import QuizView from './components/QuizView'

import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

import { Constants } from 'expo'



const TabsNavigator = TabNavigator({

  DeckView: {
    screen: DeckView,

    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={ 'radiobox-blank'}  size={ 29 } color={ tintColor }/>
    },
  },

  CreateQuestion: {
    screen: CreateQuestion,

    navigationOptions: {
      title: "Add Question",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={ 'plus-circle-outline'}  size={ 29 } color={ tintColor }/>
    },
  },

  CreateDeck: {
    screen: CreateDeck,

    navigationOptions: {
      title: "Add Deck",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={ 'plus-circle-multiple-outline'}  size={ 29 } color={ tintColor } />
    }
  },

},{
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? '#4fbf40' : 'white',
    style: {
      backgroundColor: Platform.OS === 'ios' ? 'white' : '#4fbf40',
    }
  }
})





const MainStackNavigator = StackNavigator({

  TabBar: {
    screen: TabsNavigator
  },

  DetailDeckView: {
    screen: DetailDeckView
  },

  CreateQuestion: {
    screen: CreateQuestion,
    navigationOptions: {
      title: "Create Question",
    }
  },

  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: '#ffffff',
      headerStyle: { backgroundColor: '#4fbf40' }
    }
  },

})



const GreenStatusBar = () => {
  return (
    <View style={{
      backgroundColor: '#4fbf40',
      height: Constants.statusBarHeight,
      zIndex: 10
    }}>
      <StatusBar barStyle='light-content'/>
    </View>
  )
}

export default class App extends Component {
  render() {
    return (
      <Provider store={ createStore(reducer) }>
        <View style={{ flex: 1 }}>
          <GreenStatusBar />
          <MainStackNavigator />
        </View>
      </Provider>
    )
  }
}
