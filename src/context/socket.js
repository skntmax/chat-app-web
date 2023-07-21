import io from 'socket.io-client'
const socketUrl = process.env.REACT_APP_BASE_URL;


let socket = new  io(socketUrl ,{
    autoConnect:false ,
    // withCredentials:true
  })

  export default socket
  