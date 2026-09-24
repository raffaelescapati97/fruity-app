# Fruity

Fruity e un'applicazione Angular per esplorare i frutti e conoscere i loro valori nutrizionali. I dati arrivano in tempo reale dalla [FruityVice API](https://www.fruityvice.com/).

## Funzionalita

- Caricamento della lista completa dei frutti nella pagina iniziale.
- Schede sintetiche con famiglia botanica e calorie per 100 g.
- Click su una scheda per aprire il dettaglio nutrizionale: calorie, carboidrati, zuccheri, proteine e grassi.
- Ricerca di un singolo frutto tramite API, ad esempio `api/fruit/banana`.
- Stati di caricamento, errore e risultato vuoto.
- Layout responsive per desktop, tablet e smartphone.

## Tecnologie e librerie

- Angular 22 e Angular CLI.
- TypeScript 6.
- RxJS per le richieste HTTP.
- FormsModule per la barra di ricerca.
- FruityVice API come servizio dati esterno.
- Firebase Hosting e Cloud Functions per il deploy.
- Google Fonts (DM Sans) per la tipografia.

Non sono presenti librerie UI esterne: l'interfaccia usa CSS locale per mantenere il progetto leggero e facilmente leggibile.

## Requisiti

- Node.js 20.19 o superiore.
- npm 10 o superiore.

## Avvio locale

```bash
git clone <URL_DEL_REPOSITORY>
cd fruity-app
npm install
npm start
```

Aprire `http://localhost:4200/`. Il server Angular usa `proxy.conf.json`: le richieste locali a `/api` vengono inoltrate a `https://www.fruityvice.com`, evitando il problema CORS durante lo sviluppo.

## Comandi disponibili

```bash
npm start       # avvia il server di sviluppo
npm run build   # crea la build di produzione in dist/fruity-app/browser
npm test        # esegue i test unitari con Vitest
```

## Struttura principale

- `src/app/fruit.ts`: interfacce TypeScript per frutto e valori nutrizionali.
- `src/app/fruit.service.ts`: accesso centralizzato agli endpoint FruityVice.
- `src/app/app.ts`: stato della pagina, ricerca e selezione del dettaglio.
- `src/app/app.html`: struttura della pagina e stati UI.
- `src/app/app.css`: stile responsive del componente.
- `proxy.conf.json`: proxy CORS usato solo in sviluppo.
- `firebase.json`: configurazione Firebase Hosting e fallback SPA.

## Deploy Firebase

1. Installare la CLI e autenticarsi:

```bash
npm install -g firebase-tools
firebase login
```

2. Creare un progetto da [Firebase Console](https://console.firebase.google.com/) oppure usare un progetto esistente.

3. Collegare la cartella locale al progetto:

```bash
firebase use --add
```

Selezionare il progetto Firebase quando richiesto.

4. Il proxy API in `functions/` usa Cloud Functions per inoltrare le richieste a FruityVice in produzione. Per abilitarlo, il progetto Firebase deve essere sul piano Blaze con un account di fatturazione associato. L'utilizzo gratuito mensile di Cloud Functions copre i volumi ridotti di questo progetto; Firebase applica costi solo oltre le soglie previste dal piano.

5. Creare la build e pubblicare Hosting e proxy API:

```bash
npm run build
firebase deploy --only functions,hosting
```

Firebase mostrerà l'URL pubblico al termine del deploy. Inserire quell'URL in questa sezione del README prima di consegnare il repository:

**Demo online:** https://fruity-app-6119b.web.app

## API

- Lista completa: `GET /api/fruit/all`
- Ricerca per nome: `GET /api/fruit/{nome}`
- API originale: `https://www.fruityvice.com/api/fruit/all`
