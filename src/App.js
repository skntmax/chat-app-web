import { useContext, useEffect , useState } from 'react';
import { SocketContext } from './context/socket';
import ChatBox from './component/ChatBox';
import socketIOClient from 'socket.io-client'
const socketUrl = 'http://localhost:2222';



function App() {
  let username 
  
   const [uname, setUname] = useState("skntmax")
   const [socketData, setSocketData] = useState({
    id:""  
   })

  useEffect(()=>{
     
    let socket = socketIOClient(socketUrl ,{
      // autoConnect: false,
    });
    
debugger
    socket.on('connect'  ,()=>{
         console.log(`socket connected to ${socket.id}`)
         setSocketData({ ...socketData , id:socket.id})
         
         socket.emit('idk' ,{
          name:"skntmax"
        }) 

         })

      
 
     

    // do{
    //    username = window.prompt("please enter username ") 
    //     setUname(username)
    // }while(username=="")
      
    return () => socket.disconnect();

     
     
  } ,[])

   return (<ChatBox socket_props={socketData} uname ={uname}  />
  );
}

export default App;
