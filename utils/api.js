import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY } from './StorageKeys'

export const getAll = () =>  {
  return AsyncStorage.getItem( DECK_STORAGE_KEY )
    .then( response =>  response.json() )
}

export const setDeck = ({ deckTitle, questions }) => {
    return AsyncStorage.setItem( DECK_STORAGE_KEY, JSON.stringify(
        {
            [deckTitle]: questions
        }
    ))
}

export const submitEntry = ({ entry, key }) => {
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}