import connectToDB from "@/database";
import Account from "@/models/Account";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req){
    try{
        await connectToDB();

        const {name , pin , uid} = await req.json();
        if(name === '' || pin === ''){
            return NextResponse.json({
                success : false , 
                message : "Please Enter necessary detail"
            });
        }

        const isAccountAlreadyExists = await Account.find({uid : uid , name : name});
        const allAccounts = await Account.find({uid : uid});
        console.log(isAccountAlreadyExists);
        
        if(isAccountAlreadyExists && isAccountAlreadyExists.length > 0){
            return NextResponse.json({
                success : false , 
                message : "Please try with a different name"
            });
        }

        if(allAccounts && allAccounts.length > 4){
            return NextResponse.json({
                success : false , 
                message : "You can only add max 4 accounts" 
            });
        }

        const hashPin = await hash(pin , 12);

        const newlyCreatedAccount = await Account.create({
            name : name , 
            pin : hashPin , 
            uid : uid
        });

        if(newlyCreatedAccount){
            return NextResponse.json({
                success : true , 
                message : "Account created successfully"
            });
        }
        else{
            return NextResponse.json({
                success : false , 
                message : "Something Went Wrong"
            });
        }



    }catch(err){
        console.log(err);
        return NextResponse.json({
            success : false , 
            message : "Something Went Wrong"
        });
    }
}