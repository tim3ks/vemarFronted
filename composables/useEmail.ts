import { ref } from 'vue';

export function useEmail() {
	const sending = ref(false);
	const error = ref<string | null>(null);

	const sendEmail = async (emailData: {
		from: string,
		to: string,
		subject: string,
		text?: string,
		html?: string,
		cc?: string,
		bcc?: string
	}) => {
		sending.value = true;
		error.value = null;

		try {
			const response = await $fetch('/api/send-email', {
				method: 'POST',
				body: emailData
			});

			if (response?.success) {
				// Usunięto zduplikowaną deklarację `response`
				await $fetch('/api/send-to-google', {
					method: 'POST',
					body: emailData
				});
				return { success: true };
			} else {
				throw new Error('Failed to send email');
			}
		} catch (err: any) {
			error.value = err.message;
			return { success: false, error: err.message };
		} finally {
			sending.value = false;
		}
	};

	return { sendEmail, sending, error };
}
