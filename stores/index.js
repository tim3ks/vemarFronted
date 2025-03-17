import { defineStore } from "pinia";
// import { ofetch } from "ofetch";

export const useStore = defineStore("store", {
    state: () => ({
        access: null,
        userData: null,
        pomiary: [],
        pomiar: {},
        filterStatus: [1, 2, 3, 4],
        filteredPomiary: [],
        companyNip: null,
        klient: {
            telefon: "",
        },
        isCompany: "Prywatna",
        postalCode: null,
        isExist: false,
    }),
    getters: {
        filter: (state) => async () => {
            // console.log('filter');

            // const { pending, data: pomiary } = await useLazyAsyncData('pomiary', () => $fetch('/api/usePomiary', {
            // 	method: 'GET',
            // 	query: {
            // 		status: state.filterStatus
            // 	}
            // }))

            const { data } = await $fetch("/api/usePomiary", {
                method: "GET",
                query: {
                    status: state.filterStatus.join(","),
                },
            });
            // return state.filteredPomiary = state.pomiary.filter(element => state.filterStatus.includes(element.status_id))
            return (state.pomiary = data);

            // console.log(getData);
            // console.log(getData);
            // state.filteredPomiary = getData

            // if (state.filterStatus.length == 0) {
            // 	return
            // } else {
            // 	return state.filteredPomiary = getData
            // 	// return await $fetch('/api/usePomiary', {
            // 	// 	query: {
            // 	// 		stauts: state.filterStatus
            // 	// 	}
            // 	// }).then((response) => state.filteredPomiary = response.data)
            // }
        },
        klientAdres: (state) => () => {
            return {
                firstLine:
                    state.klient?.KodPocztowy +
                    ", " +
                    state.klient?.Miejscowosc,
                secondLine:
                    state.klient?.Ulica +
                    " " +
                    state.klient?.NrNieruchomosci +
                    (state.klient?.NrLokalu
                        ? " / " + state.klient?.NrLokalu
                        : ""),
            };
        },
        // filterLength: (state) => (filter) => state
    },

    actions: {
        updateAccess(name) {
            if (name !== "") {
                this.access = name;
            }
        },
        async getPomiary() {
            console.log("🚀 ~ wczytywaniePomiarow");
            await $fetch("/api/usePomiary", {
                method: "GET",
                query: {
                    status: this.filterStatus.join(","),
                },
            }).then((response) => {
                if (response.success) {
                    // console.log(response);
                    this.pomiary = response.data;
                } else {
                    console.log(response);
                    throw new Error();
                }
            });
        },

        async login() {},

        async userRoles() {
            await useFetch("/api/userRoles", {
                method: "GET",
            }).then(async ({ data, status, error }) => {
                if (error && status.value == "success") {
                    this.access = data.value[0].roles[0];
                } else {
                    throw new Error("Error");
                }
            });
        },

        logOut() {
            useFetch("/api/useAuth", {
                method: "POST",
            });
        },
        async newPomiar() {
            const user = useSupabaseUser();
            // console.log(uuid);

            const d = new Date();
            const date = d.toLocaleString();

            const data = {
                pomiar_id: crypto.randomUUID(),
                klient_id: "081a2fed-0e83-41ea-a816-25d504042e31",
                user_id: user.value.id,
                produkty: [],
                monterzy: [],
                date,
                platnosc: null,
                odbior: false,
                montaz: true,
                koordynaty: "",
                adresMontazu: "",
            };

            this.pomiar = data;
            // const data = {
            // 	pomiar_id: crypto.randomUUID(),
            // 	user_id: user.value.id,
            // 	items: [],
            // }

            // this.nowyPomiar = data

            // await $fetch('/api/usePomiary', {
            // 	method: 'post',
            // 	body: {
            // 		data: this.nowyPomiar,
            // 	}
            // }).then(({ data, error }) => {
            // 	// console.log(data[0]);
            // 	this.pomiary.unshift(data[0])
            // })

            // if (!this.pomiary.length) {
            // 	const nowy = { 'id': crypto.randomUUID() }
            // 	this.pomiary.push(nowy)
            // }
        },
        async zapiszPomiar() {
            await $fetch("/api/usePomiary", {
                method: "post",
                body: {
                    data: this.pomiar,
                },
            }).then(({ data, error }) => {
                // console.log(data[0]);
                if (error) throw error;
                this.pomiary.unshift(data[0]);
            });
        },

        async getCompany(nip) {
            console.log("🚀 ~ pobieranie danych z gus!");

            await $fetch(`/api/useGus`, {
                query: {
                    nip: nip,
                },
            }).then(async ({ data }) => {
                let firma = { ...data };

                firma = {
                    ...firma,
                    telefon: "",
                };

                this.klient = firma;
            });
            // console.log('get');
        },

        async checkCompany(nip) {
            console.log("🚀 ~ sprawdzanie danych w bazie!");
            // console.log(nip);

            // const { data: data, pending } = await useLazyAsyncData('check-klient', async () => {
            // 	const [gusKlient, dbKlient] = await Promise.all([
            // 		$fetch('/api/useGus', {
            // 			query: {
            // 				nip: nip
            // 			}
            // 		}),
            // 		$fetch('/api/useKlient', {
            // 			query: {
            // 				nip: nip
            // 			}
            // 		})
            // 	])

            // 	return { gusKlient, dbKlient }
            // })

            // console.log(data.value.gusKlient, data.value.dbKlient);

            await $fetch("/api/useKlient", {
                query: {
                    nip: nip,
                },
            }).then(({ data }) => {
                if (!data.length) {
                    this.getCompany(nip);
                } else {
                    this.isExist = true;
                    console.log(data);
                }
            });

            // await $fetch(`/api/useGus`, {
            // 	query: {
            // 		nip: nip
            // 	}
            // }).then(async ({ data }) => {

            // 	let firma = { ...data };

            // 	firma = {
            // 		...firma,
            // 		telefon: ''
            // 	}

            // 	this.klient = firma

            // 	console.log(firma);

            // 	if ({ ...data.success }) await $fetch(`/api/useKlient`, {
            // 		query: {
            // 			nip: nip
            // 		}
            // 	}).then(async (response) => {

            // 		console.log(response);

            // 		// console.log(response);
            // 	})

            // 	// console.log(response);
            // })
        },
        async getPostal(postalCode) {
            // const url = new URL(
            // 	"https://api.zipcodestack.com/v1/search"
            //   );

            //   const params = {
            // 	"codes": "99501,90210",
            // 	"country": "us",
            //   };
            //   Object.keys(params)
            // 	.forEach(key => url.searchParams.append(key, params[key]));

            //   const headers = {
            // 	"apikey": "01HSHE27PG9QK2X0T0PDPE70KQ",
            // 	"Accept": "application/json",
            //   }

            try {
                await $fetch(
                    `https://polish-zip-codes1.p.rapidapi.com/${postalCode}`,
                    {
                        headers: {
                            "X-TraceId": "optional_abc123",
                            Accept: "application/json",
                            "X-RapidAPI-Key":
                                "a0afe856f7msh4a6a12a3d055752p13e384jsn9f2ee19155ea",
                            "X-RapidAPI-Host":
                                "polish-zip-codes1.p.rapidapi.com",
                        },
                    }
                ).then((response) => {
                    console.log(response);
                    // this.klient = response
                    // console.log(response);
                });
            } catch (error) {
                console.error(error);
            }

            // await $fetch("https://api.zipcodestack.com/v1/search", {
            // 	headers
            // }).then(({ response }) => {
            // 	this.klient = response
            // 	// console.log(response);
            // })
        },
    },
});
