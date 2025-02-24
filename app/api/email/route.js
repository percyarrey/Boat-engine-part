import { NextResponse } from 'next/server';
import {sendEmail} from '../../../utils/sendgrid'
export async function POST(request) {
  const { name, email,message } = await request.json();
  const msg = {
    to:process.env.EMAIL,
    from: email,
    template_id: 'd-5d3da111839a42aead768639165a1541',
    dynamic_template_data: {
      name: name,
      email: email,
      msg: message,
    },
  };
  try {
    await sendEmail(msg);
    return NextResponse.json({ msg: 1 }, { status: 201 });
  } catch (error) {
    console.error(error);
  }
  return NextResponse.json({ msg: 0 }, { status: 500 });
}