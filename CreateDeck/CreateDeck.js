import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import setDeck from '../utils/api'

export default class CreateDeck extends Component {

    state = {
        deckTitle: '',
    }

    createDeck = () => {

        let deckTitle = this.state.deckTitle// Check the title
        let questions = []


        setDeck({ deckTitle, questions })
    }




    render() {
        const { deckTitle } = this.state

        return (
            <View>
                <TextInput
                    value={ deckTitle }
                    onChangeText={ ( deckTitle ) => this.setState({ deckTitle }) }
                />

                <Text>
                    CreateDeck View: { deckTitle }
                </Text>

                <Text onPress={ () => this.createDeck() }>
                    Create Deck
                </Text>

            </View>
        )
    }
}