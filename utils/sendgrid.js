import sgMail from '@sendgrid/mail';

export const sendEmail = async (msg) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${msg.to}`);
  } catch (error) {
    console.error(await error);
  }
};