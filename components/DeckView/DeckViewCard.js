import React, { Component } from 'react'
import { View, StyleSheet, Animated, Dimensions } from 'react-native'

import QuizView from '../QuizView/QuizView'
import DetailDeckView from '../DetailDeckView'
import ClickableDeckViewCard from './ClickableDeckViewCard'
import DeckCard from './DeckCard'

export default class DeckViewCard extends Component {

    state = {
        flipValueFront: new Animated.Value(0),
        flipValueBack: new Animated.Value(-180),

        opacityFront: new Animated.Value(1),
        opacityBack: new Animated.Value(0),

        cardHeight: new Animated.Value(160),
        cardWidth: new Animated.Value(300),

        windowHeight: 0,
        windowWidth: 0,

        cardFlipped: false
    }


    componentDidMount() {
        var { height, width } = Dimensions.get('window')

        height -= 69

         this.setState({
             windowHeight: height,
             windowWidth: width
         })
    }


    handleFlip = (shouldDisable) => {
        // console.log("should", shouldDisable)
        this.props.disableMe(shouldDisable, this.props.deck)

        shouldDisable ? this.setState({ cardFlipped: true }) : null
        Animated.parallel([
            Animated.timing(this.state.flipValueFront, { duration: 700, toValue: shouldDisable ? 180 : 0 }),
            Animated.timing(this.state.flipValueBack,  { duration: 700, toValue: shouldDisable ? 0 : -180  }),
            Animated.timing(this.state.opacityFront,   { duration: 0, toValue: shouldDisable ? 0 : 1, delay: 350 }),
            Animated.timing(this.state.opacityBack,    { duration: 0, toValue: shouldDisable ? 1 : 0, delay: 350 }),
            Animated.timing(this.state.cardHeight,     { duration: shouldDisable ? 1000 : 350 , toValue: shouldDisable ? this.state.windowHeight : 160 }),
            Animated.timing(this.state.cardWidth,      { duration: shouldDisable ? 1000 : 350 , toValue: shouldDisable ? this.state.windowWidth  : 300 }),
        ]).start( () => shouldDisable ? null : this.setState({ cardFlipped: false }) )
    }

    render() {

        const { flipValueFront, flipValueBack, opacityFront, opacityBack, cardWidth, cardHeight, cardFlipped } = this.state
        const { deck, key, navigation, isItemDisabled } = this.props

        const flipYValueFront = flipValueFront.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

        const flipYValueBack = flipValueBack.interpolate({
            inputRange: [-180, 0],
            outputRange: ['-180deg', '0deg']
        })



        return (
                <Animated.View style={{
                    height: cardHeight,
                    width: cardWidth,
                    marginBottom: 7,
                }} >
                    <ClickableDeckViewCard
                        deck={ deck }
                        cardWidth={ cardWidth }
                        navigation={ navigation }
                        cardHeight={ cardHeight }
                        opacityBack={ opacityBack }
                        cardFlipped={ cardFlipped }
                        opacityFront={ opacityFront }
                        isItemDisabled={ isItemDisabled }
                        flipYValueBack={ flipYValueBack }
                        flipYValueFront={ flipYValueFront }
                        handleFlip={ status => this.handleFlip(status) }
                    />
                </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    cardOutline: {
        height: 160,
        padding: 15,
        borderRadius: 2,
        borderWidth: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'rgba(0, 1, 0, 0.24)',

        shadowRadius: 4,
        shadowOpacity: 1,
        shadowColor: 'rgba(0, 1, 0, 0.25)',

        shadowOffset: { width: 1, height: 1 }
    }
})