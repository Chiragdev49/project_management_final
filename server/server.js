import { connectDB } from "./config/db.js";
import app from "./app.js";

//database connections-----------------
connectDB();

//Start Server-----------------
const PORT=process.env.PORT;

const server=app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

//error handling
process.on("unhandledRejection",(err)=>{        //try mein jab catch nhi rhta to error aata hai aur iska new message to aana rhi deta hai aur jo puraanein message hai unko complete karta hai pehla
    console.log(`unhandled rejection: ${err.message}`);
    server.close(()=>process.exit(1));
})

process.on("uncaughtException",(err)=>{         //try catch use hi nhi kartin hai tab ye aata hai
    console.log(`uncaught Exception: ${err.message}`);
    process.exit(1);
})

export default server;