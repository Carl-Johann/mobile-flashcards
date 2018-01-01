import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Title, Button, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { getAllDecks, getSpecificDeck } from '../utils/api'
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button';


class DetailDeckView extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: "Deck Detail",
        headerTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#4fbf40' },
    })

    state = {
        deck: {
            questions: []
        }
    }

    render() {
        const { navigation, goBackToFlatlist, } = this.props
        const { deck } = this.state

        const addButton = () => { return ( <Text style={ styles.buttonTextStyle }>ADD</Text> ) }
        const goBackButton = () => { return ( <Text style={ styles.buttonTextStyle }>GO BACK</Text> ) }
        const startQuizButton = () => { return ( <Text style={ styles.buttonTextStyle }> START QUIZ </Text> ) }


        return (
            <View style={ styles.container }>
                    { this.props.deckInDetail !== undefined && (
                        <View>
                            <Text style={ styles.textContainer }>
                                <Text style={{ fontWeight: 'bold' }}>Deck Title: </Text> { this.props.deckInDetail.title }
                            </Text>
                            <Text style={ styles.textContainer }>
                                <Text style={{ fontWeight: 'bold' }}>Number of Questions: </Text> { this.props.deckInDetail.questions.length }
                            </Text>
                        </View>
                    ) }

                    <View style={ styles.startQuizButton } >
                        { Platform.OS === 'ios' ?
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={[ styles.buttonContainerStyleiOS, { width: '49%', marginBottom: '2%' } ]} onPress={ () => goBackToFlatlist() } >
                                        { goBackButton() }
                                    </TouchableOpacity>

                                    <View style={{ width: '2%' }} />

                                    <TouchableOpacity style={[ styles.buttonContainerStyleiOS, { width: '49%', marginBottom: '2%' } ]} onPress={ () => navigation.navigate("CreateQuestionFromDeckDetail", { deck }) } >
                                        { addButton() }
                                    </TouchableOpacity>
                                </View>

                                <TouchableOpacity style={ styles.buttonContainerStyleiOS } onPress={ () => navigation.navigate('QuizView', { deck })} >
                                    { startQuizButton() }
                                </TouchableOpacity>
                            </View>
                        :
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableNativeFeedback style={[ styles.buttonStyleAndroid, { width: '49%', marginBottom: '2%' } ]} onPress={ () => goBackToFlatlist() } >
                                        { goBackButton() }
                                    </TouchableNativeFeedback>

                                    <View style={{ width: '2%' }} />

                                    <TouchableNativeFeedback style={[ styles.buttonStyleAndroid, { width: '49%', marginBottom: '2%' } ]} onPress={ () => navigation.navigate("CreateQuestionFromDeckDetail", { deck }) } >
                                        { addButton() }
                                    </TouchableNativeFeedback>
                                </View>

                                <TouchableNativeFeedback style={ styles.buttonStyleAndroid } onPress={ () => navigation.navigate('QuizView', { deck })} >
                                    { startQuizButton() }
                                </TouchableNativeFeedback>
                            </View>
                        }
                    </View>
            </View>

        )
    }


}



const styles = StyleSheet.create({

    container: {
        flex: 1,
        margin:  15,
        paddingTop: 10,
    },

    buttonContainerStyleiOS: {
        backgroundColor: '#4fbf40',
        justifyContent: 'center',

        height: 35,
        borderRadius: 4,


        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 1, 0, 0.24)',
        shadowOffset: { width: 5, height: 7.5 }
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
        flex:1,
        bottom: 20,
        justifyContent: 'flex-end',
    },

    textContainer: {
        paddingBottom: 7,
    },

})


const mapStateToProps = ({ deckInDetail }) => {
  return { deckInDetail }
}

export default connect( mapStateToProps )(DetailDeckView)