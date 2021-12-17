
export const MessageLayout = ({ messageContent, username }) => {
   return (
      <div
         className="messageContainer"
         id={username === messageContent.author ? "you" : "other"}
      >
         <div className="messageContent">
            <p>{messageContent.message}</p>
         </div>
         <div className="messageMeta">
            <p>{messageContent.time}</p>
            <p>{messageContent.author}</p>
         </div>
      </div>
   )
}

