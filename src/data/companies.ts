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
  projects: Project[];
  highlights?: string[];
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
    certifications: [
      { name: "ISO 45001", pdf: "https://www.impreseriunite.it/ANGELICO-certificatoISO_45001-pdf" },
      { name: "ISO 50001", pdf: "https://www.impreseriunite.it/ANGELICO-certificato-SOA-pdf" },
      { name: "ISO 37001", pdf: "https://www.impreseriunite.it/ANGELICO-certificato-SOA-pdf" },
      { name: "ISO 20400", pdf: "https://www.impreseriunite.it/ANGELICO-certificato-SA_8000-pdf" },
      { name: "SOA", pdf: "https://www.impreseriunite.it/ANGELICO-certificato-SOA-pdf" },
      { name: "SA 8000", pdf: "https://www.impreseriunite.it/ANGELICO-certificato-SA_8000-pdf" },
      { name: "ISO 14000", pdf: "https://www.impreseriunite.it/ANGELICO-certificato-ISO_14000-pdf" },
      { name: "ISO 9001", pdf: "https://www.impreseriunite.it/angelico-certificato-iso_9001-pdf" },
      { name: "IMQ", pdf: "https://www.impreseriunite.it/angelico-certificato-imq-pdf" },
    ],
    projects: [
      {
        title: "Padiglione Detentivo Ariano Irpino",
        location: "Ariano Irpino (AV)",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "8.454.874,99 €",
        description:
          "Lavorazioni di realizzazione di un nuovo padiglione detentivo della capienza di n. 200 posti presso la casa circondariale di Ariano Irpino.",
        images: [
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ARIANO-1-2-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ARIANO-2-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ARIANO-8-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ARIANO-3-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ARIANO-4-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ARIANO-5-1-800x600.jpg",
        ],
      },
      {
        title: "Ristrutturazione DAP Roma",
        location: "Roma",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "827.418,37 €",
        description:
          "Lavori di distribuzione funzionale ed architettonica delle aree di accesso e di accoglienza visitatori situate al piano terra presso Roma – DAP.",
        images: [
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ATRIO-DAP-7-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ATRIO-DAP-6-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ATRIO-DAP-5-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ATRIO-DAP-4-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ATRIO-DAP-3-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ATRIO-DAP-2-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/ATRIO-DAP-1-800x600.jpg",
        ],
      },
      {
        title: "Ampliamento Casa Circondariale Livorno",
        location: "Livorno",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "10.918.068,58 €",
        description:
          'Lavori di realizzazione in ampliamento del padiglione "C" di un reparto detentivo da 100 posti presso la Casa Circondariale di Livorno.',
        images: [
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-10-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-2-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-9-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-3-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-4-800x600.jpg",
        ],
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
    certifications: [
      { name: "ISO 45001", pdf: "https://www.impreseriunite.it/nuova-ccs-certificato-iso_45001-pdf" },
      { name: "SOA", pdf: "https://www.impreseriunite.it/nuova-css-certificato-soa-pdf" },
      { name: "SA 8000", pdf: "https://www.impreseriunite.it/nuova-ccs-certificato-sa_8000-pdf" },
      { name: "ISO 14001", pdf: "https://www.impreseriunite.it/nuova-css-certificato-ISO_14001-pdf" },
      { name: "ISO 9001", pdf: "https://www.impreseriunite.it/nuova-ccs-certificato-iso_9001-pdf" },
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
        images: [
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/CREMONA-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/CREMONA-2-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/CREMONA-5-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/CREMONA-3-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/CREMONA-4-800x600.jpg",
        ],
      },
      {
        title: "Ristrutturazione Casa Circondariale Matera",
        location: "Matera",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "500.026,68 €",
        description:
          "Ristrutturazione ed adeguamento al DPR 230/2000 del reparto osservazione – isolamento presso la casa circondariale di Matera.",
        images: [
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/MATERA-7-720x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/MATERA-6-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/MATERA-5-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/MATERA-4-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/MATERA-3-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/MATERA-2-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/MATERA-1-800x600.jpg",
        ],
      },
      {
        title: "Ampliamento Padiglione C – Livorno",
        location: "Livorno",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "7.686.221,09 €",
        description:
          'Realizzazione in ampliamento al padiglione "C" di un reparto detentivo da 100 posti compresa la fornitura e posa in opera di cabine MT e Gruppo Elettrogeno.',
        images: [
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-7-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-6-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-5-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-4-1-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-3-1-768x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-2-1-768x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/LIVORNO-1-1-800x600.jpg",
        ],
      },
      {
        title: "Ristrutturazione Padiglione Firenze – Poggioreale",
        location: "Napoli – Poggioreale",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "1.059.297,37 €",
        description:
          'Ristrutturazione del padiglione "Firenze" presso la casa circondariale di Napoli Poggio Reale.',
        images: [
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/POGGIOREALE-5-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/POGGIOREALE-4-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/POGGIOREALE-3-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/POGGIOREALE-2-800x600.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/POGGIOREALE-1-800x600.jpg",
        ],
      },
      {
        title: "Nuovo Istituto Penitenziario di Catania",
        location: "Catania",
        client: "Ufficio del Commissario delegato OPCM",
        amount: "23.916.055,75 €",
        description:
          "Progettazione definitiva ed esecutiva ed esecuzione dei lavori di realizzazione del nuovo istituto penitenziario di Catania.",
        images: [
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/Catania-5.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/Catania-4.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/Catania-3.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/Catania-2.jpg",
          "https://www.impreseriunite.it/wp-content/uploads/2021/05/Catania-1.jpg",
        ],
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
        location: "Riyad – Arabia Saudita",
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
        title: "Facoltà di Ingegneria di Jedda",
        location: "Jedda – Arabia Saudita",
        client: "Committente Internazionale (ex C.C.S.)",
        amount: "",
        description:
          "Costruzione della Facoltà di Ingegneria nella città portuale saudita di Jedda, opera realizzata dalla vecchia C.C.S.",
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
    },
    {
      year: "1980",
      title: "Acquisizione Costruzioni Angelico",
      desc: "Pierluigi Properzi acquista la Costruzioni Angelico Edili Stradali e, grazie alla sua guida lungimirante, la porta in breve tempo ad imporsi nel panorama nazionale delle opere pubbliche.",
    },
    {
      year: "1997",
      title: "Nascita della Nuova C.C.S.",
      desc: "Dalla scissione del ramo d'azienda della C.C.S. e con la successiva annessione all'interno del Gruppo Immobiliare Properzi, nasce la Nuova C.C.S che focalizza le sue competenze sulla parte impiantistica.",
    },
    {
      year: "Oggi",
      title: "Un team di eccellenza",
      desc: "Attualmente Imprese Riunite vanta un team dinamico composto da ingegneri, architetti e tecnici altamente specializzati che, unito alle grandi capacità di leadership dimostrate dalla famiglia Properzi, ha reso il Gruppo in grado di affrontare qualsiasi tipologia di sfida.",
    },
  ],
};
