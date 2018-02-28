const Path = require('path')
const express = require('express')
const {generateMessage ,generateGeolocationMessage} = require('./utils/message')

var publicPath = Path.join(__dirname,'../public')

const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(publicPath))


io.on('connection', (socket)=>{ // listening to connect a client to server
    console.log('new client connected ');
    socket.emit('newMessage',generateMessage('Admin','wellcome to this chatRoom')) 
    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Added to This Room'))

    // socket.emit('AdminMessage',generateMessage('Admin','wellcome to this chatRoom'))
    // socket.broadcast.emit('AdminMessage',generateMessage('Admin','New User Added to This Room'))

    socket.on('createMesage', (data,callback)=> {
            console.log('createMesage:',data);
            io.emit('newMessage',data)
            callback(true);
    })

    // socket.on('disconnect',()=>{
    //     console.log('A Client disconnected ');
    // });

    // socket.on(
    //     'sendMsgCallback',
    //     (message , callback )=>{
    //        console.log('sendMsgCallback :' , message );
    //        callback('callback Message')
    //     }
    // )
    
    socket.on('createGeolocation',(position , callback)=>{
        io.emit('geoLocationMessage',generateGeolocationMessage(position.from , position.latitude , position.longitude) )
        callback()
    })

    socket.on('join',(params,callback)=>{
       var { isRealString } = require('./utils/validation')
       if(  isRealString(params.name) &&   isRealString(params.room)){
        
       }else{
           callback(true)
       }
    })

 });




 server.listen(3000 , ()=>{
     console.log('server Running On port 3000');
 });






