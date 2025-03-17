import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
	const client = await serverSupabaseClient(event)
	const user = await serverSupabaseUser(event)
	const query = getQuery(event)

	if (event.node.req.method === 'POST') {

		console.log(`usePomiary 🚀 :smile ${event.node.req.method}: ` + getRequestURL(event))

		const body = await readBody(event)

		return new Promise<any>(async (resolve) => {
			if (!user) {
				throw createError({ statusCode: 401, message: 'Brak uprawnień!' })
			}

			const { data, error } = await client.from('pomiary').insert(body.data)
				.select()


			setTimeout(() => {
				if (error) {
					resolve(error)
				} else {
					resolve({ success: true, data })
				}
			}, 500);

		})

	}

	if (event.node.req.method === 'GET') {

		// console.log(event.node.req.headers);


		console.log(`usePomiary 🚀 ${event.node.req.method}: ` + getRequestURL(event))

		// console.log(query);
		const { status } = query
		// console.log(status);

		
		
		return new Promise<any>(async (resolve) => {
			// if (!user) {
				// 	throw createError({ statusCode: 401, message: 'Brak uprawnień!' })
				// }
				// const query = status.join('status_id.eq') as []
				// let query;


				// console.log(status);
				

				// query = status.join(',')
				
				
			
			
			//.or(`id.eq.2,name.eq.Algeria`)
			const { data, error } = await client.from('pomiary').select('*').filter('status_id', 'in', `(${status})`)



			setTimeout(() => {
				if (error) {
					resolve(error)
				} else {
					resolve({ success: true, data })
				}
			}, 500);

		})

	}


	//   const { data, error } = await client.from('tasks').select('id, title, completed').eq('user', user.id).order('created_at')
	//   if (error) {
	//     throw createError({ statusMessage: error.message })
	//   }

})