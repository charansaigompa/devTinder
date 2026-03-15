const socket=require("socket.io")
const initializesocket=(server)=>{
    const io=socket(server,{
        cors:{
             origin:"http://localhost:5173"
        }
    })

    io.on("connection",(socket)=>{
        socket.on("joinChat",({firstName,userId,targetUserId})=>{
            const roomId=[userId,targetUserId].sort().join("_")
            console.log(roomId)
            socket.join(roomId)
        })
        socket.on("sendMessage",({firstName,lastName,userId,targetUserId,text})=>{
            const roomId=[userId,targetUserId].sort().join("_")
            io.to(roomId).emit("messageReceived",{firstName,lastName,text})

        })
        socket.on("disconnect",()=>{})

    })
}

module.exports=initializesocket