import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { mainGreen } from '../../utils/colors'

const QuizCompleted = ({ handleRestart, handleGoBack, correctQuestions, numberOfQuestions }) => {

    cheerString = () => {
        let stringToReturn = ""

        // 0 %
        if (correctQuestions === 0) stringToReturn = "Maybe try another quiz."

        // < 20 %
        if (numberOfQuestions * 0.2 >= correctQuestions) stringToReturn = "Keep your head up!"

        // > 20 %
        if (numberOfQuestions * 0.2 <= correctQuestions) stringToReturn = "Think twice, answer once."

        // > 40 %
        if (numberOfQuestions * 0.4 <= correctQuestions) stringToReturn = "In the middle!"

        // > 60 %
        if (numberOfQuestions * 0.6 <= correctQuestions) stringToReturn = "Great work!"

        // > 80 %
        if (numberOfQuestions * 0.8 <= correctQuestions) stringToReturn = "Almost perfect!"

        // 100 %
        if (numberOfQuestions === correctQuestions) stringToReturn = "Perfect, well done!"

        return stringToReturn
    }

    restartButton = () => {
        return (
            <View style={ styles.touchableContainer }>
                <Text style={ styles.titleText }>
                    Restart Quiz
                </Text>
                <Ionicons name="ios-sync-outline" size={ 80 } color={ 'white' } />
            </View>
        )
    }

    goBackButton = () => {
        return (
            <View style={ styles.touchableContainer }>
                <Text style={ styles.titleText }>
                    Go Back
                </Text>
                <Ionicons name="ios-arrow-round-back-outline" size={ 80 } color={ 'white' } />
            </View>
        )
    }

    return (

        <View style={{ flex: 1, margin: 15 }}>
             <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 20 }}>
                Quiz completed!
            </Text>
            <Text>
                You got
                <Text style={{ fontWeight: 'bold' }}> { correctQuestions } </Text>
                out of
                <Text style={{ fontWeight: 'bold' }}> { numberOfQuestions } </Text>
                { numberOfQuestions === 1 ? 'question' : 'questions' } right.
            </Text>
            <Text>
                { this.cheerString() }
            </Text>

            { Platform.OS === 'ios'
            ?
                <View style={ styles.container }>
                    <TouchableOpacity style={ styles.whatNextButtons } onPress={ () => handleGoBack() }>
                        { this.goBackButton() }
                    </TouchableOpacity>

                    <TouchableOpacity style={ styles.whatNextButtons } onPress={ () => handleRestart() }>
                        { this.restartButton() }
                    </TouchableOpacity>
                </View>
            :
                <View style={ styles.container }>
                    <TouchableNativeFeedback style={ styles.whatNextButtons } onPress={ () => handleGoBack() }>
                        { this.goBackButton() }
                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback style={ styles.whatNextButtons } onPress={ () => handleRestart() }>
                        { this.restartButton() }
                    </TouchableNativeFeedback>
                </View>
            }
        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    touchableContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    titleText: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 15,
        color: 'white',
    },

    whatNextButtons: {
        height: 150,
        width: '45%',
        borderRadius: 4,
        marginBottom: '2%',
        backgroundColor: mainGreen,

        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 1, 0, 0.24)',
        shadowOffset: { height: 7.5, width: 5 },
    },

})


export default QuizCompleted