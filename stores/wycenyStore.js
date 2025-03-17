import { defineStore } from "pinia";
import db from "./db.json";
import { useLocalStorage } from "~/composables/useLocalStorage";
import { logger } from "handlebars";

export const wycenyStore = defineStore("wycenyStore", {
    state: () => ({
        planModal: false,
        modal: false,
        loader: false,
        confirmModal: false,
        itemDelete: null,
        wyceny: [],
        wycena: useLocalStorage("wycena", { produkty: [], aktualizacja: [] }),
        selectedProdukt: {},
        selectedId: null,
        opcjeProduktow: db.opcjeProduktow,
        pomieszczenia: db.pomieszczenia,
        kolory: db.kolory,
        noweProdukty: db.noweProdukty,
        produkty: db.produkty,
        tkaninyPlisy: [
            {
                id: 1,
                grupa: 1,
                name: "LuxPearl",
                colorNumbers: [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                ],
            },
            {
                id: 2,
                grupa: 1,
                name: "DuoPearl",
                colorNumbers: ["201", "202", "203", "204"],
            },
            {
                id: 3,
                grupa: 2,
                name: "Turyn",
                colorNumbers: ["101", "102", "103", "104"],
            },
            {
                id: 4,
                grupa: 2,
                name: "Metalicline",
                colorNumbers: ["301", "302"],
            },
            {
                id: 5,
                grupa: 2,
                name: "Metalicline",
                colorNumbers: ["301", "302"],
            },
            {
                id: 6,
                grupa: 6,
                name: "Scala Blackout",
                colorNumbers: ["3-474", "3-7642"],
            },
        ],
        tkaninyRolety: db.tkaninyRolety,

        wspolczynniki: [
            { id: 1, nazwa: "plisa", wartosc: 1.3 },
            { id: 2, nazwa: "moskitiera", wartosc: 1.2 },
            { id: 3, nazwa: "roleta", wartosc: 1.3 },
        ],
    }),
    getters: {
        produktColor:
            ({ noweProdukty }) =>
            (produktName) => {
                const item = noweProdukty.find((item) => {
                    return item.produkt.toLowerCase() === produktName;
                });
            },
        produkt:
            ({ wycena }) =>
            (id) => {
                return wycena.produkty.find((item) => item.id === id);
            },
        // kolory: (state) => (rodzaj) => {},
        opcjeProduktu: (state) => (o) => {
            let opcje = null;
            function addOpcje(element) {
                opcje = state.opcjeProduktow.filter((item) => {
                    return item.name === element.produkt + "-" + element.rodzaj;
                });
            }
            addOpcje(o);
        },
        // kolorMoskitiery: (state) => (index) => {},
        sumaProduktow: (state) => {
            let suma = 0;
            state.wycena.produkty.forEach((produkt) => {
                suma += produkt.cena * 1.23;
            });

            state.wycena.suma = Math.round(suma);
            return suma;
        },
        sumaMontazu: (state) => {
            let suma = 0;
            state.wycena.produkty.forEach((produkt) => {
                suma += produkt.cenaMontazu * produkt.ilosc;
            });
            state.wycena.montaz = suma;
            return suma;
        },

        doZaplaty: (state) => {
            const { suma, montaz } = state.wycena;

            // Obliczenie wymaganego zadatku (zaokrąglenie do najbliższej setki)
            const wymaganyZadatek = Math.floor((suma + montaz) / 4 / 100) * 100;

            // Ustawienie zadatku na wymaganyZadatek, jeśli jest on mniejszy niż wymaganyZadatek
            state.wycena.rodzajZadatku = "gotówka";
            state.wycena.zadatek = Math.max(
                state.wycena.zadatek,
                wymaganyZadatek
            );

            // Obliczenie do zapłaty
            const doZaplaty = isNaN(state.wycena.zadatek)
                ? suma + montaz
                : suma + montaz - state.wycena.zadatek;

            // Zaokrąglenie do zapłaty do najbliższej liczby całkowitej i zapisanie w stanie
            state.wycena.doZaplaty = Math.round(doZaplaty);

            // Zwracanie zaokrąglonej wartości do zapłaty
            return state.wycena.doZaplaty;
        },

        cenaProwadnicy: (state) => (dolna, gorna) => {
            // console.log(dolna, gorna);

            const maxVal = Math.max(dolna, gorna);

            // // Round up the maximum value to the nearest 20
            const roundedVal = Math.ceil(maxVal / 20) * 20;

            // // Find the price corresponding to the rounded size
            const result = state.produkty.moskitiera.przesuwna.prowadnice.find(
                (item) => item.size === roundedVal
            );

            // console.log(result);

            result
                ? (state.selectedProdukt.cenaProwadnicy = result.price)
                : delete state.selectedProdukt.cenaProwadnicy;

            // console.log(result);

            // // If a match is found, return the price, otherwise return null
            // return result ? result.price : null;

            // let item;
            // const przesuwnaProwadnica = state.wycena.produkty[index];

            // const { produkt, rodzaj } = przesuwnaProwadnica;

            // item = state.produkty[produkt][rodzaj].prowadnice.filter((item) => {
            //     return item.size === `${szer}`;
            // });
        },

        grupaKoloru: (state) => (index) => {
            return state.wspolczynniki.filter((item) => {
                return item.nazwa === produkt;
            })[0].wartosc;
        },

        cenaProduktu: (state) => (index) => {
            const produktWycena = state.wycena.produkty[index];
            if (!produktWycena) return null; // Sprawdzamy, czy produkt istnieje na danym indeksie

            const {
                szerokosc,
                wysokosc,
                produkt,
                rodzaj,
                opcje,
                ilosc,
                cenaProwadnicy,
            } = produktWycena;

            if (!szerokosc || !wysokosc || !ilosc) return null; // Sprawdzamy, czy wszystkie wymagane dane są dostępne

            // Zaokrąglamy szerokość i wysokość do najbliższej liczby dziesiętnej
            // const szer = Math.ceil(szerokosc / 10) * 10;
            // const szer = Math.ceil(szerokosc / 10) * 10;
            // const wys = Math.ceil(wysokosc / 10) * 10;
            let szer;
            let wys;

            function zaokraglanie(szerokosc, wysokosc, dziesietna) {
                const szer = Math.ceil(szerokosc / dziesietna) * dziesietna;
                const wys = Math.ceil(wysokosc / dziesietna) * dziesietna;

                return { szer, wys };
            }

            const getWspolczynnik = (produkt) => {
                const item = state.wspolczynniki.find(
                    (item) => item.nazwa === produkt
                );
                return item ? item.wartosc : 1; // Domyślny współczynnik to 1
            };

            let item;
            let price = null;
            const wspolczynnik = getWspolczynnik(produkt);

            switch (produkt) {
                case "roleta":
                    zaokraglanie(szerokosc, wysokosc, 10);

                    const roleta = zaokraglanie(szerokosc, wysokosc, 10);

                    item = state.produkty[produkt][rodzaj].ceny.find(
                        (item) => item.size === `${roleta.szer}x${roleta.wys}`
                    );

                    if (item) {
                        price = item.price[opcje?.grupaMaterialu - 1];
                    }
                    break;
                case "plisa":
                    zaokraglanie(szerokosc, wysokosc, 10);

                    const plisa = zaokraglanie(szerokosc, wysokosc, 10);

                    item = state.produkty[produkt][rodzaj].ceny.find(
                        (item) => item.size === `${plisa.szer}x${plisa.wys}`
                    );

                    if (item) {
                        price = item.price[opcje?.grupaMaterialu - 1];
                    }
                    break;
                case "moskitiera":
                    zaokraglanie(szerokosc, wysokosc, 10);

                    const moskitiera = zaokraglanie(szerokosc, wysokosc, 10);

                    item = state.produkty[produkt][rodzaj].ceny.find(
                        (item) =>
                            item.size === `${moskitiera.szer}x${moskitiera.wys}`
                    );

                    // console.log(item);

                    if (item) {
                        price = item.price;
                    }
                    break;
                default:
                    return null;
            }

            if (price === null) return null; // Jeśli nie znaleziono ceny, zwracamy null

            // Modyfikacja ceny w zależności od opcji
            if (produktWycena.opcje.wymianaMaterialu) {
                price /= 2;
            }
            if (produktWycena.opcje.stalowaSiatka) {
                // Dodaj obsługę stalowej siatki, jeśli jest taka logika
                // Przykład:
                price += szer * wys * 0.007; // Załóżmy, że stalowa siatka dodaje stałą kwotę 50
            }

            const doplata =
                (price + (cenaProwadnicy || 0)) * (opcje.doplata || 0);

            // Obliczamy cenę i zapisujemy ją w stanie
            const finalPrice =
                (price + doplata + (cenaProwadnicy || 0)) *
                ilosc *
                wspolczynnik;
            state.wycena.produkty[index].cena = finalPrice;

            return finalPrice;
        },
    },

    actions: {
        material(item, kolor) {
            this.selectedProdukt.opcje.material = `${item.name} - ${kolor}`;
            this.selectedProdukt.opcje.grupaMaterialu = item.grupa;
        },
        async sendOferta({ from, email, name, city, street, phone, nip }) {
            console.log("sending");

            const { sendEmail, sending, error } = useEmail();

            const id = crypto.randomUUID();

            const result = await sendEmail({
                from: from,
                to: email,
                subject: `VEMAR, wycena ID: ` + id,
                wycena: { ...this.wycena },
                dane: {
                    id: id,
                    name: name,
                    city: city,
                    street: street,
                    email: email,
                    phone: phone,
                    nip: nip,
                },
            });
            if (result.success) {
                this.modal = false;
            }
        },
        //
        aktualizujSterowanie(produkt, operacja, strona) {
            const przeciwnaStrona = strona === "lewe" ? "prawe" : "lewe";

            // Oblicz sumę sterowań przed jakimikolwiek zmianami
            let sumaSterowan =
                produkt.opcje.sterowanie.lewe + produkt.opcje.sterowanie.prawe;

            // Zwiększanie sterowania
            if (operacja === "+" && sumaSterowan < produkt.ilosc) {
                produkt.opcje.sterowanie[strona] += 1;
            }
            // Pomniejszanie sterowania
            else if (operacja === "-" && produkt.opcje.sterowanie[strona] > 0) {
                produkt.opcje.sterowanie[strona] -= 1;
            }

            // Aktualizuj sumę sterowań po operacji
            sumaSterowan =
                produkt.opcje.sterowanie.lewe + produkt.opcje.sterowanie.prawe;

            // Jeżeli suma sterowań przekracza ilość, zmniejszamy wartość na przeciwnej stronie

            if (
                produkt.opcje.sterowanie[przeciwnaStrona] >= 1 &&
                produkt.ilosc >= sumaSterowan
            ) {
                produkt.opcje.sterowanie[przeciwnaStrona] -= 1;
                produkt.opcje.sterowanie[strona] += 1;
                console.log(true);
                console.log("pomniejszanie");
            }

            // Jeżeli mamy dokładnie tyle sterowań, to upewniamy się, że drugie sterowanie jest poprawnie wyzerowane
            if (produkt.opcje.sterowanie[strona] === produkt.ilosc) {
                produkt.opcje.sterowanie[przeciwnaStrona] = 0;
            }

            return produkt; // Zwracamy zaktualizowany obiekt produktu
        },

        opcja(opcja, value) {
            // Znajdź produkt na podstawie ID wybranego produktu
            const product = this.wycena.produkty.find(
                (produkt) => produkt.id === this.selectedProdukt.id
            );

            // Jeśli produkt nie został znaleziony, zakończ funkcję
            if (!product) return;

            // Destrukturyzacja obiektu opcje z selectedProdukt
            const { opcje } = this.selectedProdukt;

            // Funkcja pomocnicza do zmiany wartości boolowskich
            function toggleOption(op) {
                opcje[op] = !opcje[op];
            }

            switch (opcja) {
                case "kolor":
                    // Ustaw kolor i opcjonalnie dopłatę
                    this.selectedProdukt.opcje[opcja] = value.kolor;
                    if (value.doplata) {
                        this.selectedProdukt.opcje.doplata = value.doplata;
                    } else {
                        delete this.selectedProdukt.opcje.doplata;
                    }
                    break;

                case "blaszka":
                    // Ustaw wartość dla opcji blaszka
                    this.selectedProdukt.opcje[opcja] = value.blaszka;
                    break;
                case "sterowaniePrawe":
                    this.aktualizujSterowanie(
                        this.selectedProdukt,
                        value,
                        "prawe"
                    );
                    break;
                case "sterowanieLewe":
                    this.aktualizujSterowanie(
                        this.selectedProdukt,
                        value,
                        "lewe"
                    );
                    break;

                case "odwrotnyMontaz":
                case "stalowaSiatka":
                case "wymianaMaterialu":
                case "kratkaZwierzeta":
                    // Zmień wartość boolean dla odpowiedniej opcji
                    toggleOption(opcja);
                    break;

                default:
                    // Nieznana opcja, można dodać obsługę błędu
                    console.warn(`Nieznana opcja: ${opcja}`);
                    break;
            }

            // Możliwe miejsce na dodatkową logikę po zmianie opcji
            // console.log(opcja, value);
        },
        changePietro(pietro) {
            // console.log("change pietro");
            this.selectedProdukt.pietro = pietro;
        },
        updateProduct() {
            const { opcje } =
                this.produkty[this.selectedProdukt.produkt][
                    this.selectedProdukt.rodzaj
                ];
            this.selectedProdukt.opcje = opcje;
        },
        odwrotnyMontaz() {
            this.selectedProdukt.opcje.odwrotnyMontaz =
                !this.selectedProdukt.opcje.odwrotnyMontaz;
        },
        stalowaSiatka() {
            this.selectedProdukt.opcje.stalowaSiatka =
                !this.selectedProdukt.opcje.stalowaSiatka;
        },
        wymianaMaterialu() {
            this.selectedProdukt.opcje.wymianaMaterialu =
                !this.selectedProdukt.opcje.wymianaMaterialu;
        },
        cenaM(index) {
            const { produkt, rodzaj } = this.selectedProdukt;
            this.wycena.produkty[index].cenaMontazu =
                this.produkty[produkt][rodzaj].cenaMontazu;
        },

        updateWycena(newData) {
            this.wycena = newData;
        },
        nowaWycena() {
            // const store = localStorage.getItem("wycena");
            // console.log(store);
            // this.wycena =
            // const d = new Date();
            // const date = d.toLocaleString();
            // const nowaWycena = {
            // 	id: crypto.randomUUID(),
            // 	date,
            // 	produkty: []
            // }
            // const wycena = useStorage('wycena')
            // console.log(wycena.value);
            //     const state = localStorage.getItem('wycena')
            //     console.log(state);
            // const state = useStorage('wycena')
            // console.log(wycena);
            // localStorage.setItem('myKey', 'wartoscDoZapisania')
            // const state = useStorage('wyceny', this.wycena)
            // if(state) {
            // 	this.wycena = state.value
            // } else {
            // 	this.wycena = nowaWycena
            // 	useLocalStorage('wycena', this.wycena)
            // }
            // wycena ? this.wycena = wycena.value: useStorage('wycena', nowaWycena)
            // console.log(state);
        },
        dodajJeden(id) {
            // console.log(id);
            const produkt = this.produkt(id);
            // console.log(produkt);
        },
        usunProdukty() {
            this.wycena.produkty = [];
        },
        openConfirm(index, id) {
            this.confirmModal = true;
            this.itemDelete = { index, id };
        },
        handleConfirm() {},
        dodajProdukt(item) {
            const newProdukt = {
                id: Date.now(),
                szerokosc: null,
                wysokosc: null,
                ilosc: 1,
                cena: 0,
                opcje: {},
                rodzaj: null,
                cenaMontazu: null,
                produktKolor: item.produktKolor,
                // produkt: null,
                // cenaMontazu: (function() {
                // 	return this.produkty[this.produkt][this.rodzaj].cenaMontazu
                // })()
            };

            function pushAndReturnLastIndex(array, element) {
                // Push the element to the array
                array.push(element);

                // Return the index of the last occurrence of the element
                return array.lastIndexOf(element);
            }

            const lastItem = pushAndReturnLastIndex(this.wycena.produkty, {
                produkt: item.produkt.toLowerCase(),
                ...newProdukt,
            });

            // this.selectedProdukt = this.wycena.produkty[lastIndex]

            this.selectProdukt(this.wycena.produkty[lastItem]);
            // this.wycena.produkty.push({ produkt: produkt.toLowerCase(), ...newProdukt })

            // let lastElement = this.wycena.produkty.pop()

            // var index = this.wycena.produkty.findIndex(produkt => produkt.id === lastElement.id);

            // this.selectProdukt(this.wycena.produkty[index])

            // this.selectedProdukt = lastElement
        },
        duplikuj(id) {
            const produkt = this.wycena.produkty.find(
                (produkt) => produkt.id === id
            );
            const dup = {
                ...produkt,
                id: Date.now(),
            };
            this.wycena.produkty.push(JSON.parse(JSON.stringify(dup)));

            const item = this.wycena.produkty[this.wycena.produkty.length - 1];
            // this.selectedProdukt = this.wycena.produkty[lastIndex]

            this.selectProdukt(item);

            // this.selectProdukt(this.wycena.produkty[last]);
        },
        usunProdukt(index, id) {
            if (this.selectedProdukt.id == id) this.selectedProdukt = {};
            this.wycena.produkty.splice(index, 1);
        },
        selectProdukt(produkt) {
            // this.selectedId = produkt.id;
            this.selectedProdukt = produkt;
        },
        odejmijJeden(id) {
            const produkt = this.produkt(id);
            console.log(produkt.ilosc);
            if (produkt && produkt.ilosc !== 1) {
                produkt.ilosc--;
            }
        },

        dodajJeden(id) {
            const produkt = this.produkt(id);
            if (produkt) {
                produkt.ilosc++;
            }
        },
        kolorProduktu(kolor, doplata, nazwa) {
            // console.log(id, color);
            // this.selectedProdukt.opcje.kolor = kolor;
            const product = this.wycena.produkty.find(
                (produkt) => produkt.id === this.selectedProdukt.id
            );

            if (product) {
                this.selectedProdukt.opcje.kolor = kolor;
                doplata
                    ? (this.selectedProdukt.opcje.doplata = doplata)
                    : delete this.selectedProdukt.opcje.doplata;
            }
        },
    },
    // hydrate(state, initialState) {
    // 	// in this case we can completely ignore the initial state since we
    // 	// want to read the value from the browser

    // 	state.user = useLocalStorage('pinia/auth/login', 'bob')
    // },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(wycenyStore, import.meta.hot));
}
