import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ShowAnswerButton = ({ handleShowAnswer }) => {
    return (
        <TouchableOpacity onPress={ () => handleShowAnswer() } >
            <Text>
                SHOW ANSWER
            </Text>
        </TouchableOpacity>
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