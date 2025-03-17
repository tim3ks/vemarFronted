import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { useRoute } from 'vue-router'

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event)
	const client = await serverSupabaseClient(event)
	const query = getQuery(event)
	const body = await readBody(event)
	// const redirect = await sendRedirect(event, '/', 301)


	if (event.node.req.method === 'POST') {

		// console.log(query);

		// console.log(body);

		// const {ACCESS_TOKEN_KEY} = useRuntimeConfig()

		// console.log(ACCESS_TOKEN_KEY);



		switch (query.method) {
			case 'sign-in':
				try {
					const { data, error } = await client.auth.signInWithPassword({
						email: body.email,
						password: body.password,
					})
					// const { error } = await client.auth.signInWithPassword({
					// 	email: body.email,
					// 	password: body.password,
					// });

					// console.log(data.user);
					

					if (error) {
						throw error;
					}

					// localStorage.setItem(`sb-${ACCESS_TOKEN_KEY}-auth-token`, JSON.stringify(data.session))

					return {
						user:data.user
					}

				} catch (error: any) {
					console.error('Błąd podczas logowania:', error.message);
				}
				break;
			case 'sign-out':

				try {
					const { error } = await client.auth.signOut();

					if (error) {
						throw error;
					}

					return {
						status: 200,
						message: 'Pomyślnie wylogowano użytkownika'
					}

				} catch (error: any) {
					console.error('Błąd podczas wylogowywania użytkownika:', error.message);
				}

				break;

			default:
				break;
		}






	}

	// if (event.node.req.method === 'POST' && !body) {

	// 	console.log(`🚀 useAuth: ${event.node.req.method}: ` + getRequestURL(event))



	// }

	//   const { data, error } = await client.from('tasks').select('id, title, completed').eq('user', user.id).order('created_at')
	//   if (error) {
	//     throw createError({ statusMessage: error.message })
	//   }

})