import React from 'react'
import { Text, StyleSheet, TouchableNativeFeedback } from 'react-native'

const ShowAnswerButton = ({ handleShowAnswer }) => {
    return (
        <TouchableNativeFeedback onPress={ () => handleShowAnswer() } >
            <Text>
                SHOW ANSWER
            </Text>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ShowAnswerButton