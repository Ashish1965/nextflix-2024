import mongoose from "mongoose";

const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.Mongo_URI);
        console.log("Mongo is connected");
    }catch(err){
        console.log(err);
    }

};
export default connectToDB;