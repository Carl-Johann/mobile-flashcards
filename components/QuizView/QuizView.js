import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native'
import { clearLocalNotification, setLocalNotification } from '../../ReminderNotification/ReminderNotification'

import CardSlide from './CardSlide'
import QuizCompleted from './QuizCompleted'

class QuizView extends Component {

     static navigationOptions = ({ navigation }) => ({
        title: "Quiz",
        headerTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#4fbf40' },
    })

    state = {
        currentQuestionIndex: 0,
        numberOfCorrectQuestions: 0,

        shouldShowAnswer: false
    }



    handleQuestionAnswer = (answerStatus) => {
        let { currentQuestionIndex, numberOfCorrectQuestions } = this.state
        let deckInDetail = this.props.deckInDetail


        // Checking if the user has finished the quiz
        if (currentQuestionIndex < deckInDetail.questions.length) {
            this.setState({
                currentQuestionIndex: currentQuestionIndex += 1,
                numberOfCorrectQuestions: answerStatus ? numberOfCorrectQuestions += 1 : numberOfCorrectQuestions,
                shouldShowAnswer: false
            })
        }

        // Quiz is done
        if ( currentQuestionIndex === deckInDetail.questions.length ) {
            clearLocalNotification()
                .then(setLocalNotification)
        }
    }

    handleShowAnswer = () => { this.setState({ shouldShowAnswer: true }) }

    handleRestart = () => {
        this.setState({
            currentQuestionIndex: 0,
            numberOfCorrectQuestions: 0,
            shouldShowAnswer: false
        })
    }

    handleGoBack = () => { this.props.navigation.navigate('DeckView') }


    render() {
        const { deckInDetail } = this.props
        const { currentQuestionIndex, numberOfCorrectQuestions, shouldShowAnswer } = this.state

        return (
            <View style={{ flex: 1 }} >
                <View style={{ flex: 1, height: '100%' }}>
                    { currentQuestionIndex < deckInDetail.questions.length
                    ?
                        <CardSlide
                            shouldShowAnswer={ shouldShowAnswer }
                            currentQuestionIndex={ currentQuestionIndex }
                            handleShowAnswer={ () => this.handleShowAnswer() }
                            totalNumberOfQuestions={ deckInDetail.questions.length }
                            currentQuestion={ deckInDetail.questions[currentQuestionIndex] }
                            handleQuestionAnswer={ answerStatus => this.handleQuestionAnswer(answerStatus) }
                        />
                    :
                        <QuizCompleted
                            handleGoBack={ () => this.handleGoBack() }
                            handleRestart={ () => this.handleRestart() }
                            correctQuestions={ numberOfCorrectQuestions }
                            numberOfQuestions={ deckInDetail.questions.length }
                        />
                    }

                </View>
            </View>
        )
    }
}

const mapStateToProps = ({ deckInDetail }) => {
  return { deckInDetail }
}

export default connect( mapStateToProps )(QuizView)