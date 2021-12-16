import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { useRouter } from 'next/router'
import moduleEnterInChat from '../styles/EnterInChat.module.css'

const EnterInChat = () => {
   const [userName, setUserName] = React.useState('')
   const [room, setRoom] = React.useState('')
   const [state, dispatch] = React.useContext(CurrentUserContext)
   const router = useRouter()

   const joinInRoom = async () => {
      if (userName !== '' && room !== '') {
         await dispatch({
            type: 'JOINED_IN_ROOM',
            userName,
            room
         })
         console.log(state)
         await socket.emit('ROOM:JOIN', room)
      }
   }

   if (state.joinedInRoom) {
      router.push('/chat')
   }

   return (
      <div className={moduleEnterInChat.enterInChatContainer}>
         <div className={moduleEnterInChat.formEnterInChat}>
            <h3>Join a chat</h3>
            <input
               value={userName}
               type="text"
               placeholder="Name"
               onChange={(e) => setUserName(e.target.value)}/>
            <input
               value={room}
               type="text"
               placeholder="Room ID"
               onChange={(e) => setRoom(e.target.value)}/>
            <button onClick={joinInRoom}>Join in Room</button>
         </div>
      </div>

   )
}

import { socket } from '../utils/socket'

export default EnterInChat

