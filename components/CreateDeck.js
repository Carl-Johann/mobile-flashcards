import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { setDeck } from '../utils/api'

export default class CreateDeck extends Component {

    state = {
        deckTitle: '',
    }


    static navigationOptions = ({ navigation }) => ({
        headerTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#4fbf40' },
    })

    createDeck = () => {

        let deckTitle = this.state.deckTitle // Check the title

        let deck = {
            title: deckTitle,
            questions: []
        }

        setDeck( deckTitle, deck )
        this.props.navigation.navigate('DeckView')
    }


    checkTitleBeforeSubmit = () => {

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