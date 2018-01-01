import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import CorrectIncorrectButtonStyles from './CorrectIncorrectButtonStyles'

const CorrectIncorrectButtons = ({ handleQuestionAnswer, currentQuestionIndex, totalNumberOfQuestions }) => {
    const styles = CorrectIncorrectButtonStyles

    return (
        <View style={ styles.buttonContainer }>

            <View style={[ styles.questionCounterCircle, styles.defaultShadow ]}>
                <Text style={{ textAlign: 'center', width: 50, bottom: -26.5 }}>{ currentQuestionIndex + 1 } / { totalNumberOfQuestions } </Text>
            </View>

            <TouchableOpacity
                style={[ styles.answerButton, styles.defaultShadow, { backgroundColor: 'green', marginBottom: 15 } ]}
                onPress={ () => handleQuestionAnswer(true) }
            >
                <Text styles={ styles.answerButtonText }>
                    Correct
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[ styles.answerButton, styles.defaultShadow, { backgroundColor: 'red' } ]}
                onPress={ () => handleQuestionAnswer(false) }
            >
                <Text styles={ styles.answerButtonText }>
                    Incorrect
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default CorrectIncorrectButtons