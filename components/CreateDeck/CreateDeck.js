import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { setDeck } from '../../utils/api'
import { addDeck } from '../../actions/index'
import ShakeableInputFields from './../ShakeableInputField/ShakeableInputFields'

class CreateDeck extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#4fbf40' },
    })

    state = {
        inputFields: {
            title: {
                text: '',
                status: false
            }
        },
    }

    handleAddDeck = (inputFields) => {
        let deck = {
            title: inputFields.title.text,
            questions: []
        }

        setDeck( (createdDeck) => { this.props.addDeck(createdDeck) }, deck )

        setTimeout(() => {
            this.setState({
                inputFields: {
                    title: {
                        text: '',
                        status: false
                    }
                }
            })
        }, 500)

    }


    render() {
        const { inputFields } = this.state

        return (
            <View style={{ margin: 15 }}>
                <ShakeableInputFields
                    inputFields={ inputFields }
                    goBack={ () => this.props.navigation.goBack() }
                    handleAdd={ inputFields => this.handleAddDeck(inputFields) }
                />
            </View>
        )
    }
}

const mapStateToProps = ({ deckInDetail }) => {
  return { deckInDetail }
}


const mapDispatchToProps = (dispatch) => {
  return { addDeck: (deck) => dispatch(addDeck(deck)) }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateDeck)