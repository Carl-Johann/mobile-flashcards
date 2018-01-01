import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'


const DeckListItem = ({ deck, onRowPress }) => {
    return (
        <TouchableOpacity onPress={ () => onRowPress() } style={{ bottomMargin: 1 }}>
            <ListItem
                key={deck}
                title={deck.title}
                subtitle={ deck.questions.length === 1 ? "1 question" : `${deck.questions.length} questions`}
                subtitleStyle={{ fontWeight: -0.6 }}
            />
        </TouchableOpacity>
    )
}


export default DeckListItem