import React from 'react'

export const CurrentUserContext = React.createContext([{}, () => {}])

function currentUserReducer(state, action) {
   switch (action.type) {
      case 'JOINED_IN_ROOM': {
         return {
            userName: action.userName,
            room: action.room,
            joinedInRoom: true
         }
      }
      case 'LOGOUT_ROOM': {
         return {
            userName: null,
            room: null,
            joinedInRoom: false
         }
      }
   }
}

export const ProviderCurrentUserContext = ({children}) => {
   const [state, dispatch] = React.useReducer(currentUserReducer, {
      userName: null,
      room: null,
      joinedInRoom: false
   })
   return (
      <CurrentUserContext.Provider value={[state, dispatch]}>
         {children}
      </CurrentUserContext.Provider>
   )
}