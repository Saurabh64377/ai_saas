import  OpenAI  from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";

const AI = new OpenAI({
    apiKey:process.env.API_KEY,
    baseURL:'https://generativelanguage.googleapis.com.v1beta/openai'
})


export const generateArticle = async(req,res)=>{
    try {

    const {userId} = req.auth()
    const {prompt , length} = req.body;


     const plan = req.plan
    const free_usage = req.free_usage

    if(plan!=='premium' && free_usage>=10){
        return res.status(401).json({success:false ,message:'Limit reached .Upgrade to continue !'})
    }


    const response  = await AI.chat.completions.create({
        model:"gemini-2.0-flash",
        message:[
           
            {
                role:"user",
                content:prompt
            },

        ],
        temperature:0.7,
        max_tokens:length
    })
     
    const content = response.choices[0].message.content

    await sql`INSERT INTO creations (user_id ,prompt , content , type) VALUES (${userId} , ${prompt} , ${content} , 'article)`
   
    if(plam !=='premium')
    {
        await clerkClient.users.updateUserMetadata(userId ,{
            privateMetadata:{
                free_usage:free_usage+1
            }
        })


    }  
    
    return res.status(200).json({success:true , content})
    } catch (error) {
         console.log(error)
         return res.status(500).json({success:false , message:error.message})
    }
}