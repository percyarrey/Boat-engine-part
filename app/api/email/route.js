// Your component or API route

import { NextResponse } from 'next/server';
import {sendEmail} from '../../../utils/sendgrid';


// Example usage in an API route sendEmailAPI
export async function POST() {
  
  const email = "tanyitikuarrey@gmail.com"
    try {
      await sendEmail(email, 'Test Email', 'This is a test email from Next.js!');
      return NextResponse.json({message:"Email sent Succesffully"},{status:201})
    } catch (error) {
      console.error(error);
      return NextResponse.json({message:"Internal server Error"},{status:500})
    }
  return NextResponse.json({message:"Failed to Send Email"},{status:201})

}