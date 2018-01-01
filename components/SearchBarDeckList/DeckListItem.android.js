import React from 'react'
// import { NativeTouchEvent } from 'react-native'
import { ListItem } from 'react-native-elements'

const DeckListItem = ({ deck, onRowPress }) => {
    return (
        // <NativeTouchEvent onPress={ () => onRowPress() } style={{ bottomMargin: 1 }}>
            <ListItem
                key={ deck }
                title={ deck.title }
                subtitle={ deck.questions.length === 1 ? "1 question" : `${deck.questions.length} questions` }
                subtitleStyle={{ fontWeight: -0.6 }}
            />
        // </NativeTouchEvent>
    )
}


export default DeckListItem