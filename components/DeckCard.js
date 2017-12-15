import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, Animated, Easing, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import DeckView from './DeckView'
import DetailDeckView from './DetailDeckView'

export default class DeckCard extends Component {

    state = {
        opacity: new Animated.Value(0.0)
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, { duration: 300, toValue: 1.0 }).start()
    }



    render () {

        const deck = this.props.deck[1]

        const { opacity } = this.state
        if (Platform.OS === 'ios') {
        return (
            <Animated.View style={[
                    styles.cardOutline,
                    { marginBottom: 14 },
                    { opacity },
            ]} >
                <Text style={ styles.titleCardText }>
                    { deck.title }
                </Text>
                <Text style={ styles.questionsLengthCardText }>
                    { deck.questions.length === 1 ? "1 question" : `${deck.questions.length} questions` }
                </Text>
            </Animated.View>
        ) } else { return (
            <Animated.View style={[
                styles.cardOutline,
                { marginBottom: 10 },
                { opacity },
            ]} >
                <Text style={[ styles.cardText, { fontWeight: "300" } ]}>
                    { deck.title }
                </Text>
                <Text style={[ styles.questionsLengthCardText, { fontWeight: "200" } ]}>
                    { deck.questions.length === 1 ? "1 question" : `${deck.questions.length} questions` }
                </Text>
            </Animated.View>
        ) }


    }
}

const styles = StyleSheet.create({

    cardOutline: {
        height: 160,
        width: 220,
        borderWidth: 0.4,
        borderColor: 'rgba(0, 1, 0, 0.24)',
        // backgroundColor: '#15aa01',
        backgroundColor: 'white',
        borderRadius: 18,

        padding: 15,

        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 1, 0, 0.24)',

        shadowOffset: {
            width: 5,
            height: 7.5
        },
    },

    titleCardText: {
        fontSize: 16,
        color: 'black',
        marginBottom: 5,
        // fontWeight: "500",
    },

    questionsLengthCardText: {
        color: 'darkgray',
        fontSize: 12,
        // fontWeight: "400",
    }

})