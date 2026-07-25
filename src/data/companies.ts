export type Project = {
  title: string;
  location: string;
  client: string;
  amount: string;
  description: string;
  date?: string;
  images: string[];
};

export type Certification = {
  name: string;
  pdf?: string;
};

export type SoaCategory = {
  code: string;
  classifica: string;
  description: string;
};

export type Company = {
  id: string;
  name: string;
  fullName: string;
  role: string;
  description: string;
  longDescription: string;
  admin: string;
  technicalDirector?: string;
  address: string;
  phone: string;
  pec: string;
  email: string;
  certifications: Certification[];
  soaCategories?: SoaCategory[];
  projects: Project[];
  highlights?: string[];
};

// TEMPORARY project photos: Unsplash CDN placeholders grouped by theme, to be
// swapped with the real project photos later. `px` builds a sized, cropped URL.
const px = (id: string) => `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;
const PLACEHOLDER = {
  construction: [px("photo-1504307651254-35680f356dfd"), px("photo-1523217582562-09d0def993a6")],
  building: [px("photo-1487958449943-2429e8be8625"), px("photo-1503387762-592deb58ef4e")],
  renovation: [px("photo-1621905251189-08b45d6a269e"), px("photo-1516156008625-3a9d6067fab5")],
  energy: [px("photo-1466611653911-95081537e5b7"), px("photo-1508514177221-188b1cf16e9d")],
};

export const companies: Company[] = [
  {
    id: "costruzioni-angelico",
    name: "Costruzioni Angelico",
    fullName: "Costruzioni Angelico Edili Stradali s.r.l.",
    role: "Grandi opere infrastrutturali e opere pubbliche",
    description:
      "Costruzioni Angelico Edili Stradali s.r.l. nasce nel <strong>1971</strong> e vede in Alfredo Mancinelli (Amministratore Unico), ed in Giuseppe Saputo (Direttore Tecnico), le figure chiave. Grazie ad una guida lungimirante ed al <strong>know how</strong> del top management, si è imposta fin da subito nel panorama nazionale delle opere pubbliche.",
    longDescription:
      "Specializzata nella realizzazione di grandi interventi infrastrutturali, collabora da decenni con Roma Capitale, il Ministero della Giustizia, il Ministero della Difesa, l'ENAV e i principali enti pubblici italiani.",
    admin: "Geom. Pierluigi Properzi",
    technicalDirector: "Geom. Giuseppe Saputo",
    address: "Piazzale Benito Juarez 10/11, 00144, Roma (RM)",
    phone: "06 45435416 – 06 45435417 – 06 45435418",
    pec: "costruzioniangelicostradalisrl@legalmail.it",
    email: "appalti@impreseriunite.it",
    highlights: [
      "Grandi opere infrastrutturali",
      "Edilizia pubblica e penitenziaria",
      "Progetti immobiliari privati"
    ],
    soaCategories: [
      { code: "OG 1", classifica: "VII", description: "Edifici civili e industriali" },
      { code: "OS 3", classifica: "III", description: "Impianti idrico-sanitari, cucine, lavanderie" },
      { code: "OS 28", classifica: "II", description: "Impianti termici e di condizionamento" },
      { code: "OS 30", classifica: "III-bis", description: "Impianti elettrici, telefonici, radiotelefonici e televisivi" },
    ],
    certifications: [
      { name: "ISO 14000", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-14000.pdf" },
      { name: "ISO 45001", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-45001.pdf" },
      { name: "ISO 50001", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-50001.pdf" },
      { name: "ISO 9001", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-9001.pdf" },
      { name: "SA 8000", pdf: "/assets/certifications/costruzioni-angelico/angelico-sa-8000.pdf" },
      { name: "SOA", pdf: "/assets/certifications/costruzioni-angelico/angelico-soa.pdf" },
      { name: "Attestato FGAS", pdf: "/assets/certifications/costruzioni-angelico/angelico-fgas.pdf" },
      { name: "ESG Rating", pdf: "/assets/certifications/costruzioni-angelico/angelico-esg-rating.pdf" },
      { name: "UNI/PdR 125 – Parità di Genere", pdf: "/assets/certifications/costruzioni-angelico/angelico-uni-pdr-125.pdf" },
      { name: "Politica per la Parità di Genere", pdf: "/assets/certifications/costruzioni-angelico/angelico-politica-parita-genere.pdf" },
    ],
    projects: [
      {
        title: "Padiglione Detentivo Ariano Irpino",
        location: "Ariano Irpino (AV)",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "8.454.874,99 €",
        description:
          "Lavorazioni di realizzazione di un nuovo padiglione detentivo della capienza di n. 200 posti presso la casa circondariale di Ariano Irpino.",
        images: PLACEHOLDER.construction,
      },
      {
        title: "Ristrutturazione DAP Roma",
        location: "Roma",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "827.418,37 €",
        description:
          "Lavori di distribuzione funzionale ed architettonica delle aree di accesso e di accoglienza visitatori situate al piano terra presso Roma – DAP.",
        images: PLACEHOLDER.renovation,
      },
      {
        title: "Ampliamento Casa Circondariale Livorno",
        location: "Livorno",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "10.918.068,58 €",
        description:
          'Lavori di realizzazione in ampliamento del padiglione "C" di un reparto detentivo da 100 posti presso la Casa Circondariale di Livorno.',
        images: PLACEHOLDER.building,
      },
    ],
  },
  {
    id: "nuova-ccs",
    name: "Nuova C.C.S.",
    fullName: "Nuova C.C.S. S.r.l.",
    role: "Impiantistica e tecnologie",
    description:
      "Nata nel <strong>1997</strong> dalla scissione del ramo d'azienda della C.C.S., la Nuova C.C.S focalizza le sue competenze sulla parte <strong>impiantistica</strong>, mossa dalla spinta determinante del suo attuale amministratore, Alfredo Mancinelli.",
    longDescription:
      "Oggi l'Azienda vanta elevati standard di professionalità nell'installazione di impianti fotovoltaici, di gruppi elettrogeni, di continuità e cabine di trasformazione MT/BT e nella installazione e manutenzione di impianti elettrici, di sicurezza, d'illuminazione e di autonomia industriale.",
    admin: "Alfredo Mancinelli",
    address: "Piazzale Benito Juarez 10/11, 00144, Roma (RM)",
    phone: "06 45435416 – 06 45435417 – 06 45435418",
    pec: "nuovaccs.srl@legalmail.it",
    email: "appalti@impreseriunite.it",
    highlights: [
      "Impiantistica fotovoltaica e tecnologica",
      "Sistemi di sicurezza e illuminazione",
      "Impianti continuità e MT/BT"
    ],
    soaCategories: [
      { code: "OG 1", classifica: "VIII", description: "Edifici civili e industriali" },
      { code: "OG 3", classifica: "II", description: "Strade, autostrade, ponti, viadotti, ferrovie, metropolitane" },
      { code: "OG 9", classifica: "III-bis", description: "Impianti per la produzione di energia elettrica" },
      { code: "OG 10", classifica: "III-bis", description: "Impianti per la trasformazione e distribuzione di energia elettrica e per la pubblica illuminazione" },
      { code: "OS 3", classifica: "III", description: "Impianti idrico-sanitari, cucine, lavanderie" },
      { code: "OS 28", classifica: "III", description: "Impianti termici e di condizionamento" },
      { code: "OS 30", classifica: "V", description: "Impianti elettrici, telefonici, radiotelefonici e televisivi" },
    ],
    certifications: [
      { name: "ISO 14001", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-iso-14001.pdf" },
      { name: "ISO 45001", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-iso-45001.pdf" },
      { name: "ISO 9001", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-iso-9001.pdf" },
      { name: "SA 8000", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-sa-8000.pdf" },
      { name: "SOA", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-soa.pdf" },
      { name: "Attestato FGAS", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-fgas.pdf" },
      { name: "UNI/PdR 125 – Parità di Genere", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-pdr125.pdf" },
      { name: "Politica per la Parità di Genere", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-politica-parita-genere.pdf" },
    ],
    projects: [
      {
        title: "Nuovo Padiglione Casa Circondariale Cremona",
        location: "Cremona",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "9.896.713,00 €",
        date: "08/01/2014",
        description:
          "Realizzazione di un nuovo padiglione presso la Casa Circondariale di Cremona.",
        images: PLACEHOLDER.construction,
      },
      {
        title: "Ristrutturazione Casa Circondariale Matera",
        location: "Matera",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "500.026,68 €",
        description:
          "Ristrutturazione ed adeguamento al DPR 230/2000 del reparto osservazione – isolamento presso la casa circondariale di Matera.",
        images: PLACEHOLDER.renovation,
      },
      {
        title: "Ampliamento Padiglione C – Livorno",
        location: "Livorno",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "7.686.221,09 €",
        description:
          'Realizzazione in ampliamento al padiglione "C" di un reparto detentivo da 100 posti compresa la fornitura e posa in opera di cabine MT e Gruppo Elettrogeno.',
        images: PLACEHOLDER.energy,
      },
      {
        title: "Ristrutturazione Padiglione Firenze – Poggioreale",
        location: "Napoli – Poggioreale",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "1.059.297,37 €",
        description:
          'Ristrutturazione del padiglione "Firenze" presso la casa circondariale di Napoli Poggio Reale.',
        images: PLACEHOLDER.building,
      },
      {
        title: "Nuovo Istituto Penitenziario di Catania",
        location: "Catania",
        client: "Ufficio del Commissario delegato OPCM",
        amount: "23.916.055,75 €",
        description:
          "Progettazione definitiva ed esecutiva ed esecuzione dei lavori di realizzazione del nuovo istituto penitenziario di Catania.",
        images: PLACEHOLDER.construction,
      },
    ],
  },
  {
    id: "gruppo-immobiliare-properzi",
    name: "Imprese Riunite",
    fullName: "Imprese Riunite – Properzi Costruzioni Generali",
    role: "Capogruppo – Holding",
    description:
      "Imprese Riunite è l'entità capogruppo che coordina e guida le società operative del gruppo. Nata dalla visione imprenditoriale di Pierluigi Properzi, dal 1976 rappresenta il punto di riferimento strategico per le attività di Costruzioni Angelico e Nuova C.C.S., garantendo solidità, governance e sviluppo.",
    longDescription:
      "Non operativa direttamente, Imprese Riunite svolge il ruolo di holding, assicurando la coerenza strategica e la sinergia tra le aziende del gruppo. I lavori storici qui elencati risalgono alla vecchia C.C.S. (Consulenze Costruzioni Speciali), da cui il gruppo ha avuto origine.",
    admin: "Pierluigi Properzi",
    address: "Piazzale Benito Juarez 10/11, 00144, Roma (RM)",
    phone: "06 45435416",
    pec: "info@pec.impreseriunite.it",
    email: "info@impreseriunite.it",
    highlights: [
      "Coordinamento e guida strategica",
      "Sinergia tra le società operative",
      "Solidità e governance del gruppo"
    ],
    certifications: [],
    projects: [
      {
        title: "Viadotto Muzdalifah",
        location: "La Mecca – Arabia Saudita",
        client: "Committente Internazionale (ex C.C.S.)",
        amount: "",
        description:
          "Realizzazione del Viadotto Muzdalifah, una delle opere infrastrutturali più prestigiose realizzate dalla vecchia C.C.S. a livello internazionale.",
        images: [],
      },
      {
        title: "Raccordo Anulare Lotto 2",
        location: "Riyadh – Arabia Saudita",
        client: "Committente Internazionale (ex C.C.S.)",
        amount: "",
        description:
          "Costruzione del secondo lotto del Raccordo Anulare nella capitale dell'Arabia Saudita, realizzato dalla storica C.C.S.",
        images: [],
      },
      {
        title: "Porto Turistico Riva di Traiano",
        location: "Civitavecchia – Italia",
        client: "Committente Pubblico (ex C.C.S.)",
        amount: "",
        description:
          "Realizzazione del Porto Turistico Riva di Traiano, importante infrastruttura marittima sulla costa laziale, tra i progetti storici della C.C.S.",
        images: [],
      },
      {
        title: "Facoltà di Ingegneria di Jeddah",
        location: "Jeddah – Arabia Saudita",
        client: "Committente Internazionale (ex C.C.S.)",
        amount: "",
        description:
          "Costruzione della Facoltà di Ingegneria nella città portuale saudita di Jeddah, opera realizzata dalla vecchia C.C.S.",
        images: [],
      },
    ],
  },
];

export const history = {
  intro:
    "La nostra storia trae origine dalla grinta e dalla perseveranza di Pierluigi Properzi.",
  timeline: [
    {
      year: "1976",
      title: "Fondazione C.C.S.",
      desc: "Da giovane geometra, a soli 18 anni, Pierluigi Properzi entra a far parte del prestigioso Gruppo Genghini. Diventando a soli 26 anni il più giovane dirigente della società, nel 1976 costituisce, insieme ad altri soci, la Consulenze Costruzioni Speciali (C.C.S.). La società si compone di uno staff di manager, tecnici e maestranze altamente specializzate.",
      short: "A soli 26 anni, già dirigente del Gruppo Genghini, Pierluigi Properzi fonda con altri soci la Consulenze Costruzioni Speciali (C.C.S.).",
    },
    {
      year: "1980",
      title: "Acquisizione Costruzioni Angelico",
      desc: "Pierluigi Properzi acquista la Costruzioni Angelico Edili Stradali e, grazie alla sua guida lungimirante, la porta in breve tempo ad imporsi nel panorama nazionale delle opere pubbliche.",
      short: "Properzi acquista Costruzioni Angelico Edili Stradali, portandola in breve tra i nomi di riferimento delle opere pubbliche.",
    },
    {
      year: "1997",
      title: "Nascita della Nuova C.C.S.",
      desc: "Dalla scissione del ramo d'azienda della C.C.S. e con la successiva annessione all'interno del Gruppo Immobiliare Properzi, nasce la Nuova C.C.S che focalizza le sue competenze sull' impiantistica elettrica.",
      short: "Dalla scissione del ramo d'azienda della C.C.S. nasce la Nuova C.C.S., specializzata nell'impiantistica elettrica.",
    },
    {
      year: "Oggi",
      title: "Un team di eccellenza",
      desc: "Attualmente Imprese Riunite - amministrata da Alfredo Mancinelli - vanta un team dinamico composto da ingegneri, architetti e tecnici altamente specializzati che, unito alle grandi capacità di leadership dimostrate dalla famiglia Properzi, ha reso il Gruppo in grado di affrontare qualsiasi tipologia di sfida.",
      short: "Guidata da Alfredo Mancinelli, Imprese Riunite riunisce ingegneri, architetti e tecnici capaci di affrontare ogni sfida.",
    },
  ],
};
