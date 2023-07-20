import React, { useEffect, useState } from 'react'
import './../assets/css/style.css'
import socket  from './../context/socket'
import { IoMdSend } from 'react-icons/io';
import ChatDialogue from './ChatDialogue';

function ChatBox(props ) {

    //   console.log(io);
      const [data , setData ]  = useState({ user_message :" ",})
      const [chatData, setChatData] = useState([])


         useEffect(()=>{
            socket.on('group-message-to-all' ,(data)=>{
            setChatData([...chatData , data ] )
           })

         } ,[chatData.length])







    const onChangeHandler =(e)=>{
    debugger
      const { value   ,  name }  = e.target
            
               setData({ ...data ,user_message:value  })
    }

    const handleKeyDown = (event) => {
       
    if (event.key === 'Enter') {
      socket.emit('group-message' , {...data , user_name:props.uname } )
      setData({ user_message:""  })       
    }
  };



    const send = ()=>{          
             
             socket.emit('group-message' , {...data , user_name:props.uname } )
             setData({...data,  user_message:""  })       
    }

     const {uname  ,socket_props } = props 
 
      if(uname) {
      return (
         <React.Fragment> 
          <div>
          <p style={{
            textAlign:"center"
          }}>  Connection  Id : {socket_props.id } : {uname} </p> 
         <ChatDialogue uname={uname} chatData={chatData} />

         <div className='chat_box'>

         <div  >
         <textarea
          name="user_message"
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown} 
          value={data.user_message}
         className="form-control user_message" rows="1" cols="55" placeholder="Leave a comment here" id="floatingTextarea2"  >
         </textarea>
          
       
         </div> 
          
           <div >
           <IoMdSend className='send_button'  size={35} onClick={send} />  
            </div>
          
         </div>

         </div>
         
         </React.Fragment>
  )}
  
  
  if(uname=="") {
    return ( <React.Fragment>
        
        </React.Fragment>)
    }
 
}

export default ChatBox
