// Email notification utility using EmailJS
export async function sendLeadNotification(leadData: {
  name: string;
  email: string;
  phone: string;
  message?: string;
}) {
  try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS credentials are missing');
      return false;
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          from_name: leadData.name,
          from_email: leadData.email,
          phone: leadData.phone,
          message: leadData.message || 'No message provided',
          to_email: 'zenbu9256@gmail.com',
        },
      }),
    });

    if (response.ok) {
      console.log('Email notification sent successfully');
      return true;
    } else {
      console.error('Failed to send email notification:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
}
