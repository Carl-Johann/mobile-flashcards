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
                        /*onPress={ () => this.props.navigation.navigate('CreateQuestion')}*/
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
                        <View >
                            <QuestionCard questionText="Create A Question" shouldStack={false} />
                        </View>
                    </TouchableOpacity>

                 :

                    <TouchableNativeFeedback
                        /*onPress={ () => this.props.navigation.navigate('CreateQuestion')}*/
                        ackground={TouchableNativeFeedback.SelectableBackground()}
                        useForeground={true}
                    >
                        <View >
                            <QuestionCard questionText="Create A Question" shouldStack={false} />
                        </View>
                    </TouchableNativeFeedback>

                }

            </View>
        )
    }
}
{/*<TouchableOpacity onPress={ () => this.props.navigation.navigate("CreateDeck")} style={{ height: 350, width: 400 }}>*/}
                {/*<TouchableNativeFeedback>*/}
                    {/*<Button title="123" onPress={ () => {} }>*/}
                    {/*<View >*/}
 {/*</View>*/}
                {/*</Button>*/}

            {/*</TouchableNativeFeedback>*/}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    // box: {
        // flex: 1,
        // height: 300,
        // transform: [{ rotate: '-30deg'}],
        // marginTop: 30,
        // marginBottom: -60,
        // width: 300,
        // backgroundColor: '#e76e63',
        // margin: 10,
    // },

    // boxtwo: {
    //     backgroundColor: '#e76e63',
    //     height: 300,
    //     width: 300
    // }
})

// const styles = StyleSheet.create({
//     container: {
//         // marginTop: 100,
//         flex: 1,
//         justifyContent: 'space-around',
//         alignItems: 'center',
//     },

//     cardContainer: {
//         margin: 10,
//     }

// })