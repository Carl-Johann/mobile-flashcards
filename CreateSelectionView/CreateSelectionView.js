import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native'
import QuestionCard from './QuestionCard'
import { StackNavigator, TabNavigator } from 'react-navigation'
import DeckView from '../DeckView/DeckView'

export default class CreateSelectionView extends Component {




    render () {



        return (
            <View style={ styles.container }>
                { Platform.OS === 'ios' ?
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate("CreateDeck")}>
                        <QuestionCard questionText="Create A Deck" shouldStack={true} />
                    </TouchableOpacity>

                 :
                    <TouchableNativeFeedback
                        onPress={ () => this.props.navigation.navigate('CreateDeck')}
                        background={TouchableNativeFeedback.SelectableBackground()}
                        useForeground={true}
                    >
                        <View>
                            <QuestionCard questionText="Create A Deck" shouldStack={false} />
                        </View>
                    </TouchableNativeFeedback>
                }

                { Platform.OS === 'ios' ?
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('CreateQuestion')}>
                        <View>
                            <QuestionCard questionText="Create A Question" shouldStack={false} />
                        </View>
                    </TouchableOpacity>

                 :

                    <TouchableNativeFeedback
                        onPress={ () => this.props.navigation.navigate('CreateQuestion') }
                        background={ TouchableNativeFeedback.SelectableBackground() }
                        useForeground={ true }
                    >
                        <View>
                            <QuestionCard questionText="Create A Question" shouldStack={false} />
                        </View>
                    </TouchableNativeFeedback>

                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})