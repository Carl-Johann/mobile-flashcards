import React from 'react'
import { StyleSheet, TextInput } from 'react-native'


const ShakeableInputField = ({ textChange, placeholderText, inputField }) => {
    const { textValue, status } = inputField

    return(
        <TextInput
            value={ textValue }
            onChangeText={ inputFieldText => textChange(inputFieldText) }
            placeholder={ ` ${placeholderText}` }
            style={ styles.textInputfield }
            underlineColorAndroid={ status ? 'red' : 'darkgray' }
        />
    )
}


const styles = StyleSheet.create({
    textInputfield: {
        borderRadius: 3,
        padding: 7,
        justifyContent: 'center',
        fontSize: 14
    },
})


export default ShakeableInputField