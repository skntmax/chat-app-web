import React, { useEffect, useState } from 'react'
import './../assets/css/style.css'
import {ChatBarClient  , ChatBarHead} from './ChatBar'
import socket from '../context/socket'
 
function ChatDialogue(props) {
   
   const {chatData , uname}  = props 

  return (
    <div  className='chat_dialogue'>
    
     <div  className='chat_div' >

      { chatData.map((ele ,index)=>{
         if(ele.user_name==uname)
           return  <ChatBarHead user_chat_data={ele}  />
         else 
         return  <ChatBarClient user_chat_data={ele}  />
     })}
       

      </div>
    
     </div>
  )
}

export default ChatDialogue
