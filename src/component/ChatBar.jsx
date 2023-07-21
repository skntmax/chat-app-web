import React from 'react'
import './../assets/css/chatbar.css'

function ChatBarHead({user_chat_data}) {
  return ( <p className="chat_bar_head">
   <span className="badge badge-primary "> {user_chat_data.user_name} </span>
              :  {  user_chat_data.user_message}
            </p>
     
   )
}


function ChatBarClient({user_chat_data}) {
  return ( <div className="chat_bar_client">
  <span class="badge badge-success">{user_chat_data.user_name}</span>
             :  {  user_chat_data.user_message}
            </div>
     
  )
}


export  {ChatBarHead , ChatBarClient }
