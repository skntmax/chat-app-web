import io from 'socket.io-client'
const socketUrl = 'http://localhost:2222';



let socket = new  io(socketUrl ,{
    autoConnect:false ,
    // withCredentials:true
  })


  export default socket
  