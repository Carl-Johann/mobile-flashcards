import React, { Component } from 'react'
import { View, Animated } from 'react-native'
import AddButton from './AddButton'

export default class CollapsibleAddButton extends Component {

    state = {
        addButtonWidth: new Animated.Value(100),
        addButtonHeight: new Animated.Value(35),
        addButtonOpacity: new Animated.Value(1),
    }

    handleAdd = () => {
        if (this.props.checkFields()) {
            // All inputFields have content

            Animated.parallel([
                Animated.timing(this.state.addButtonWidth,   { duration: 350, toValue: 0 }),
                Animated.timing(this.state.addButtonOpacity, { duration: 350, toValue: 0 }),
                Animated.timing(this.state.addButtonHeight,  { duration: 1,   toValue: 0, delay: 350 }),
            ]).start( () => {
                this.props.goBack()
                setTimeout(() => {
                    this.state.addButtonWidth.setValue(100)
                    this.state.addButtonHeight.setValue(35)
                    this.state.addButtonOpacity.setValue(1)
                }, 600)
            })
        }
    }


    render() {
        const { addButtonOpacity } = this.state

        const buttonWidth = this.state.addButtonWidth.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        })

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Animated.View style={{ width: buttonWidth, height: this.state.addButtonHeight }}>
                    <AddButton
                        buttonOpacity={ addButtonOpacity }
                        handleAdd={ () => this.handleAdd() }
                    />
                </Animated.View>
            </View>
        )
    }
}

