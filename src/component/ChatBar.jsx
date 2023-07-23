import React from 'react'
import './../assets/css/chatbar.css'

 
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let span_list = [ "primary", "secondary", "success", "danger", "warning", "info", "light", "dark",
]

function ChatBarHead({user_chat_data}) {
  return ( <p className="chat_bar_head">
   <span className="badge text-bg-success my-auto"> {user_chat_data.user_name} </span>
              :  {  user_chat_data.user_message}
            </p>
     
   )
}


function ChatBarClient({user_chat_data}) {
  return ( <div className="chat_bar_client">
  <span className={`badge my-auto text-bg-${span_list[randomIntFromInterval(0,7)]}` } >{user_chat_data.user_name}</span>
             :  {  user_chat_data.user_message}
            </div>
     
  )
}


export  {ChatBarHead , ChatBarClient }
