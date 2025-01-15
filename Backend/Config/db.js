import mongoose  from "mongoose";

export const db = () =>{
    try {
        mongoose.connect(process.env.MONGO_DB)
        console.log("database is connect")
    } catch (error) {
        console.log("database not connect , have some error")   
    }

}
