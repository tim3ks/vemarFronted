// import Klient from "~/components/Klient.vue";
import { Klient, Produkty, Monterzy } from '#components'

const contentClass = 'p-2 bg-slate-500 bg-opacity-30 rounded-b-md backdrop-blur-sm'

export default [
	{
		name: '*** Klient ***',
		component: Klient,
		headerClass: 'bg-blue-600/70 backdrop-blur-md border-b-2 border-slate-500 border-t-2',
		// color: 'bg-gradient-to-r from-blue-600  to-blue-400 border-b-2 border-slate-500 border-t-2',
		contentClass: contentClass
	},
	{
		name: '/// Produkty ///',
		component: Produkty,
		headerClass: 'bg-red-600/70 backdrop-blur-md border-b-2 border-slate-500 border-t-2',
		contentClass: contentClass
	},
	{
		name: '... Monterzy ...',
		component: Monterzy,
		headerClass: 'bg-yellow-600/70 backdrop-blur-md border-b-2 border-slate-500 border-t-2',
		contentClass: contentClass

	},
]