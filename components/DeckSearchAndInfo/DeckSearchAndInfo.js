import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback, Animated } from 'react-native'
import ShakeableInputFields from '../ShakeableInputField/ShakeableInputFields';

class DeckSearchAndInfo extends Component {

    editField = () => {
        return (
            <Text numberOfLines={ 1 } ellipsizeMode={ Platform.OS === 'ios' ? 'clip' : 'tail' } style={ styles.editText }>
                Edit
            </Text>
        )
    }

    render () {
        const { changeSelectedDeck, deckInDetail, initalDeckSelectDone, titleTextOpacity, inputFields, handleAdd } = this.props

        return (
            <View style={{ flexDirection: 'row', margin: 15 }}>

                <View style={{ flex: 1, justifyContent: 'left' }}>
                    <Text style={{ marginRight: 15 }}>
                        <Text style={{ fontWeight: 'bold' }}>Deck Title:</Text> <Animated.Text style={{ opacity: titleTextOpacity }}>{deckInDetail.title }</Animated.Text>
                    </Text>
                </View>

                <Animated.View style={{ justifyContent: 'right', width: 65 }}>
                    { Platform.OS === 'ios'
                    ?
                        <TouchableOpacity onPress={ () => changeSelectedDeck() } style={ styles.editButton } >
                            { this.editField() }
                        </TouchableOpacity>
                    :
                        <TouchableNativeFeedback onPress={ () => changeSelectedDeck() } style={ styles.editButton } >
                            { this.editField() }
                        </TouchableNativeFeedback>
                    }
                </Animated.View>

            </View>
        )
    }

}


const styles = StyleSheet.create({

    editButton: {
        width: 65,
        height: 25,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4fbf40',
    },

    editText: {
        width: '95%',
        color: 'white',
        textAlign: 'center',
    }

})


const mapStateToProps = ({ deckInDetail }) => {
  return { deckInDetail }
}

export default connect( mapStateToProps )(DeckSearchAndInfo)