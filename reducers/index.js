import {
  SET_DECK_IN_DETAIL,
  ADD_QUESTION_TO_DECK_IN_DETAIL
 } from '../actions/ActionTypes'

let initialDecksState = {
    deckInDetail: {
      questions: []
    },
}

function reduxDecks (state = initialDecksState, action) {
  switch (action.type) {

    case SET_DECK_IN_DETAIL: {
      // console.log("action", action)
      const { deckInDetail } = action

      let lort = {
        ...state,
          deckInDetail: deckInDetail
      }
      // console.log("initialDecksState", deckInDetail)
      // console.log("lort", lort)
      // console.log("state", state)

      return {
        ...state,
          deckInDetail: deckInDetail
      }
    }

    case ADD_QUESTION_TO_DECK_IN_DETAIL: {
      const { question, questionToAddToDeckInDetail } = action

      let questionsWithNew = questionToAddToDeckInDetail.questions.concat([{
                                          'question': question.question,
                                          'answer': question.answer,
                                        }])
      // console.log("questionsWithNew", questionsWithNew)

      let lrot = {
        ...state,
          deckInDetail: {
            ...state.deckInDetail,
              questions: questionsWithNew
          }
      }

      // console.log("new state", lrot)

      return {
        ...state,
          deckInDetail: {
            ...state.deckInDetail,
              questions: questionsWithNew
          }
      }
    }


    default:
      return state
  }
}

export default reduxDecks