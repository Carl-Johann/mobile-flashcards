import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native'

import { getAllDecks, getAllKeys } from '../utils/api'
import DeckCard from './DeckCard'

import AppStateListener from 'react-native-appstate-listener'

export default class DeckView extends Component {

    state = {
        decks: {},
        // appState: AppState.currentState
    }

    componentDidMount() {
        this.getDecks()

    }

    getDecks = () => {
        getAllDecks( (responseDecks) => {
            let decks = JSON.parse(responseDecks)
            this.setState({ decks })
        })
    }

    render () {
        const { decks } = this.state

        // refreshState = () => {
        //     console.log("ay bitch")
        // }

        return  (
            <View style={ styles.container }>

 { this.getDecks() }

                { decks !== undefined && (
                    <View style={ styles.container }>

                        {/* For Expo, need to request access and set it etc. */}
                        {  decks !== null && (
                            <FlatList
                            data={ Object.entries(decks) }
                            contentContainerStyle={ styles.flatList }
                            keyExtractor={ (item, index) => index }

                            renderItem={ ({ item }) => {
                                if (Platform.OS === 'ios') {
                                    return (
                                    <TouchableOpacity
                                        onPress={ () => this.props.navigation.navigate('DetailDeckView', { deck: item[1] }) }
                                    >
                                        <DeckCard
                                            key={ item.id }
                                            deck={ item }
                                            navigation={ this.props.navigation }
                                        />

                                    </TouchableOpacity>

                                    )
                                }
                                else if (Platform.OS === 'android') {
                                    return (
                                        <TouchableNativeFeedback
                                            onPress={ () => this.props.navigation.navigate('DetailDeckView', { deck: item[1] }) }
                                            background={ TouchableNativeFeedback.SelectableBackground() }
                                            useForeground={ true }
                                        >
                                            <View >
                                                <DeckCard
                                                    key={ item.id }
                                                    deck={ item }
                                                />
                                            </View >
                                        </TouchableNativeFeedback>
                                    )
                                }
                            }}
                        />
                        ) }


                    </View>
                ) }
            </View>


        )
    }
}


const styles = StyleSheet.create({

    flatList: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8
    },

    container: {
        flex: 1,

        shadowRadius: 0,
        shadowOpacity: 0,
        shadowColor: 'transparent',

        shadowOffset: {
            width: 0,
            height: 0
        }
    },

    cardOutline: {
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 1, 0, 0.24)',

        shadowOffset: {
            width: 5,
            height: 7.5
        }
    },

})