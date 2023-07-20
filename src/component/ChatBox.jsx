import React, { useState } from 'react'
import './../assets/css/style.css'
import { socket } from '../App';
import { IoMdSend } from 'react-icons/io';
import ChatDialogue from './ChatDialogue';

function ChatBox(props ) {

    //   console.log(io);
      const [data , setData ]  = useState({
         user_message :" "
      })
    const onChangeHandler =(e)=>{
         
           const { value   ,  name }  = e.target  
           setData({ ...data ,user_message:value  })
       
    }


    const send = ()=>{ 
         
        // socket.on('connect' ,()=>{
        //      console.log("sent ");
        //      socket.emit('message' , "sample data " )
        //  })
          
    }

     const {uname  ,socket_props } = props 
 
      if(uname) {
      return (
         <React.Fragment> 
          <div>
          Connection  Id : {socket_props.id} 
         <ChatDialogue />

         <div className='chat_box'>
      { /*   <div>
         <h1 className='user_name badge badge-secondary '>  {uname}   </h1>
      </div>  */}
        
         <div  >
         <textarea
          name="user_message"
          onChange={onChangeHandler} 
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
