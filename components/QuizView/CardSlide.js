import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

import CorrectIncorrectButtons from './CorrectIncorrectButtons'
import ShowAnswerButton from './ShowAnswerButton'

export default class CardSlide extends Component {

    state = {
        sideSwipe: new Animated.Value(0),
        flipValue: new Animated.Value(0),
        isHidden: true
    }

    shouldComponentUpdate( nextProps, nextState ) {
        // If the nexprops.shouldShowAnswer is different from the current and it's 'true'
        if ( nextProps.shouldShowAnswer !== this.props.shouldShowAnswer && nextProps.shouldShowAnswer ) {
            this.rotateAnswer(false)
        }

        return true
    }




    rotateAnswer = (status) => {
        let { flipValue, sideSwipe, isHidden } = this.state

        Animated.parallel([
            Animated.timing(sideSwipe, { duration: 250, toValue: 130 }),
            Animated.timing(flipValue, { duration: 300, toValue: 90 }),
        ]).start(() => {
            // Halfway through animation
            this.setState({ isHidden: status })
            Animated.parallel([
                Animated.timing(sideSwipe, { duration: 250, toValue: 0, delay: 40 }),
                Animated.timing(flipValue, { duration: 300, toValue: status ? 0 : 180, delay: 0 }),
            ]).start()
        })
    }

    render() {
        const { currentQuestion, handleQuestionAnswer, currentQuestionIndex, totalNumberOfQuestions } = this.props
        const { flipValue, isHidden, sideSwipe } = this.state

        const flipDegValue = flipValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
        })

        return (
            <Animated.View style={{ flex: 1, height: '100%', margin: 15 }}>
                <Animated.Text style={ styles.questionText }>{ currentQuestion.question }</Animated.Text>

                <Animated.View style={[ styles.showAnswerContainer, { right: sideSwipe, transform: [{ rotateY: flipDegValue }] }]}>
                    { isHidden
                    ?
                        <ShowAnswerButton
                            /*handleShowAnswer={ () => handleShowAnswer() }*/
                            handleShowAnswer={ () => this.rotateAnswer(false) }
                        />
                    :
                        <Animated.Text style={{ transform: [{ rotateY: '-180deg' }] }}>{ currentQuestion.answer }</Animated.Text>
                    }
                </Animated.View>

                <Animated.View style={{ flex: 1 }}>
                    <CorrectIncorrectButtons
                        /*style={{ flex: 1 }}*/
                        currentQuestionIndex={ currentQuestionIndex }
                        totalNumberOfQuestions={ totalNumberOfQuestions }
                        handleQuestionAnswer={ answerStatus => {
                            if ( !isHidden ) { this.rotateAnswer(true) }
                            handleQuestionAnswer(answerStatus) }
                        }
                    />
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({

    questionText: {
        fontSize: 30,
        textAlign: 'center'
    },

    showAnswerContainer: {
        // flex: 1,
        height: 170,
        borderRadius: 4,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }

})