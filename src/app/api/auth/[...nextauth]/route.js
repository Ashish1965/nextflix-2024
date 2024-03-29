import NextAuth from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'
const authOptions = {
    providers : [
        GitHubProvider({
            clientId : process.env.GITHUB_ID , 
            clientSecret : process.env.GITHUB_SECRET
        }) ,
        GoogleProvider({
            clientId : process.env.GOOGLE_ID , 
            clientSecret : process.env.GOOGLE_SECRET
        })
    ] , 
    callbacks : {
        async session({session , token , user}){
           session.user.username = session?.user?.name
           .split(" ")
           .join("")
           .toLocaleLowerCase(); 

           session.user.uid = token.sub
           return session
        } ,
    } , 
    secret : "default_secret_key" ,
};

const handler = NextAuth(authOptions)
export { handler as GET , handler as POST}