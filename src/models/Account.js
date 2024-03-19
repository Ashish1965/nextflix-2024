import mongoose from "mongoose";

const NewAccountSchema = new mongoose.Schema(
    {
        uid : String , 
        name : String , 
        pin : String , 
    } , 
    {
        timestamps : true
    }
);
export default mongoose.models.Account || mongoose.model('Account' , NewAccountSchema);