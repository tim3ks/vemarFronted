import { google } from 'googleapis';
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
	// Pobierz dane z żądania
	const body = await readBody(event);
	const { wycena } = await readBody(event);


	const config = useRuntimeConfig();

	// const values = wycena.produkty.map((dataSet: any) => [dataSet.value1, dataSet.value2]);
	const values = wycena.produkty.map((dataSet: any) => [dataSet.id, dataSet.produkt, dataSet.rodzaj, dataSet.szerokosc, dataSet.wysokosc, dataSet.ilosc, dataSet.opcje.kolor])

	// console.log(values);

	const resource = {
		values,
	};


	// Ścieżka do pliku z kluczami usługi
	const keyFile = './credentials/vemar-416409-16e0c226c728.json';



	// Inicjalizacja JWT client
	const auth = new google.auth.GoogleAuth({
		credentials: {
			"private_key": config.googlePrivateKey.replace(/\\n/g, '\n'),
			"client_email": config.googleClientEmail,
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});

	const authClient = await auth.getClient();
	const sheets = google.sheets({ version: 'v4', auth: authClient });

	const spreadsheetId = '1Iy6LCPvj2lZYXTjvZW0EKaQOIKNSuUOKcozp5zwk3cs';
	const range = 'Produkty zleceń!A2:G1000'; // Zakres do aktualizacji

	// console.log(body);


	// Aktualizacja danych w arkuszu

	try {

		const response = await sheets.spreadsheets.values.append({
			spreadsheetId,
			range,
			valueInputOption: 'RAW',
			resource
		});

		return {
			status: response.status,
			statusText: response.statusText,
		};
	} catch (error) {
		console.error('Błąd wstawiania wierszy:', error);
	}
});
