import React from 'react'
import { View, TouchableNativeFeedback, Animated } from 'react-native'

import DeckCard from './DeckCard'
import DetailDeckView from '../DetailDeckView'


const ClickableDeckViewCard = ({ isItemDisabled, handleFlip, flipYValueFront, opacityFront, flipYValueBack, deck, navigation, cardWidth, cardHeight, opacityBack, cardFlipped }) => {

    centerView = () => {
        return (
            <View>
                <Animated.View style={{
                    transform: [{ rotateY: flipYValueFront }],
                    opacity: opacityFront
                }}>
                    <DeckCard
                        deck={ deck[1] }
                        navigation={ navigation }
                    />
                </Animated.View>

                <Animated.View style={{
                    top: -167,
                    width: cardWidth,
                    height: cardHeight,
                    opacity: opacityBack,
                    backgroundColor: 'white',
                    display: cardFlipped ? null : 'none',
                    transform: [{ rotateY: flipYValueBack }],
                }}>
                    <DetailDeckView
                        deck={ deck[1] }
                        navigation={ navigation }
                        goBackToFlatlist={ () => handleFlip(false) }
                    />
                </Animated.View>
            </View>
        )
    }

    if ( isItemDisabled ) {
        return centerView()
    } else {
        return (
            <TouchableNativeFeedback onPress={ () => handleFlip(true) } zIndex={ 2 } >
                { centerView() }
            </TouchableNativeFeedback>
        )
    }
}

export default ClickableDeckViewCard