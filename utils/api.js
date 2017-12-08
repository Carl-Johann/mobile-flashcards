import { AsyncStorage } from 'react-native'

import { DECK_STORAGE_KEY } from './StorageKeys'
import { QUESTION_STORAGE_KEY } from './StorageKeys'

export const getAllDecks = (callback) =>  {
  return AsyncStorage.getItem( DECK_STORAGE_KEY )
  .then( response => callback(response) )
}

export const setDeck = ( deckTitle, deck ) => {
  deck["id"] = Math.random().toString(36).substr(-8)

  return AsyncStorage.mergeItem( DECK_STORAGE_KEY, JSON.stringify({
      [deckTitle]: deck
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
  let newDeck = {
    title: deck.title,
    questions: deck.questions.concat([{
                                      'question': question,
                                      'answer': answer,
                                    }])
  }
  console.log(newDeck)

  return AsyncStorage.mergeItem( DECK_STORAGE_KEY, JSON.stringify({
      [deck.title]: newDeck
  }))
}