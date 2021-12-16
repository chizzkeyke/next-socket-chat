import moduleMessage from '../styles/Message.module.css'

export const MessageLayout = ({message, currentUser}) => {
   return (
      <div className={currentUser ? moduleMessage.messageMy : moduleMessage.messageFriend}>
         {message}
      </div>
   )
}

