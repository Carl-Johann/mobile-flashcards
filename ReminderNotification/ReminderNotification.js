import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { NOTIFICATION_STORAGE_KEY } from '../utils/StorageKeys'

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then( ({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setMinutes(0)
              tomorrow.setHours(20)
              tomorrow.setDate(tomorrow.getDate() + 1)

              Notifications.scheduleLocalNotificationAsync(
                {
                    title: 'Come and start a fun quiz!',
                    body: "If you have completed all quizzes, create a new one.",
                    ios: { sound: true },
                    android: {
                        sound: true,
                        priority: 'max',
                        sticky: false,
                        vibrate: true,
                    }
                }, {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true))
            }
          })
      }
    })
}


export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}