import nodemailer from "nodemailer";
import { useRuntimeConfig } from "#imports";
import path from "path";
import fs from "fs";
import handlebars, { logger } from "handlebars";
import { checks } from "googleapis/build/src/apis/checks";

export default defineEventHandler(async (event) => {
	if (event.node.req.method === "POST") {
		console.log(
			`useEmail: ${event.node.req.method}: ` + getRequestURL(event)
		);

		const body = await readBody(event);

		// console.log(body);


		const { from, to, subject, wycena, cc, bcc, dane } = body;

		const config = useRuntimeConfig();

		// const templatePath = path.resolve("./public/email-template.html");
		// const templateSource = fs.readFileSync(templatePath, "utf8");
		// const template = handlebars.compile(templateSource);
		// const html = template({ message: text });

		// console.log(dane);

		function generateTableHtml(data: any) {
			const tableHeader = `
			  <thead>
			    <tr>
				<th>L.p</th>
				<th>Pomieszczenie</th>
				<th>Produkt</th>
				<th>Szerokość/Wysokość</th>
				<th>Ilość</th>
				<th>Opcje</th>
				<th>Cena</th>
			    </tr>
			  </thead>
			`;

			const sumaMontazu = (data: any) => {
				let suma = 0;
				data.forEach((produkt: any) => {
					suma += produkt.cenaMontazu * produkt.ilosc;
				});
				return suma;
			}
			const sumaProduktow = (data: any) => {
				let suma = 0;
				data.forEach((produkt: any) => {
					suma += produkt.cena * produkt.ilosc;
				});
				return suma;
			}




			// console.log(dane);


			const keys = (opcje: any) => {


				const filteredData = Object.entries(opcje)
					.filter(([key, value]) => value !== true && value !== false && key !== 'doplata' && key !== 'plany' && key !== 'grupaMaterialu' && key !== 'uwagi')
					.reduce<Record<string, any>>((acc, [key, value]) => {
						acc[key] = value;
						return acc;
					}, {});

				const items = Object.keys(filteredData)

				let arr: string[] = []

				items.forEach(element => {
					arr.push(` ${element.charAt(0).toUpperCase() + element.slice(1)}: ${opcje[element]} `)
				});

				return arr

			}

			const tableRows = data
				.map(
					(item: any, index: any) => `
			  <tr>

			    <td>${index + 1}</td>
			    <td>${item.pomieszczenie}</td>
			    <td>${item.produkt} (${item.rodzaj})</td>
			    <td>${item.szerokosc}x${item.wysokosc}</td>
			    <td>${item.ilosc}</td>
			    <td>
			    <div class="opcje">${'Kolor: ' + item.opcje.kolor + (item.opcje.material ? ', Materiał: ' + item.opcje.material : '')}</div>
			    </td>
			    <td>${Math.round(item.cena * 1.23)}</td>
			  </tr>
			`
				)
				.join("");

			return `
			<html>
			<head>
			    <style>
				  table {
					width: 100%;
					border-collapse: collapse;
				  }
				  th,
				  td {
					border: 1px solid #ddd;
					padding: 8px;
				  }
				
				  opcje {
					display: flex;
				  }
				  th {
					background-color: #f2f2f2;
				  }
				  .container {
					margin: 0 auto;
					padding: 20px;
					border: 1px solid #ddd;
					border-radius: 5px;
				  }
				  .header {
					height: 40px;
					background: #f4f4f4;
					padding: 10px;
					border-bottom: 1px solid #ddd;
					display: inline-block;
					align-items: center;
				  }
				  .footer {
					background: #f4f4f4;
					padding: 10px;
					border-top: 1px solid #ddd;
					text-align: center;
				  }
				  .content {
					padding: 20px;
				  }
				  .montaz {
					text-align: right;
					background-color: #f2f2f2;
				  }
				  .image {
					height: inherit;
					width: auto;
				  }
				  span {
					align-items: center;
					display: flex;
					justify-items: center;
				  }
			    </style>
			</head>
			<body>
			    <div class="container">
				  <div class="header">
				  	
					<img
					    class="image"
					    src="https://i.ibb.co/j40HDxM/logo-vemar.png"
					/>
					wycena ID: ${dane.id}
					
				  </div>
		  
				  <div class="content">
					<div>
					    <table>
				  		<thead>
						<tr>
						<th>Imię i nazwisko</th>
						<th>Ulica</th>
						<th>Miejscowość</th>
						<th>mail</th>
						<th>telefon</th>
						<th>NIP</th>
						</tr>
						</thead>
						<tbody>
						<td>${dane.name}</td>
						<td>${dane.street}</td>
						<td>${dane.city}</td>
						<td>${dane.email}</td>
						<td>${dane.phone}</td>
						<td>${dane.nip}</td>
						</tbody>
					    </table>
					</div>
					<br/>
					<table>
					    ${tableHeader}
					    <tbody>
						  ${tableRows}
						  <tr>
							<td class="montaz" colspan="6">Montaż:</td>
							<td class="montaz" colspan="1">
							    ${sumaMontazu(wycena.produkty)} zł
							</td>
						  </tr>
						  <tr>
							<td class="montaz" colspan="6">Suma produktów:</td>
							<td class="montaz" colspan="1">
							    ${Math.round((sumaProduktow(wycena.produkty) *
				1.23))} zł
							</td>
						  </tr>
						
						  <tr>
							<td class="montaz" colspan="5">Zadatek / Pozostało:</td>
							<td class="montaz" colspan="4">
							${wycena.rodzajZadatku}: ${wycena.zadatek} zł / ${Math.round(wycena.doZaplaty)} zł
							</td>
						  </tr>
					    </tbody>
					</table>
				  </div>
				  <div class="footer">
					<p>Uwaga cena może uledz delikatnej zmianie!</p>
				  </div>
			    </div>
			</body>
		  </html>
		  
			`;
		}

		// const data = [
		// 	{ name: 'John Doe', age: 28, email: 'john@example.com' },
		// 	{ name: 'Jane Smith', age: 34, email: 'jane@example.com' },
		// 	{ name: 'Samuel Green', age: 45, email: 'samuel@example.com' }
		// ];

		const htmlContent = generateTableHtml(wycena.produkty);

		// console.log(wycena.produkty);


		const transporter = nodemailer.createTransport({
			host: config.smtpHost,
			port: Number(config.smtpPort),
			auth: {
				user: config.smtpUser,
				pass: config.smtpPass,
			},
		});

		try {
			await transporter.sendMail({
				from,
				to,
				cc,
				bcc,
				subject,
				// text,
				html: htmlContent,
			});
			return { success: true };
		} catch (error) {
			console.error("Failed to send email:", error);
			throw new Error("Failed to send email");
		}
	}
});
