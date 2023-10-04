import UserModel from "../../../../models/user";
import connectDB from "../../../../utils/connectDB";
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import  GoogleProvider  from "next-auth/providers/google";


//EMAIL
import {sendEmail} from '../../../../utils/sendgrid'

function generatePassword(length = 8) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

export const authOptions={
  session:{
    strategy:'jwt',
  },
  providers:[
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      type:'credentials',
      credentials: {},
      async authorize(credentials,req) {
        const {email,name, password,action} = credentials
        await connectDB()
        var user = await UserModel.findOne({email})  
        if(action==='signin'){
          if(user){
            throw Error('Email Already Exist')
          }
          user = await UserModel.create({email,name, password})

          //CLIENT WELCOME
          var msg = {
            to:email,
            from:process.env.email,
            template_id: 'd-33e94435061d46619928402f0498b865',
            dynamic_template_data: {
              name: name,
            },
          };
          try {
            await sendEmail(msg);
          } catch (error) {
            console.error(error);
          }


          //ADMIN WELCOME
          msg = {
            to:process.env.email,
            from:email,
            template_id: 'd-06c6a9444dae453a97d6c33436d96216',
            dynamic_template_data: {
              email: email,
            },
          };
          try {
            await sendEmail(msg);
          } catch (error) {
            console.error(error);
          }

        }
        if(action==='login'){
          if(!user) throw Error('Wrong Username and Password')
          const passwordMatch = await user.comparePassword(password)
          if(!passwordMatch) throw Error('Wrong Username and Password')
        }
        return {
          id:user._id,
          name:user.name,
          email:user.email,
          role:user.role,
        }
      }
    })
  ],
  callbacks:{
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        if(!profile.email_verified){
          redirect('/signup')
          throw new Error('Google authentication failed');
          return
        }
        connectDB()
        const name = profile.name
        const email = profile.email
        var user = await UserModel.findOne({email:profile.email})
        var pwd = generatePassword()
        if(!user){
          user = await UserModel.create({email,name,pwd})

          //CLENT WELCOME
          var msg = {
            to:email,
            from:process.env.email,
            template_id: 'd-33e94435061d46619928402f0498b865',
            dynamic_template_data: {
              name: name,
            },
          };
          try {
            await sendEmail(msg);
          } catch (error) {
            console.error(error);
          }

          //ADMIN WELCOME
          msg = {
            to:process.env.email,
            from:email,
            template_id: 'd-06c6a9444dae453a97d6c33436d96216',
            dynamic_template_data: {
              email: email,
            },
          };
          try {
            await sendEmail(msg);
          } catch (error) {
            console.error(error);
          }
        } else{
          profile.role = await user.role
        }
        return profile.email_verified && profile.email.endsWith("@gmail.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    jwt(params){
      if(params.user?.role){
        params.token.role = params.user.role;
        params.token.id = params.user._id
      }
      if(params?.profile?.role){
        params.token.role = params?.profile?.role;
      }
      return params.token
    },
    session({session,token}){
        if (session.user){
          session.user.id = token.sub
          session.user.role = token.role
        }
        return session
    }
  },
  secret:process.env.NEXTAUTH_SECRET

}

const authHandler = NextAuth(authOptions)

export {authHandler as GET,authHandler as POST} 