import {
    ADD_DECK,
    ADD_ALL_DECKS,
    SET_DECK_IN_DETAIL,
    ADD_QUESTION_TO_DECK,
    ADD_QUESTION_TO_DECK_IN_DETAIL,
} from './ActionTypes'


export const setDeckInDetail = ( deckInDetail ) => {
    // Should look like this:
    // NOTICE that sometimes, it's needed to parse deckInDetail prop as: deckInDetail[1]
    //
    // {
    //     id: 'string',
    //     questions: [],
    //     title: 'string',
    // }
    //

    return {
        type: SET_DECK_IN_DETAIL,
        deckInDetail
    }
}

export const addQuestionToDeckInDetail = ( question, questionToAddToDeckInDetail ) => {
    // Should look like this:
    //
    // {
    //     answer: 'string',
    //     question: 'string',
    // }
    //

    return {
        type: ADD_QUESTION_TO_DECK_IN_DETAIL,
        questionToAddToDeckInDetail,
        question,
    }
}

export const addAllDecks = ( decks ) => {
    // Adding one deck is fine too, object still needs to be in an array.
    // Should look like this:
    //
    // [
    //     {
    //         id: 'string',
    //         questions: [],
    //         title: 'string',
    //     },
    //     {
    //         id: 'string',
    //         questions: [],
    //         title: 'string',
    //     },
    //
    // ]
    //

    return {
        type: ADD_ALL_DECKS,
        decks
    }
}

export const addDeck = ( deck ) => {
    // Should look like this:
    //
    // {
    //     id: 'string
    //     questions: []
    //     title: 'string'
    // }
    //

    return {
        type: ADD_DECK,
        deck
    }
}

export const addQuestionDeck = ( deckId, question ) => {
    // 'question' should look like this:
    //
    // {
    //     answer: 'string',
    //     question: 'string',
    // }
    //

    return {
        type: ADD_QUESTION_TO_DECK,
        question,
        deckId
    }
}