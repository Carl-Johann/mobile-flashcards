import React from 'react'
import { View , Animated, StyleSheet, TouchableOpacity } from 'react-native'


const AddButton = ({ handleAdd, buttonOpacity }) => {
    return (
        <TouchableOpacity style={ styles.buttonContainerStyle } onPress={ () => handleAdd() } >
            <Animated.Text style={[ styles.buttonTextStyle, { opacity: buttonOpacity } ]}>
                ADD
            </Animated.Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    buttonContainerStyle: {
        backgroundColor: '#4fbf40',
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 1, 0, 0.24)',

        justifyContent: 'center',
        alignItems: 'center',

        height: 35,
        borderRadius: 3,

        shadowOffset: {
            width: 5,
            height: 7.5
        }
    },

    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

})

export default AddButton