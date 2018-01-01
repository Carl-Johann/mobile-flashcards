import React from 'react'
import { View, StyleSheet, Text, Animated, TouchableNativeFeedback } from 'react-native'

const AddButton = ({ handleAdd, buttonOpacity }) => {
    return (
        <TouchableNativeFeedback style={ styles.buttonContainerStyle } onPress={ () => handleAdd() } >
            <Animated.Text style={[ styles.buttonTextStyle, { opacity: buttonOpacity } ]}>
                ADD
            </Animated.Text>
        </TouchableNativeFeedback>
    )
}


const styles = StyleSheet.create({

    buttonContainerStyle: {
        backgroundColor: '#4fbf40',
        justifyContent: 'center',

        height: 35,
        borderRadius: 0.8,
    },

    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

})

export default AddButton