import { companies, siteContact } from "@/data/companies";

export const legalContact = siteContact.publicEmail;
export const legalCompanies = companies.filter(({ id }) => id === "costruzioni-angelico" || id === "nuova-ccs");

export const legalPolicies = {
  privacy: {
    title: "Privacy Policy",
    description: "Informativa sul trattamento dei dati personali durante la navigazione e i contatti con Imprese Riunite.",
    sections: [
      {
        title: "Ambito dell’informativa e contatti",
        paragraphs: [
          "Questa informativa riguarda la navigazione sul sito di Imprese Riunite e le comunicazioni inviate ai recapiti pubblicati. Il sito presenta le attività di Costruzioni Angelico Edili Stradali S.r.l. e Nuova C.C.S. S.r.l. La società destinataria della comunicazione tratta i dati necessari a gestire la richiesta nell’ambito delle proprie attività.",
          "Per informazioni sul trattamento dei dati e per esercitare i tuoi diritti puoi scrivere a protocollo@impreseriunite.it, indicando la società cui si riferisce la richiesta. I recapiti delle società sono riportati sotto.",
        ],
      },
      {
        title: "Dati trattati e finalità",
        paragraphs: [
          "Durante la consultazione, i sistemi che distribuiscono e proteggono il sito possono trattare dati tecnici, come indirizzo IP, data e ora della richiesta, pagina richiesta, informazioni sul browser e risposte del server. Questi dati servono a erogare il sito, garantirne il funzionamento e prevenire abusi. La base giuridica è il legittimo interesse alla gestione e alla sicurezza del servizio, ai sensi dell’art. 6, par. 1, lett. f) del Regolamento (UE) 2016/679.",
          "Se contatti una società via email, PEC o telefono, vengono trattati i recapiti e le informazioni che scegli di comunicare per risponderti. Il trattamento si fonda sulle misure precontrattuali richieste dall’interessato (art. 6, par. 1, lett. b), ove applicabili, oppure sul legittimo interesse a gestire le comunicazioni istituzionali e professionali (lett. f). Gli eventuali adempimenti imposti dalla legge si fondano sull’art. 6, par. 1, lett. c).",
          "Il sito non contiene moduli di raccolta dati, account utente o iscrizioni a newsletter. Non utilizza strumenti applicativi di analisi del traffico, pubblicità personalizzata o profilazione. Il conferimento dei dati di contatto è facoltativo; senza le informazioni necessarie potrebbe non essere possibile rispondere alla richiesta.",
        ],
      },
      {
        title: "Fornitori e servizi esterni",
        paragraphs: [
          "Il sito è distribuito tramite Vercel. I fornitori tecnici e i fornitori di posta elettronica possono trattare i dati necessari a erogare i rispettivi servizi; i dati possono essere accessibili al personale autorizzato della società destinataria e, quando previsto dalla legge, alle autorità competenti.",
          "I caratteri tipografici vengono caricati da Google Fonts. Per fornire i font, il browser invia a Google una richiesta di rete che include l’indirizzo IP e informazioni tecniche sulla connessione. I collegamenti a Google Maps e ad altri siti esterni si attivano solo quando li selezioni: le successive attività sono regolate dalle informative dei rispettivi gestori.",
          "I servizi esterni possono comportare trattamenti al di fuori dello Spazio economico europeo. Le informazioni sui luoghi di trattamento e sulle garanzie applicate dai fornitori sono disponibili nelle loro informative, collegate sotto.",
        ],
      },
      {
        title: "Conservazione e sicurezza",
        paragraphs: [
          "Le comunicazioni vengono conservate per il tempo necessario a gestire la richiesta e le eventuali attività conseguenti, nonché per gli ulteriori periodi previsti dagli obblighi di legge o necessari alla tutela di diritti. I dati tecnici vengono trattati per le esigenze di erogazione e sicurezza del servizio secondo le impostazioni dei fornitori. Puoi chiedere informazioni sul periodo applicabile alla tua richiesta tramite il recapito privacy.",
          "Il trattamento avviene con strumenti informatici e organizzativi adeguati alle finalità e con accesso riservato ai soggetti autorizzati. I dati non sono utilizzati per decisioni automatizzate o per profilazione da parte dell’applicazione del sito.",
        ],
      },
      {
        title: "I tuoi diritti",
        paragraphs: [
          "Nei casi previsti dal Regolamento puoi chiedere accesso ai dati, rettifica, cancellazione, limitazione del trattamento e portabilità, nonché opporti ai trattamenti fondati sul legittimo interesse. Se un trattamento si fonda sul consenso, puoi revocarlo senza pregiudicare la liceità del trattamento precedente. Per esercitare i diritti scrivi al recapito indicato sopra.",
          "Puoi inoltre presentare un reclamo al Garante per la protezione dei dati personali tramite www.garanteprivacy.it.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    description: "Informazioni sui cookie, sullo storage del browser e sui servizi esterni del sito di Imprese Riunite.",
    sections: [
      {
        title: "Cookie e strumenti di tracciamento",
        paragraphs: [
          "I cookie sono piccoli file che un sito può memorizzare nel browser. Altri strumenti, come localStorage e sessionStorage, possono conservare informazioni sul dispositivo. Alcuni strumenti sono necessari al funzionamento di un servizio; altri servono a statistiche, pubblicità o profilazione.",
          "L’applicazione di questo sito non imposta cookie e non utilizza localStorage o sessionStorage. Non integra analytics, pixel pubblicitari o strumenti di profilazione. Non è quindi previsto un pannello di consenso per cookie opzionali nell’applicazione attuale.",
        ],
      },
      {
        title: "Infrastruttura e servizi esterni",
        paragraphs: [
          "La distribuzione e la protezione del sito sono fornite da Vercel. Eventuali meccanismi tecnici attivati dall’infrastruttura dipendono dalla configurazione del servizio e sono descritti nella documentazione del fornitore.",
          "Il sito carica i caratteri da Google Fonts tramite richieste di rete al fornitore. Questo servizio non viene utilizzato dall’applicazione per impostare cookie o svolgere profilazione. Le richieste comportano la trasmissione di dati tecnici, descritta nella Privacy Policy.",
          "Google Maps è presente come collegamento esterno, non come mappa incorporata. Il sito non carica video o contenuti social incorporati. Se apri un sito esterno, il suo eventuale uso di cookie è disciplinato dalla sua informativa.",
        ],
      },
      {
        title: "Gestione tramite browser",
        paragraphs: [
          "Puoi controllare i cookie e i dati dei siti nelle impostazioni di privacy del browser, cancellare quelli già presenti o limitarne la memorizzazione. Le impostazioni riguardano anche altri siti e possono incidere sul funzionamento dei servizi che utilizzi.",
          "Se in futuro vengono introdotti strumenti opzionali di analisi o profilazione, questa informativa e le modalità di gestione delle preferenze dovranno essere aggiornate prima della loro attivazione.",
        ],
      },
      {
        title: "Contatti",
        paragraphs: ["Per informazioni sul sito e sul trattamento dei dati puoi scrivere a protocollo@impreseriunite.it. La Privacy Policy riporta i contatti delle società, le finalità di trattamento e i tuoi diritti."],
      },
    ],
  },
} as const;
