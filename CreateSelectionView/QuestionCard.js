import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Platform } from 'react-native'


export default class QuestionCard extends Component {

    state = {
        stackedCards: [
            {
                endDeg: -12,
                // endDeg: 0,
            },
            {
                endDeg: 16,
                // endDeg: 40,
            },
            {
                endDeg: 2,
                // endDeg: 4
            },
        ],
    }



    render () {
        const { questionText, shouldStack } = this.props

        if ( this.props.shouldStack !== undefined ) {
            if ( this.props.shouldStack ) {
                return (
                    this.state.stackedCards.map( (card, index) => {

                            // Animated.timing(card.endBottom, { duration: 500, toValue: card.endBottom}).start()
                            // Animated.timing( card.animatedDeg, { duration: 500, toValue: 1, easing: Easing.easeIn }).start()
                            // const spin = card.animatedDeg.interpolate({
                            //     inputRange: [0, 1],
                            //     outputRange: ['0deg',  card.endDeg + "deg"]
                            // })

                        return (

                                <View
                                    key={ card.endDeg }
                                    style={[ styles.cardOutline,
                                        { transform: [{ rotate: card.endDeg + "deg" }] },
                                        /*{ transform: [{ rotate: "5rad" }] },*/
                                        { bottom: index === 0 ? 0 : 160 },
                                        { marginBottom: index === 0 ? 0 : -160 },
                                    ]}
                                >
                                    {/*<TouchableOpacity>*/}
                                        <Text style={[ styles.cardText, Platform.OS === 'ios' ? { fontWeight: "500" } : { fontWeight: "300" } ]}>
                                            { questionText }
                                        </Text>
                                    {/*</TouchableOpacity>*/}
                                </View>

                        )
                    })
                )
            }
            if (this.props.shouldStack == false) {
                return (
                   <View style={styles.cardOutline}>
                        <Text style={ styles.cardText }>
                            { questionText }
                        </Text>
                    </View>
                )
            }
        }

        return (
            <View>
                <Text>{`${this.props.shouldStack}`}Error</Text>
            </View>
        )
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

        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 4,
        shadowOpacity: 0.8,
        // shadowColor: 'rgba(0, 1, 0, 0.24)',
        shadowColor: 'rgba(0, 1, 0, 0.24)',

        shadowOffset: {
            width: 10,
            height: 15
        },
    },


    cardText: {
        // color: '#65b032',
        // fontWeight: "500",

        color: 'black',
        textAlign: 'center',
        elevation: 10,
        fontSize: 15,
    }


})