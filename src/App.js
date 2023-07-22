import React from 'react'
import { useContext, useEffect , useState } from 'react';
import { SocketContext } from './context/socket';
import ChatBox from './component/ChatBox';
import socket from './context/socket'
import { messaging } from './firebase';
import { getToken } from "firebase/messaging";
import axios from 'axios'


function App() {
  let username 
  const [uname, setUname] = useState("")
  const [socketData , setSocketData ] = useState({
    id:""  
   })
   
   const [sendNotofication, setSendNotification] = useState(false)
   const [fb_token, setFbToken] = useState(null)


   useEffect(()=>{
     

    (async function(){
       if(fb_token==null) {
         
      const permission = await Notification.requestPermission();
   console.log("permission", permission);
        if(permission === "granted") {
          // Generate Token
        const token = await getToken(messaging, {
          vapidKey:
             process.env.REACT_APP_BASE_CLOUD_API_KEY,
         });

        console.log("gen once " ,token );
      setFbToken(token)   
    }
    else if (permission === "denied") {
      alert("You denied for the notification");
    }
       }
       

    })()

   

            
   
         do{
             username = window.prompt("please enter username ") 
             setUname(username)
         }while(username=="")
 
       socket.connect() 
       
      socket.on('connect'  ,()=>{
         console.log( `socket connected to ${socket.id}`)
         setSocketData({ ...socketData , id:socket.id })

          socket.on('server-message' ,(data)=>{
                console.log("data to server " , data );
            }) 

         })

      
    return () => socket.disconnect();

  } ,[])




  async function requestPermission() {

     
       let notification=  {
             title: 'Title of your push notification', 
             body: 'Body of your push notification' 
         }
          
         axios.post(`${process.env.REACT_APP_BASE_URL}/push-notification/${fb_token}/${uname}` , notification ).then(res=>{
                    console.log("res", res);
         }).catch(err=>{
             console.log(err);
         })

      
      // Send this token  to server ( db)
  }


  return (
      <React.Fragment>
        <p className='text-center'> <button className='btn  btn-sm btn-primary ' style={{
          margin:"0 auto"
        }} onClick={()=>{
          setSendNotification(!sendNotofication)
          requestPermission();
        }}> {!sendNotofication?"notify":"disallow"}  </button></p> 
      <ChatBox socket_props={socketData} uname ={uname}  />
      </React.Fragment>
  );
}

export default App;
