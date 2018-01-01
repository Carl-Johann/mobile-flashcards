import React, { Component } from 'react'
import { View, Platform, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native'
import { TimerMixin } from 'react-timer-mixin'
import SearchBar from 'react-native-searchbar'

import { List } from 'react-native-elements'
import DeckListItem from './DeckListItem'


const SearchBarDeckList = ({ decks, handleResults, handleRowPress, isSearchBarOpen, searchedDecks }) => {

    filteredDecksWithSearch = () => {
        let filteredDecks = []

        filteredDecks = decks.filter(
            // We filter the searched results from state's 'decks'
            deck => searchedDecks.trim().length !== 0
                // If the title (in lowercase) includes the current searchstring return true
                ? deck.title.toLowerCase().includes( searchedDecks.toLowerCase() )
                // Else don't include the deck in the searchquery
                : false
        )
        return filteredDecks
    }

    return (
        <View style={{ zIndex: 10 }}>
            { decks !== null && ( this.filteredDecksWithSearch().length !== 0 && (
                <List>
                    { this.filteredDecksWithSearch().map( deck => (
                        <DeckListItem
                            deck={ deck }
                            onRowPress={ () => handleRowPress(deck) }
                        />
                    )) }
                </List>
            )) }
        </View>
    )

}

const styles = StyleSheet.create({

    searchBarIsShown: {
        marginTop: Platform.OS === 'ios' ? 31 : 30
    },

    searchBarIsHidden: {
        margin: -1,
    }
})

export default SearchBarDeckList