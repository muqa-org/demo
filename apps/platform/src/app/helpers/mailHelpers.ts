import mailgun, { MessageData } from 'mailgun-js';

export const sendMail = async (data: MessageData) => {
	const mg = mailgun({
		apiKey: process.env.MAILGUN_API_KEY || '',
		domain: process.env.MAILGUN_DOMAIN || '',
		host: process.env.MAILGUN_API_HOST || 'api.eu.mailgun.net',
	});

	const sendData = {
		from: data.from,
		to: data.to,
		subject: data.subject,
		html: data.html,
	};

	try {
		const body = await mg.messages().send(sendData);
		return body;
	} catch (error) {
		console.error('Error sending email:', error);
	}
};
