import React from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import CorrectIncorrectButtonStyles from './CorrectIncorrectButtonStyles'

const CorrectIncorrectButtons = ({ handleQuestionAnswer, currentQuestionIndex, totalNumberOfQuestions }) => {
    const styles = CorrectIncorrectButtonStyles

    return (
        <View style={ styles.buttonContainer }>

            <View style={ styles.questionCounterCircle }>
                <Text style={{ textAlign: 'center', width: 50, bottom: -26.5 }}>{ currentQuestionIndex + 1 } / { totalNumberOfQuestions } </Text>
            </View>

            <TouchableNativeFeedback
                style={[ styles.answerButton, { backgroundColor: 'green', marginBottom: 15 } ]}
                onPress={ () => handleQuestionAnswer(true) }
            >
                <Text styles={ styles.answerButtonText }>
                    Correct
                </Text>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback
                style={[ styles.answerButton, { backgroundColor: 'red' } ]}
                onPress={ () => handleQuestionAnswer(false) }
            >
                <Text styles={ styles.answerButtonText }>
                    Incorrect
                </Text>
            </TouchableNativeFeedback>

        </View>
    )
}

export default CorrectIncorrectButtons