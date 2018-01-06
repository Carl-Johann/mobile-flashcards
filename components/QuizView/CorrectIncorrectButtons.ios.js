import React from 'react'
import { View, Text, TouchableOpacity, Animated } from 'react-native'
import CorrectIncorrectButtonStyles from './CorrectIncorrectButtonStyles'

const CorrectIncorrectButtons = ({ handleQuestionAnswer,  currentQuestionIndex, totalNumberOfQuestions }) => {
    const styles = CorrectIncorrectButtonStyles

    // const flipDegValue = flipValue.interpolate({
    //     inputRange: [0, 180],
    //     outputRange: ['0deg', '180deg']
    // })

    return (
        // <Animated.View style={[ styles.buttonContainer, { transform: [{ rotateY: flipDegValue }], } ]}>
        <Animated.View style={[ styles.buttonContainer ]}>

            <Animated.View style={[ styles.questionCounterCircle, styles.defaultShadow ]}>
                <Animated.Text style={{ textAlign: 'center', width: 50, bottom: -26.5 }}>
                    { currentQuestionIndex + 1 } / { totalNumberOfQuestions }
                </Animated.Text>
            </Animated.View>

            <TouchableOpacity
                style={[ styles.answerButton, styles.defaultShadow, { backgroundColor: 'green', marginBottom: 10 } ]}
                onPress={ () => handleQuestionAnswer(true) }
            >
                <Animated.Text styles={ styles.answerButtonText }>
                    Correct
                </Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[ styles.answerButton, styles.defaultShadow, { backgroundColor: 'red' } ]}
                onPress={ () => handleQuestionAnswer(false) }
            >
                <Animated.Text styles={ styles.answerButtonText }>
                    Incorrect
                </Animated.Text>
            </TouchableOpacity>

        </Animated.View>
    )
}

export default CorrectIncorrectButtons