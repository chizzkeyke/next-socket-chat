import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { socket } from '../utils/socket'
import { nanoid } from 'nanoid'
import chatModule from '../styles/Chat.module.css'
import { useRouter } from 'next/router'
import ScrollToBottom from 'react-scroll-to-bottom'
import { MessageLayout } from '../components/MessageLayout'

const Chat = () => {
   const [state, dispatch] = React.useContext(CurrentUserContext)
   const [currentMessage, setCurrentMessage] = React.useState('')
   const [listMessages, setListMessages] = React.useState([])
   const router = useRouter()

   React.useEffect(() => {
      socket.on('MESSAGE:RECEIVE', (data) => {
         setListMessages(list => [...list, data])
      })
   }, [])

   const sendMessage = () => {
      if (currentMessage !== '') {
         const messageData = {
            room: state.room,
            author: state.userName,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
         }

         socket.emit('MESSAGE:SEND', messageData)
         setListMessages(list => [...list, messageData])
         setCurrentMessage('')
      }
   }

   const returnOnTitlePage = () => {
      router.push('/')
   }

   const exitChat = () => {
      socket.emit('ROOM:EXIT', { userName: state.userName, room: state.room })
      dispatch({
         type: 'LOGOUT_ROOM'
      })
      router.push('/')
   }


   return (
      <div className={chatModule.containerChatPage}>

         {
            state?.joinedInRoom
               ? (
                  <div className={chatModule.chatContainer}>
                     <div className={chatModule.leftBlock}>
                        <div className={chatModule.listUsers}>
                           Users i want see there
                        </div>
                     </div>
                     <div className={chatModule.rightBlock}>
                        <ScrollToBottom className={chatModule.listMessages}>
                           {listMessages.map(message => (
                              <MessageLayout
                                 key={nanoid()}
                                 username={state.userName}
                                 messageContent={message}
                              />
                           ))}
                        </ScrollToBottom>
                        <div className={chatModule.footerMessage}>
                        <textarea
                           placeholder={'Write message'}
                           value={currentMessage}
                           onChange={e => setCurrentMessage(e.target.value)}
                        />
                           <button onClick={sendMessage}>Send Message</button>
                        </div>
                        <button onClick={exitChat}>Exit</button>
                     </div>
                  </div>
               )
               : (
                  <div>
                     <h1>You don't enter on room</h1>
                     <button onClick={returnOnTitlePage}>Back</button>
                  </div>
               )
         }
         <button onClick={exitChat}>Exit</button>
      </div>
   )
}

export default Chat