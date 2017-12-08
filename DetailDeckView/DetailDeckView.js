import React, { Component } from 'react'
import { View, Text, StyleSheet, Title, Button, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button';



export default class DetailDeckView extends Component {


    componentDidMount() {

    }


    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.deck.title || "Deck Detail",
        headerRight:
        <View style={{ marginRight: 15 }}>

            { Platform.OS === 'ios' ?

                <TouchableOpacity onPress={ () => navigation.navigate("CreateQuestion", { deck: navigation.state.params.deck }) }>
                    <MaterialIcons name='add' color='white' size={ 35 }/>
                </TouchableOpacity >

            :

                <TouchableOpacity onPress={ () => navigation.navigate("CreateQuestion", { deck: navigation.state.params.deck }) } activeOpacity={ 0.75 }>
                    <Entypo name='squared-plus' color={ 'white' } size={ 24 } />
                </TouchableOpacity >
            }

        </View>
    })


    render () {

        const { deck } = this.props.navigation.state.params


        return (
            <View style={ styles.container }>

                <View>
                    <Text style={ styles.textContainer }>
                        <Text style={{ fontWeight: 'bold' }}>Title: </Text> { deck.title }
                    </Text>
                    <Text style={ styles.textContainer }>
                        <Text style={{ fontWeight: 'bold' }}>Number of questions: </Text> { deck.questions.length }
                    </Text>
                </View>

                <View style={ styles.startQuizButton } >
                    { Platform.OS === 'ios' ?

                        <TouchableOpacity style={ styles.buttonContainerStyleiOS } onPress={ () => console.log("didClick TouchableOpacity") } >
                            <Text style={ styles.buttonTextStyle }>
                                START QUIZ
                            </Text>
                        </TouchableOpacity>

                    :

                        <TouchableNativeFeedback onPress={ () => console.log("didClick TouchableNativeFeedback")}>
                            <View style={ styles.buttonStyleAndroid } >
                                <Text style={ styles.buttonTextStyle }>
                                    START QUIZ
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    }
                </View>

            </View>

        )
    }


}


const styles = StyleSheet.create({

    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },

    container: {
        flex: 1,
        margin:  15,
        paddingTop: 10,
    },

    buttonContainerStyleiOS: {
        backgroundColor: '#4fbf40',
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 1, 0, 0.24)',

        justifyContent: 'center',

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
        flex:1,
        bottom: 20,
        justifyContent: 'flex-end',
    },

    textContainer: {
        paddingBottom: 7,
    },

})