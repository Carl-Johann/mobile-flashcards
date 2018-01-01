import {
    SET_DECK_IN_DETAIL,
    ADD_QUESTION_TO_DECK_IN_DETAIL,
} from './ActionTypes'


export const setDeckInDetail = ( deckInDetail ) => {
    // Should look like this:
    // NOTICE that sometimes, it's needed to parse deckInDetail prop as: deckInDetail[1]
    //
    // {
    //     id: "string",
    //     questions: [],
    //     title: 'string',
    // }

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

    return {
        type: ADD_QUESTION_TO_DECK_IN_DETAIL,
        questionToAddToDeckInDetail,
        question,
    }
}