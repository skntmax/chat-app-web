import React, { useEffect, useMemo, useState } from 'react'
import './../assets/css/style.css'
import socket  from './../context/socket'
import { IoMdSend } from 'react-icons/io';
import { MdFamilyRestroom } from 'react-icons/md';


import ChatDialogue from './ChatDialogue';

function ChatBox(props ) {
  
      const [data , setData ]  = useState({ user_message :"", room:"", joined_room:""})
      const [chatData, setChatData] = useState([])
      const [totaCount, setTotaCount] = useState(undefined)
        
         useEffect(()=>{
           
          
           socket.on('room-message' ,(socket_data)=>{
                     setChatData([...chatData , socket_data ] )
                })
         
                socket.on('group-message-to-all' ,(socket_data)=>{
                        setChatData([...chatData , socket_data ] )             
                     })


           
      //  setInterval(()=>{
      //   socket.emit("get-count", null )  
      //   socket.on('get-count' ,(count)=>{   
      //      setTotaCount(count)
      //  }, 3000 )

      //  })


         } ,[ chatData.length , totaCount  ] )



    const onChangeHandler =(e)=>{
    debugger
      const { value   ,  name }  = e.target

               setData({ ...data ,[name]:value  })
    }

    const handleKeyDown = (event) => {
       
    if (event.key === 'Enter') {
      debugger 
      if(data.joined_room.trim()=="") {
          socket.emit('group-message' , {...data , user_name:props.uname } )
           setData({ ...data ,  user_message:""  })   
        } else{
          socket.emit('room-message' , { ...data , user_name:props.uname  } ,  data.joined_room.trim() )
          
          if(props.socket_props.id!=data.joined_room) {
                          let obj = {...data , user_name:props.uname }
                          setChatData([...chatData , obj ])   
             }   

          setData({ ...data , user_message:"", })   
        }
        
    }
  };



    const send = ()=>{       
      debugger   
             if(data.joined_room!="" ) {
               socket.emit('room-message' , {...data , user_name:props.uname  } , data.joined_room.trim()   )           
                 if(props.socket_props.id!=data.joined_room) {
                          let obj = {...data , user_name:props.uname }
                          setChatData([...chatData , obj ])   
                 }   
              } else{
              socket.emit('group-message' , {...data , user_name:props.uname }  )
             setData({...data,  user_message:""  })   
             } 
                 
   
             }


    const joinGroup = ()=>{  
            setData({...data,  user_message:"" , joined_room:data.room.trim()   })       
            socket.emit('room-message' , {...data , user_name:props.uname  } , data.joined_room.trim()   )             
      }


     const {uname  ,socket_props } = props 
 
      if(uname) {
      return (
         <React.Fragment> 
          <div>
           <p style={{
            textAlign:"center"
           }} >  <h2 className='text-capitalize ' >   {uname} 
           <button type="button" className="btn btn-sm btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
           Notify
          </button> 

           </h2>

     
               
           <h5>  <span className="badge text-bg-success">  CONNECTION ID : {socket_props?socket_props.id:"loading" } </span>   {data.joined_room!="" &&  <span  className='badge text-bg-danger'> GROUP JOINED : {data.joined_room} </span>   }  </h5> </p> 
         <ChatDialogue uname={uname} chatData={chatData} />

         <div className='chat_box'>

          <div style={{
          display: "flex",
          flexDirection:"column" ,
          gap: "10px"
         }} >
          
          
         <div style={{
          display: "flex" 
         }}>
         <textarea
          name="user_message"
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown} 
          value={data.user_message}
         className="form-control user_message" rows="1" cols="100" placeholder="Your Message " id="floatingTextarea2"  >
           </textarea>
           <div>
              <IoMdSend className='send_button'  size={35} onClick={send} />  
            </div>

            <br />

            </div> 

              

            <div style={{
          display: "flex",
          flexDirection:"row" ,
         }}   >

          <div>
          <textarea
             name="room"
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown} 
          value={data.room}
         className="form-control user_message" rows="1" cols="100" placeholder="Add Room  " id="floatingTextarea2"  >
           </textarea>
          </div>
          
           <div>
           <MdFamilyRestroom className='send_button'  size={35} onClick={joinGroup} />  
           </div>

             {
                data.joined_room!="" &&   <div>
          <button className='btn btn-sm  btn-primary'  onClick={()=> setData({...data , joined_room:"" , room:""}) }> exit room </button>  
           </div>
             }
          


             </div>


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
