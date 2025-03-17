import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event: any) => {
	const client = await serverSupabaseClient(event)
	const user = await serverSupabaseUser(event)


	if (event.node.req.method === 'GET') {
		console.log(`useKlient 🚀 ${event.node.req.method}: ` + getRequestURL(event))
		const query = getQuery(event)



		return new Promise<any>(async (resolve: any, reject: any) => {
			// if (!user) {
			// 	throw createError({ statusCode: 401, message: 'Brak uprawnień!' })
			// }

			const { data: data, error } = await client.from('klienci').select('*')
				.eq('nip', query.nip as String)

			setTimeout(() => {
				if (error) {
					resolve(error)
				} else {
					resolve({ success: true, data })
				}
			}, 500);

		})

	}


	if (event.node.req.method === 'POST') {

		console.log(`usePomiary 🚀 ${event.node.req.method}: ` + getRequestURL(event))

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




	//   const { data, error } = await client.from('tasks').select('id, title, completed').eq('user', user.id).order('created_at')
	//   if (error) {
	//     throw createError({ statusMessage: error.message })
	//   }

})