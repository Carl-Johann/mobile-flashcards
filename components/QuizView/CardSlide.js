import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CorrectIncorrectButtons from './CorrectIncorrectButtons'
import ShowAnswerButton from './ShowAnswerButton'

const CardSlide = ({ currentQuestion, handleQuestionAnswer, handleShowAnswer, currentQuestionIndex, totalNumberOfQuestions, shouldShowAnswer }) => {


    return (
        <View style={{ flex: 1, height: '100%' }}>
            <View style={{ flex: 1, margin: 15 }}>
                <Text style={ styles.questionText }>{ currentQuestion.question }</Text>

                <View style={ styles.showAnswerContainer }>
                    { shouldShowAnswer
                    ?
                        <Text> { currentQuestion.answer } </Text>
                    :
                        <ShowAnswerButton
                            handleShowAnswer={ () => handleShowAnswer() }
                        />
                    }
                </View>

                <CorrectIncorrectButtons
                    style={{ flex: 1 }}
                    currentQuestionIndex={ currentQuestionIndex }
                    totalNumberOfQuestions={ totalNumberOfQuestions }
                    handleQuestionAnswer={ answerStatus => handleQuestionAnswer(answerStatus) }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    questionText: {
        fontSize: 30,
        textAlign: 'center'
    },

    showAnswerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

})

export default CardSlide