import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reduxDecks from './reducers/index'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { setLocalNotification } from './ReminderNotification/ReminderNotification'

import CreateQuestion from './components/CreateQuestion'
import DeckView from './components/DeckView/DeckView'
import CreateDeck from './components/CreateDeck/CreateDeck'
import DetailDeckView from './components/DetailDeckView'
import QuizView from './components/QuizView/QuizView'

import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Constants } from 'expo'



const TabsNavigator = TabNavigator({
  DeckView: {
    screen: DeckView,

    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={ 'radiobox-blank' }  size={ 29 } color={ tintColor }/>
    },
  },

  CreateQuestion: {
    screen: CreateQuestion,

    navigationOptions: {
      title: "Add Question",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={ 'plus-circle-outline' }  size={ 29 } color={ tintColor }/>
    },
  },

  CreateDeck: {
    screen: CreateDeck,

    navigationOptions: {
      title: "Add Deck",
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name={ 'plus-circle-multiple-outline' }  size={ 29 } color={ tintColor } />
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

const MyTransition = (index, position) => {
    const inputRange = [index - 1, index, index + 1]
    const outputRange = [.8, 1, 1]

    const opacity = position.interpolate({
        inputRange,
        outputRange,
    })

    const scaleY = position.interpolate({
        inputRange,
        outputRange,
    })

    return {
      opacity,
      transform: [{ scaleY }]
    }
}

// export const MyCustomTransition = (index, position) => {
//     const inputRange = [index - 1, index, index + 0.99, index + 1];

//     const opacity = position.interpolate({
//         inputRange,
//         outputRange: ([0, 1, 1, 0]),
//     });

//     const translateX = 0;
//     const translateY = position.interpolate({
//         inputRange,
//         outputRange: ([50, 0, 0, 0]),
//     });

//     return {
//         opacity,
//         transform: [
//             { translateX },
//             { translateY }
//         ],
//     };
// };

let TransitionConfiguration = () => {
    return {
        screenInterpolator: (sceneProps) => {

            const { position, scene } = sceneProps
            const { index, route } = scene
            const params = route.params || {}
            const transition = params.transition || 'default'

            return {
              // myCustomTransition: MyCustomTransition(index, position),
              default: MyTransition(index, position),
            }[transition]
        }
    }
}



const MainStackNavigator = StackNavigator({

  TabBar: {
    screen: TabsNavigator
  },

  DetailDeckView: {
    screen: DetailDeckView
  },

  CreateQuestionFromDeckDetail: {
    screen: CreateQuestion,
    navigationOptions: {
      title: "Create Question"
    }
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

}, {
  transitionConfig: TransitionConfiguration
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

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={ createStore(reduxDecks) }>
        <View style={{ flex: 1 }}>
          <GreenStatusBar />
          <MainStackNavigator />
        </View>
      </Provider>
    )
  }
}