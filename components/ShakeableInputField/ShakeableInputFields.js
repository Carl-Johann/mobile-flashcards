import React, { Component } from 'react'
import { View, StyleSheet, Platform, TextInput, Animated } from 'react-native'

import StatusInputField from './StatusInputField'
import CollapsibleAddButton from './AddButton/CollapsibleAddButton'

export default class ShakeableInputFields extends Component {

    state = {
        inputFields: { },
    }


    componentDidMount() {
        let inputFields = this.props.inputFields

        Object.entries(inputFields).map( ([ key, value ]) => {
            inputFields = {
                ...inputFields,
                [key]: {
                    ...inputFields[key],
                    // We need to add Animatable values to each input field.
                    inputFieldShakeDegree: new Animated.Value(0)
                }
            }
        })

        this.setState({ inputFields })
    }

    shouldComponentUpdate( nextProps, nextState ) {
        // Check if this component's inputfields are = {}. If they are, we need to setstate from nextprops.

        let shouldEmpty = this.props.shouldEmpty
        // To avoid a loop we check if 'nextProps.shouldEmpty' !== shouldEmpty.
        if ( nextProps.shouldEmpty !== shouldEmpty ) if ( shouldEmpty ) this.emptyInputFields()

        return true
    }

    activteShake = ( inputFields ) => {
        this.setState({ inputFields })
        Object.entries(inputFields).map( ([ key, value ]) => {
            if (value.status) {
                let shakeDegree = value.inputFieldShakeDegree

                Animated.sequence([
                    Animated.timing(shakeDegree, { duration: 60, toValue:  1 }),
                    Animated.timing(shakeDegree, { duration: 60, toValue: -1 }),
                    Animated.timing(shakeDegree, { duration: 60, toValue:  1 }),
                    Animated.timing(shakeDegree, { duration: 60, toValue: -1 }),
                    Animated.timing(shakeDegree, { duration: 60, toValue:  1 }),
                    Animated.timing(shakeDegree, { duration: 60, toValue:  0 }),
                ]).start()
            }
        })

    }


    inputChange = ( inputField, inputFieldText ) => {
        // console.log( inputFieldText, "at:", inputField )

        let fields = this.state.inputFields
        fields = {
            ...fields,
            [inputField]: {
                ...fields[inputField],
                text: inputFieldText
            }
        }

        this.setState({ inputFields: fields })
    }


    checkFields = () => {
        let inputFields = this.state.inputFields
        let shouldContinueAdding = true

        Object.entries(inputFields).map( ([ key, value ]) => {
            // If only one inputField is empty we shouldn't continue
            if (value.text.trim().length === 0) shouldContinueAdding = false

            inputFields = {
                ...inputFields,
                [key]: {
                    ...inputFields[key],
                    // If the inputField is empty we set 'status' to true
                    status: value.text.trim().length !== 0 ? false : true
                }
            }
        })

        this.activteShake( inputFields )


        // If all fields have content, we call the supplied 'handleAdd' method.
        if (shouldContinueAdding) {
            setTimeout( () => { this.emptyInputFields() }, 500 )
            this.props.handleAdd(inputFields)
        }

        return shouldContinueAdding
    }


    emptyInputFields = () => {
        // console.log("emptyInputFields")
        let inputFields = this.state.inputFields
        Object.entries(inputFields).map( ([ key, value ]) => {
            inputFields = {
                ...inputFields,
                [key]: {
                    ...inputFields[key],
                    text: '',
                    status: false,
                    inputFieldShakeDegree: new Animated.Value(0)
                }
            }
        })
        this.setState({ inputFields })
    }



    render() {

        const { inputFields } = this.state

        return (
            <Animated.View>

                { Object.entries(inputFields).map( ([ key, value ]) => {
                    {/*console.log("name",key)
                    console.log("value", value.text)
                    console.log("-------------------")*/}
                    const spin = this.state.inputFields[key].inputFieldShakeDegree.interpolate({
                        inputRange: [-1, 1],
                        outputRange: ['-1deg', '1deg']
                    })
                    return (
                        <Animated.View style={[{ marginBottom: 10 }, {transform: [{ rotate: spin }] } ]}>
                            <StatusInputField
                                placeholderText={ key.charAt(0).toUpperCase() + key.slice(1) }
                                textChange={ inputFieldText => this.inputChange(key, inputFieldText) }
                                inputField={ value }
                            />
                        </Animated.View>
                    )
                } )}


                <View style={ styles.startQuizButton } >
                    <CollapsibleAddButton
                        checkFields={ () => this.checkFields() }
                        goBack={ () => this.props.goBack() }
                    />
                </View>
            </Animated.View>
        )
    }
}



const styles = StyleSheet.create({

    startQuizButton: {
        marginTop: 9
    },

 })