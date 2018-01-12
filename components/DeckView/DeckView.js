import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native'
import { setDeckInDetail, addAllDecks } from '../../actions/index'
import { getAllDecks } from '../../utils/api'
import DeckCard from './DeckCard'

import DeckViewCard from './DeckViewCard'

class DeckView extends Component {

    state = {
        decks: {},
        isListDisabled: true,
        scrollEnabled: true,
        disabledListItemIndex: -1
    }

    componentDidMount() {
        this.getDecks()

    }



    getDecks = () => {
        getAllDecks( (responseDecks) => {
            let decks = JSON.parse(responseDecks)
            let deckAsArray = []

            Object.entries(decks).map( deck => { deckAsArray.push(deck[1]) })

            this.props.addAllDecks(deckAsArray)
            // this.setState({ decks })
        })
    }

    disableListAndItem = (index, shouldDisable, deck) => {
        // console.log("disableListAndItem", deck)
        this.props.setDeckInDetail(deck)

        this.setState({
            scrollEnabled: !shouldDisable,
            disabledListItemIndex: shouldDisable ? index : -1
        })

        shouldDisable ? this.deckList.scrollToIndex( params = { animated: true, index, viewPosition: 0 }) : null
    }




    render () {
        const { decks, scrollEnabled, disabledListItemIndex } = this.state
        const { reduxDecks, navigation } = this.props

        return (
            <View style={ styles.container }>
                <FlatList
                    data={ reduxDecks.sort((itemA, itemB) => { return itemA.title < itemB.title ? -1 : 1 }) }
                    scrollEnabled={ scrollEnabled }
                    keyboardShouldPersistTaps='always'
                    ref={ (ref) => this.deckList = ref }
                    keyExtractor={ (item, index) => index }
                    contentContainerStyle={ styles.flatList }

                    renderItem={ ({ item, index }) => (
                        <DeckViewCard
                            deck={ item }
                            navigation={ navigation }
                            disabled={ disabledListItemIndex === -1 ? false : true }
                            isItemDisabled={ disabledListItemIndex === -1 ? false : true }
                            disableMe={ (shouldDisable, deck) => this.disableListAndItem(index, shouldDisable, deck) }
                        />
                    ) }
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({

    flatList: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 8
    },

    container: {
        flex: 1,
    },

    cardOutline: {
        shadowRadius: 4,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 1, 0, 0.24)',

        shadowOffset: {
            width: 5,
            height: 7.5
        }
    },

})

const mapStateToProps = ({ reduxDecks }) => ({ reduxDecks })


const mapDispatchToProps = (dispatch) => {
  return {
    setDeckInDetail: (deck) => dispatch(setDeckInDetail(deck)),
    addAllDecks: (decks) => dispatch(addAllDecks(decks))
  }
}


export default connect( mapStateToProps, { setDeckInDetail, addAllDecks } )(DeckView)