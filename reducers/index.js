import {
  ADD_DECK,
  ADD_ALL_DECKS,
  SET_DECK_IN_DETAIL,
  ADD_QUESTION_TO_DECK,
  ADD_QUESTION_TO_DECK_IN_DETAIL,
 } from '../actions/ActionTypes'

let initialDecksState = {
    deckInDetail: {
      questions: []
    },

    reduxDecks: []
}

function reduxDecks (state = initialDecksState, action) {
  switch (action.type) {



    case SET_DECK_IN_DETAIL: {
      const { deckInDetail } = action

      return {
        ...state,
          deckInDetail
      }
    }



    case ADD_QUESTION_TO_DECK_IN_DETAIL: {
      const { question, questionToAddToDeckInDetail } = action

      let questionsWithNew = questionToAddToDeckInDetail.questions
      .concat([{
        'question': question.question,
        'answer': question.answer,
      }])

      return {
        ...state,
          deckInDetail: {
            ...state.deckInDetail,
              questions: questionsWithNew
          }
      }
    }



    case ADD_ALL_DECKS: {
      const { decks } = action

      return {
        ...state,
          reduxDecks: decks
      }
    }



    case ADD_QUESTION_TO_DECK: {
      const { question, deckId } = action
      let newDecksAsArray = []

      state.reduxDecks.map( deck => {
        // We find the right deck, and add the questions to it.
        if (deck.id === deckId) { deck.questions.push(question) }

        // Even if it wasn't the right deck we add it to the new array anyway.
        newDecksAsArray.push( deck )
      })

      return {
        ...state,
          reduxDecks: newDecksAsArray
      }
    }



    case ADD_DECK: {
      const { deck } = action
      let decksWithNewDeck = state.reduxDecks.concat( deck )

      return {
        ...state,
          reduxDecks: decksWithNewDeck
      }
    }



    default:
      return state
  }
}

export default reduxDecks