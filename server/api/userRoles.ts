import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
	const user = await serverSupabaseUser(event)
	const client = await serverSupabaseClient(event)

	
	


	if (event.node.req.method === 'GET') {

		console.log(`Zestawienia: ${event.node.req.method}: ` + getRequestURL(event))

		const { data, error } = await client.from("user_roles_view").select("*");

		if(error) return error

		return data

	}
	//   const { data, error } = await client.from('tasks').select('id, title, completed').eq('user', user.id).order('created_at')
	//   if (error) {
	//     throw createError({ statusMessage: error.message })
	//   }

})