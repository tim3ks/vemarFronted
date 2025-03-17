export default defineNuxtRouteMiddleware((to, from) => {
	// const { authenticated } = storeToRefs(store()); // make authenticated state reactive
  const token = useCookie('token'); // get token from cookies

  // console.log(token);
  
  // if (token.value) {
  //   // check if value exists
  //   authenticated.value = true; // update the state to authenticated
  // }

  // // if token exists and url is /login redirect to homepage
  // if (token.value && to?.name === 'login') {
  //   return navigateTo('/');
  // }

  // // if token doesn't exist redirect to log in
  // if (!token.value && to?.name !== 'login') {
  //   abortNavigation();
  //   return navigateTo('/login');
  // }
	
	
	// console.log(to, from);

	// skip middleware on server
	// if (process.server) return
	// // skip middleware on client side entirely
	// if (process.client) return
	// // or only skip middleware on initial client load
	// const nuxtApp = useNuxtApp()
	// if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
})