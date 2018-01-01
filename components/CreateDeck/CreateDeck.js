import React, { Component } from 'react'
import { View } from 'react-native'
import ShakeableInputFields from './../ShakeableInputField/ShakeableInputFields'

export default class CreateDeck extends Component {
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

        let deck = {
            title: inputFields.title.text,
            questions: []
        }
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