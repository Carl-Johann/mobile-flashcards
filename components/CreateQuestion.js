import React, { Component } from 'react'
import { setDeckInDetail, addQuestionToDeckInDetail, addQuestionDeck } from '../actions/index'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, TouchableNativeFeedback, Animated, Easing, Picker } from 'react-native'
import { setQuestion, getAllDecks } from '../utils/api'
import { Ionicons, Entypo } from '@expo/vector-icons'

import SearchBar from 'react-native-searchbar'
import ShakeableInputFields from './ShakeableInputField/ShakeableInputFields';
import SearchBarDeckList from './SearchBarDeckList/SearchBarDeckList';
import DeckSearchAndInfo from './DeckSearchAndInfo/DeckSearchAndInfo';
import DetailDeckView from '../components/DetailDeckView'

import { List, ListItem } from 'react-native-elements'



class CreateQuestion extends Component {

    static navigationOptions = ({ navigation }) => ({
        headerTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#4fbf40' },
    })

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
        // decks: [],

        searchedDecks: "",
        isSearchBarOpen: true,

        fadeOpacity: new Animated.Value(0),
        initalDeckSelectDone: false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if ( !this.props.navigation.state.params ) {
            nextState.searchedDecks === ""
            ? nextState.isSearchBarOpen ? this.searchBar.show() : this.searchBar.hide()
            : null
        }

        return true
    }







    handleResults = (results) => {
        this.setState({ searchedDecks: results })
    }


    handleAddQuestion = (inputFields) => {
        setQuestion(
            this.props.deckInDetail,
            inputFields.question.text,
            inputFields.answer.text
        )


        setTimeout(() => {
            this.setState({
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
                searchedDecks: "",
                initalDeckSelectDone: false,
            })
                this.state.fadeOpacity.setValue(0)
        }, 500)

        this.props.addQuestionToDeckInDetail({
            "answer": inputFields.answer.text,
            "question": inputFields.question.text
        }, this.props.deckInDetail )

        this.props.addQuestionDeck( this.props.deckInDetail.id,
            {
                "answer": inputFields.answer.text,
                "question": inputFields.question.text
            }
        )
    }



    handleRowPress = (deck) => {
        this.setState({
            searchedDecks: "",
            isSearchBarOpen: false,
        })

        this.props.setDeckInDetail(deck)

        if (!this.state.initalDeckSelectDone) this.setState({ initalDeckSelectDone: true })
        Animated.timing(this.state.fadeOpacity, { duration: 300, toValue: 1 }).start()

    }

    changeSelectedDeck = () => {
        Animated.timing(this.state.fadeOpacity, { duration: 150, toValue: 0 }).start( () => {
            this.setState({ isSearchBarOpen: true })

            // Remove the deck in detal
            this.props.setDeckInDetail({ questions: [] })
        })

    }




    render() {

        const { params } = this.props.navigation.state
        const { inputFields, searchedDecks, isSearchBarOpen, fadeOpacity, initalDeckSelectDone } = this.state


        return (
            <TouchableOpacity
                onPress={ () => {
                    if ( !this.props.navigation.state.params ) {
                        // The view was navigated to from the 'TabNavigator'
                        isSearchBarOpen ? this.searchBar.textInput.blur(): null
                    }
                }}
                style={{ flex: 1 }}
                activeOpacity={ 1 }
            >
                <View>
                    { this.props.navigation.state.params
                    ?
                        <View style={ styles.container } >
                            <Animated.View>
                                <ShakeableInputFields
                                    inputFields={ inputFields }
                                    goBack={ () => this.props.navigation.goBack() }
                                    handleAdd={ inputFields => this.handleAddQuestion(inputFields) }
                                />
                            </Animated.View>
                        </View>
                    :
                        <View >
                             <View style={{ height: 32, zIndex: 10 }}>

                                <Animated.View style={{ alignItems: 'center', marginTop: 15 }}>
                                    <Text style={{ margin: 0, fontSize: 25, selfAlign: 'center' }}> Create Question </Text>
                                </Animated.View>

                                <SearchBar
                                    hideBack
                                    showOnLoad
                                    clearOnHide

                                    data={ this.props.reduxDecks }
                                    iOSPadding={ false }
                                    animationDuration={ 400 }
                                    selectionColor={ '#4fbf40' }
                                    placeholder={ "Select Deck ..." }
                                    ref={ (ref) => this.searchBar = ref }
                                    handleChangeText={ results => this.handleResults(results) }
                                />
                            </View>

                            <SearchBarDeckList
                                decks={ this.props.reduxDecks }
                                searchedDecks={ searchedDecks }
                                isSearchBarOpen={ isSearchBarOpen }
                                handleRowPress={ deck => this.handleRowPress(deck) }
                            />


                            <View style={ styles.deckInfoBody }>
                                <DeckSearchAndInfo
                                    inputFields={ inputFields }
                                    titleTextOpacity={ fadeOpacity }
                                    initalDeckSelectDone={ initalDeckSelectDone }
                                    goBack={ () => this.props.navigation.goBack() }
                                    changeSelectedDeck={ () => this.changeSelectedDeck() }
                                    handleAdd={ inputFields => this.handleAddQuestion(inputFields) }
                                />

                                <Animated.View style={{ opacity: fadeOpacity, width: '100%' }}>
                                    <View style={{ margin: 15 }}>
                                        <ShakeableInputFields
                                            inputFields={ inputFields }
                                            shouldEmpty={ isSearchBarOpen }
                                            goBack={ () => this.props.navigation.goBack() }
                                            handleAdd={ inputFields => this.handleAddQuestion(inputFields) }
                                        />
                                    </View>
                                </Animated.View>
                            </View>
                        </View>
                    }

                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginTop: 25,
    },

    deckInfoBody: {
        marginTop: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    }
})



const mapStateToProps = ({ deckInDetail, reduxDecks }) => {
  return {
      deckInDetail,
      reduxDecks
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
    setDeckInDetail: (deck) => dispatch(setDeckInDetail(deck)),
    addQuestionDeck: (deckId, question) => dispatch(addQuestionDeck(deckId, question)),
    addQuestionToDeckInDetail: (question, deck) => dispatch(addQuestionToDeckInDetail(question, deck))
  }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateQuestion)