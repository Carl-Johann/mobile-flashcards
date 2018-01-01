import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated  } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import DeckView from './DeckView'
import DetailDeckView from '../DetailDeckView'

const DeckCard = ({ deck }) => {

        return (
            <Animated.View style={ styles.cardOutline } >
                <Text style={ styles.titleCardText }>
                    { deck.title }
                </Text>
                <Text style={ styles.questionsLengthCardText }>
                    { deck.questions.length === 1 ? "1 question" : `${deck.questions.length} questions` }
                </Text>
            </Animated.View>
        )
}

const styles = StyleSheet.create({

    cardOutline: {
        height: 160,
        borderWidth: 0.4,
        borderColor: 'rgba(0, 1, 0, 0.24)',
        backgroundColor: 'white',
        borderRadius: 2,
        marginBottom: 7,
        padding: 15,

        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 4,
        shadowOpacity: 1,
        shadowColor: 'rgba(0, 1, 0, 0.25)',

        shadowOffset: {
            width: 1,
            height: 1
        },
    },

    titleCardText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
    },

    questionsLengthCardText: {
        color: 'darkgray',
        fontSize: 12,
    }

})

export default DeckCard