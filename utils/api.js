import { AsyncStorage } from 'react-native'

import { DECK_STORAGE_KEY } from './StorageKeys'

export const getAllDecks = (callback) =>  {
  return AsyncStorage.getItem( DECK_STORAGE_KEY )
  .then( response => callback(response) )
}

// export const getSpecificDeck = (deckId, callback) =>  {
export const getSpecificDeck = (callback, deckId) =>  {
  AsyncStorage.getItem( DECK_STORAGE_KEY )
  .then( data => {
    data = JSON.parse(data)
    data = data[deckId]
    callback(data)
  })
}

export const setDeck = ( deck ) => {
  const id = Math.random().toString(36).substr(-8)
  deck['id'] = id

  return AsyncStorage.mergeItem( DECK_STORAGE_KEY, JSON.stringify({
      [id]: deck
  }))
}

export const getAllKeys = () => {
  return AsyncStorage.getAllKeys()
}

export const submitEntry = ({ entry, key }) => {
  return AsyncStorage.mergeItem( CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export const setQuestion = ( deck, question, answer ) => {
  // console.log(123123, deck)
  let newDeckWithQuestions = {
    questions: deck.questions.concat([{
                                      'question': question,
                                      'answer': answer,
                                    }])
  }

  return AsyncStorage.mergeItem( DECK_STORAGE_KEY, JSON.stringify({
      [deck.id]: newDeckWithQuestions
  }))
}