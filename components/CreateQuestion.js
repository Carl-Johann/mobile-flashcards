import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, TouchableNativeFeedback, Animated, Easing } from 'react-native'
import { setQuestion } from '../utils/api'
import { Ionicons, Entypo } from '@expo/vector-icons'

import ShakeableInputField from './ShakeableInputField'

export default class CreateQuestion extends Component {

    state = {
        inputFields: {
            question: {
                text: '',
                status: false
            },
            answer: {
                text: '',
                status: false
            }
        },

        // questionTextStatus: true,
        // shakeDegreeQuestion: new Animated.Value(0.0),

        // answerTextStatus: true,
        // shakeDegreeAnswer: new Animated.Value(0),

        addButtonWidth: new Animated.Value(100),
        addButtonOpacity: new Animated.Value(1),
        addButtonHeight: new Animated.Value(35),

    }


    static navigationOptions = ({ navigation }) => ({
        headerTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#4fbf40' },
    })







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


        // switch( inputField ) {
        // case 'questionText':
        //     console.log(inputFieldText)
        //     break
        // case 'answerText':
        //     console.log(inputFieldText)
        //     this
        //     break
        // }
    }





    handleAddQuestion = () => {

        if (this.checkFields()) {
            // Both TextInputs are not empty

            setQuestion(
                this.props.navigation.state.params.deck,
                this.state.questionText,
                this.state.answerText
            )

            Animated.parallel([
                Animated.timing(this.state.addButtonWidth,   { duration: 349, toValue: 0 }),
                Animated.timing(this.state.addButtonOpacity, { duration: 359, toValue: 0 }),
                Animated.timing(this.state.addButtonHeight,  { duration: 1,   toValue: 0, delay: 349 }),
            ]).start( () => this.props.navigation.goBack() )
        }
    }




    checkFields = () => {
        let questionText = this.state.questionText
        let answerText = this.state.answerText

        shouldContinue = true

        this.setState({
            questionTextStatus: true,
            answerTextStatus: true,
        })

        if (questionText.trim().length === 0 ) {
             shouldContinue = false
            this.setState({ questionTextStatus: false })
            this.actiavteShake(this.state.shakeDegreeQuestion)
        }

        if (answerText.trim().length === 0 ) {
            shouldContinue = false
            this.setState({ answerTextStatus: false })
            this.actiavteShake(this.state.shakeDegreeAnswer)
        }

        return shouldContinue
    }




    render() {

        const { params } = this.props.navigation.state
        const { inputFields, addButtonOpacity } = this.state


        // const spinQuestion = this.state.shakeDegreeQuestion.interpolate({
        //     inputRange: [-1, 1],
        //     outputRange: ['-1deg', '1deg']
        // })

        // const spinAnswer = this.state.shakeDegreeAnswer.interpolate({
        //     inputRange: [-1, 1],
        //     outputRange: ['-1deg', '1deg']
        // })

        const buttonWidth = this.state.addButtonWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        })


        return (
            <TouchableOpacity onPress={ () => {
                    if ( this.props.navigation.state.params ) {
                        {/*this.refs.answerInput.blur()
                        this.refs.questionInput.blur()*/}
                    }
                }}
                style={{ flex: 1 }}
                activeOpacity={ 1 }
            >

            <Animated.View style={ styles.container } >


                { this.props.navigation.state.params
                ?
                    <Animated.View>

                        { Object.entries(inputFields).map( ([ key, value ]) => (
                            <View style={{ marginBottom: 10 }} >
                                <ShakeableInputField
                                    placeholderText={ key.charAt(0).toUpperCase() + key.slice(1) }
                                    textChange={ inputFieldText => this.inputChange(key, inputFieldText) }
                                    inputField={ value }
                                />
                            </View>
                        )) }

                        {/*<View style={{ marginBottom: 10 }} >
                            <ShakeableInputField
                                placeholderText='Question'
                                textChange={ inputFieldText => this.inputChange('questionText', inputFieldText) }
                                textValue={ questionText }
                            />
                        </View>
                        <View>
                            <ShakeableInputField
                                placeholderText='Answer'
                                textChange={ inputFieldText => this.inputChange('answerText', inputFieldText) }
                                textValue={ answerText }

                            />
                        </View>*/}

                        {/*<Animated.View style={{ transform: [{ rotate: spinQuestion }] }}>
                            <TextInput
                                value={ questionText }
                                onChangeText={ (questionText) => this.setState({ questionText }) }
                                placeholder={ Platform.OS === 'ios' ? "Question" : " Question" }
                                ref={'questionInput'}
                                style={[
                                    Platform.OS === 'ios' ? styles.textInputfieldiOS : styles.textInputfieldAndroid,
                                    questionTextStatus ? { borderColor: 'darkgray' } : { borderColor: 'red' }
                                ]}
                                underlineColorAndroid={ Platform.OS === 'android' ? questionTextStatus ? 'darkgray' : 'red' : 'transparent' }
                            />
                        </Animated.View>*/}

                        {/*<Animated.View style={{ transform: [{ rotate: spinAnswer }] }}>
                            <TextInput
                                value={ answerText }
                                onChangeText={ (answerText) => this.setState({ answerText }) }
                                multiline = {true}
                                ref={'answerInput'}
                                placeholder={ Platform.OS === 'ios' ? "Answer" : " Answer" }
                                style={[
                                    Platform.OS === 'ios' ? styles.textInputfieldiOS : styles.textInputfieldAndroid,
                                    answerTextStatus ? { borderColor: 'darkgray' } : { borderColor: 'red' },
                                    { marginTop: 19 }
                                ]}
                                underlineColorAndroid={ Platform.OS === 'android' ? answerTextStatus ? 'darkgray' : 'red' : 'transparent' }
                            />
                        </Animated.View>*/}
                    </Animated.View>
                :
                    <Text>Intet Deck </Text>
                }


                <View style={ styles.startQuizButton } >
                    { Platform.OS === 'ios' ?
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>

                            <Animated.View style={{ width: buttonWidth, height: this.state.addButtonHeight }}>
                                <TouchableOpacity style={ styles.buttonContainerStyleiOS } onPress={ () => this.handleAddQuestion()} >
                                    <Animated.Text style={[ styles.buttonTextStyle, { opacity: addButtonOpacity } ]}>
                                        ADD
                                    </Animated.Text>
                                </TouchableOpacity>
                            </Animated.View>

                        </View>
                    :

                        <TouchableNativeFeedback onPress={ () => this.handleAddQuestion() }>
                            <View style={ styles.buttonStyleAndroid } >
                                <Text style={ styles.buttonTextStyle }>
                                    ADD
                                </Text>
                            </View>
                        </TouchableNativeFeedback>

                    }
                </View>

            </Animated.View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        marginTop: 25,
    },

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

    explenationText: {
        textAlign: 'center',
        fontSize: 20,

    },

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },


    buttonContainerStyleiOS: {
        backgroundColor: '#4fbf40',
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 1, 0, 0.24)',

        justifyContent: 'center',
        alignItems: 'center',

        height: 35,
        borderRadius: 4,

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

    buttonStyleAndroid: {
        backgroundColor: '#4fbf40',
        justifyContent: 'center',

        height: 35,
        borderRadius: 0.8,
    },

    startQuizButton: {
        marginTop: 9
    },
})