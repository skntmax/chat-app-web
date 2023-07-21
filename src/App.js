import { useContext, useEffect , useState } from 'react';
import { SocketContext } from './context/socket';
import ChatBox from './component/ChatBox';
import socket from './context/socket'

function App() {
  let username 
  
  const [uname, setUname] = useState("")
  const [socketData , setSocketData ] = useState({
    id:""  
   })
   
   useEffect(()=>{
    
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
   return (<ChatBox socket_props={socketData} uname ={uname}  />
  );
}

export default App;
