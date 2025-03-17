import { Vonage } from '@vonage/server-sdk'

export default defineEventHandler(async (event) => {



	const vonage = new Vonage({
		apiKey: "2526101c",
		apiSecret: "o1YcdRQoKgG7Ujno"
	})


	if (event.node.req.method === 'POST') {

		console.log(`Zestawienia: ${event.node.req.method}: ` + getRequestURL(event))

		let data

		const from = "Vonage APIs"
		const to = "48600883497"
		const text = 'A text message sent using the Vonage SMS API'

		async function sendSMS() {
			await vonage.sms.send({ to, from, text })
				.then((resp: any) => { console.log('Message sent successfully'); data = resp })
				.catch((err: any) => { console.log('There was an error sending the messages.'); data = err });
		}

		sendSMS();

		return data

	}


})