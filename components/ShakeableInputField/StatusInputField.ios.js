import React from 'react'
import { StyleSheet, TextInput } from 'react-native'


const ShakeableInputField = ({ textChange, placeholderText, inputField }) => {
    const { text, status } = inputField

    return(
        <TextInput
            value={ text }
            onChangeText={ inputFieldText => textChange(inputFieldText) }
            placeholder={ placeholderText }
            style={[
                styles.textInputfield,
                status ? { borderColor: 'red' } : { borderColor: 'darkgray' }
            ]}
        />
    )
}


const styles = StyleSheet.create({
    textInputfield: {
        borderWidth: 0.9,
        borderRadius: 3,
        padding: 7,
        justifyContent: 'center',
        fontSize: 14
    }
})


export default ShakeableInputField
