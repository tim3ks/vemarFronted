import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import Bir from 'bir1'

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event)
	const client = await serverSupabaseClient(event)
	const query = getQuery(event)
	const config = useRuntimeConfig(event)

	const bir = new Bir({ key: config.BIR1_KEY })

	if (event.node.req.method === 'GET') {


		console.log(`useGus 🚀 ${event.node.req.method}: ` + getRequestURL(event))

		return new Promise<any>(async (resolve) => {
			// if (!user) {
			// 	throw createError({ statusCode: 401, message: 'Brak uprawnień!' })

			// }

			type QueryValue = Object

			const q = {
				nip: query.nip
			}



			try {
				const data: QueryValue | QueryValue[] = await bir.search((q as any))

				setTimeout(() => {
					if (!data) {
						resolve({ success: false, data })

					} else {
						resolve({ success: true, data })
					}
				}, 500);

			} catch (error) {
				// Obsługa błędu, jeśli wystąpi
				console.error("Błąd podczas wyszukiwania:", error);
			}






		})


	}
	//   const { data, error } = await client.from('tasks').select('id, title, completed').eq('user', user.id).order('created_at')
	//   if (error) {
	//     throw createError({ statusMessage: error.message })
	//   }

})