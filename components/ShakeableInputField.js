import React, { Component } from 'react'
import { View, StyleSheet, Platform, TextInput, Animated } from 'react-native'

export default class ShakeableInputField extends Component {

    state = {
        // answerText: '',
        // inputTextStatus: true,
        inputFieldShakeDegree: new Animated.Value(0),
    }


    componentDidMount() {
        // console.log("spadser:", this.props.textValue)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return ( nextProps.textValue !== this.props.textValue )
    }

    checkFields = () => {
        // let questionText = this.state.questionText
        let inputFieldText = this.props.textValue
        let inputFieldShakeDegree= this.state.inputFieldShakeDegree

        shouldContinueAdding = true

        this.setState({
            // questionTextStatus: true,
            answerTextStatus: true,
        })

        if (answerText.trim().length === 0 ) {
            shouldContinueAdding = false
            this.setState({ inputTextStatus: false })
            this.actiavteShake( inputFieldShakeDegree )
        }

        return shouldContinueAdding
    }





    actiavteShake = () => {
        shakeDegreeValue = this.state.shakeDegreeAnswer

        Animated.sequence([
            Animated.timing(shakeDegreeValue, { duration: 60, toValue:  1 }),
            Animated.timing(shakeDegreeValue, { duration: 60, toValue: -1 }),
            Animated.timing(shakeDegreeValue, { duration: 60, toValue:  1 }),
            Animated.timing(shakeDegreeValue, { duration: 60, toValue: -1 }),
            Animated.timing(shakeDegreeValue, { duration: 60, toValue:  1 }),
            Animated.timing(shakeDegreeValue, { duration: 60, toValue:  0 }),
        ]).start()
    }





    render() {

        const { textChange, placeholderText, inputField } = this.props
        const { textValue, status } = inputField


        const spinInputField = this.state.inputFieldShakeDegree.interpolate({
            inputRange: [-1, 1],
            outputRange: ['-1deg', '1deg']
        })

        return(
            <Animated.View>
                <Animated.View style={{ transform: [{ rotate: spinInputField }] }}>
                    <TextInput
                        value={ textValue }
                        onChangeText={ inputFieldText => textChange(inputFieldText) }
                        placeholder={ Platform.OS === 'ios' ? placeholderText : ` ${placeholderText}` }
                        style={[
                            Platform.OS === 'ios' ? styles.textInputfieldiOS : styles.textInputfieldAndroid,
                            status ? { borderColor: 'red' } : { borderColor: 'darkgray' }
                        ]}
                        underlineColorAndroid={ Platform.OS === 'android' ? status ? 'red' : 'darkgray' : 'transparent' }
                    />
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    textInputfieldiOS: {
        borderWidth: 0.9,
        borderRadius: 3,
        padding: 7,
        justifyContent: 'center',
        fontSize: 14

    },

    textInputfieldAndroid: {
        borderRadius: 3,
        padding: 7,
        justifyContent: 'center',
        fontSize: 14

    },
})