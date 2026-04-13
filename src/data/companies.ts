export type Project = {
  title: string;
  location: string;
  client: string;
  amount: string;
  description: string;
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
};

export const companies: Company[] = [
  {
    id: "costruzioni-angelico",
    name: "Costruzioni Angelico",
    fullName: "Costruzioni Angelico Edili Stradali s.r.l.",
    role: "Grandi opere infrastrutturali e opere pubbliche",
    description:
      "Costruzioni Angelico Edili Stradali s.r.l. nasce nel 1971 e vede in Alfredo Mancinelli, in qualità di Amministratore Unico, ed in Giuseppe Saputo, in qualità di Direttore Tecnico, le figure chiave. Grazie ad una guida lungimirante ed al know how del top management, si è imposta fin da subito nel panorama nazionale delle opere pubbliche.",
    longDescription:
      "Specializzata nella realizzazione di grandi interventi infrastrutturali, collabora da decenni con Roma Capitale, il Ministero della Giustizia, il Ministero della Difesa, l'ENAV e i principali enti pubblici italiani.",
    admin: "Geom. Pierluigi Properzi",
    technicalDirector: "Geom. Giuseppe Saputo",
    address: "Piazzale Benito Juarez 10/11, 00144, Roma (RM)",
    phone: "06 45435416 – 06 45435417 – 06 45435418",
    pec: "costruzioniangelicostradalisrl@legalmail.it",
    email: "appalti@impreseriunite.it",
    certifications: [
      { name: "ISO 45001", pdf: "/certificazioni/iso-45001.pdf" },
      { name: "ISO 50001", pdf: "/certificazioni/iso-50001.pdf" },
      { name: "ISO 37001", pdf: "/certificazioni/iso-37001.pdf" },
      { name: "ISO 20400", pdf: "/certificazioni/iso-20400.pdf" },
      { name: "SOA", pdf: "/certificazioni/soa-angelico.pdf" },
      { name: "SA 8000", pdf: "/certificazioni/sa-8000.pdf" },
      { name: "ISO 14000", pdf: "/certificazioni/iso-14000.pdf" },
      { name: "ISO 9001", pdf: "/certificazioni/iso-9001-angelico.pdf" },
      { name: "IMQ", pdf: "/certificazioni/imq.pdf" },
    ],
    projects: [
      {
        title: "Padiglione Detentivo Ariano Irpino",
        location: "Ariano Irpino (AV)",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "8.454.874,99 €",
        description:
          "Lavorazioni di realizzazione di un nuovo padiglione detentivo della capienza di 200 posti presso la Casa Circondariale di Ariano Irpino.",
        images: [],
      },
      {
        title: "Ristrutturazione DAP Roma",
        location: "Roma",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "827.418,37 €",
        description:
          "Lavori di distribuzione funzionale ed architettonica delle aree di accesso e di accoglienza visitatori situate al piano terra presso Roma – DAP.",
        images: [],
      },
      {
        title: "Ampliamento Casa Circondariale Livorno",
        location: "Livorno",
        client: "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria",
        amount: "10.918.068,58 €",
        description:
          'Lavori di realizzazione in ampliamento del padiglione "C" di un reparto detentivo da 100 posti presso la Casa Circondariale di Livorno.',
        images: [],
      },
    ],
  },
  {
    id: "nuova-ccs",
    name: "Nuova C.C.S.",
    fullName: "Nuova C.C.S. S.r.l.",
    role: "Impiantistica e tecnologie",
    description:
      "Nata nel 1997 dalla scissione del ramo d'azienda della C.C.S. e con la successiva annessione all'interno del Gruppo Immobiliare Properzi, la Nuova C.C.S focalizza le sue competenze sulla parte impiantistica, mossa dalla spinta determinante del suo attuale amministratore, Alfredo Mancinelli.",
    longDescription:
      "Oggi l'Azienda vanta elevati standard di professionalità nell'installazione di impianti fotovoltaici, di gruppi elettrogeni, di continuità e cabine di trasformazione MT/BT e nella installazione e manutenzione di impianti elettrici, di sicurezza, d'illuminazione e di autonomia industriale.",
    admin: "Alfredo Mancinelli",
    address: "Piazzale Benito Juarez 10/11, 00144, Roma (RM)",
    phone: "06 45435416",
    pec: "nuovaccs@legalmail.it",
    email: "info@impreseriunite.it",
    certifications: [
      { name: "ISO 14001", pdf: "/certificazioni/iso-14001-ccs.pdf" },
      { name: "ISO 9001", pdf: "/certificazioni/iso-9001-ccs.pdf" },
      { name: "SOA", pdf: "/certificazioni/soa-ccs.pdf" },
    ],
    projects: [
      {
        title: "Impianti Fotovoltaici per Enti Pubblici",
        location: "Lazio",
        client: "Vari Enti Pubblici",
        amount: "",
        description:
          "Installazione di impianti fotovoltaici di media e grande taglia per edifici pubblici e infrastrutture.",
        images: [],
      },
      {
        title: "Cabine di Trasformazione MT/BT",
        location: "Roma e Provincia",
        client: "Committenti Pubblici e Privati",
        amount: "",
        description:
          "Progettazione e installazione di cabine di trasformazione media tensione/bassa tensione per complessi industriali e infrastrutturali.",
        images: [],
      },
    ],
  },
  {
    id: "gruppo-immobiliare-properzi",
    name: "Gruppo Immobiliare Properzi",
    fullName: "Gruppo Immobiliare Properzi – Properzi Costruzioni Generali",
    role: "Capogruppo – Grandi opere civili",
    description:
      "Imprese Riunite – Properzi Costruzioni Generali è una realtà imprenditoriale italiana che lavora nel settore delle grandi opere civili dal 1976. In più di 40 anni di attività ci siamo affermati nel panorama nazionale come uno dei player più solidi del settore, portando avanti i nostri principi di sostenibilità ed innovazione.",
    longDescription:
      "La solida esperienza maturata in vari settori quali: costruzioni civili, opere marittime ed idrauliche; opere stradali e ristrutturazioni globali ha portato la società ad ottenere importanti incarichi internazionali.",
    admin: "Pierluigi Properzi",
    address: "Piazzale Benito Juarez 10/11, 00144, Roma (RM)",
    phone: "06 45435416",
    pec: "info@pec.impreseriunite.it",
    email: "info@impreseriunite.it",
    certifications: [
      { name: "SOA", pdf: "/certificazioni/soa-properzi.pdf" },
      { name: "ISO 9001", pdf: "/certificazioni/iso-9001-properzi.pdf" },
      { name: "ISO 14001", pdf: "/certificazioni/iso-14001-properzi.pdf" },
    ],
    projects: [
      {
        title: "Viadotto Muzdalifah",
        location: "La Mecca – Arabia Saudita",
        client: "Committente Internazionale",
        amount: "",
        description:
          "Realizzazione del Viadotto Muzdalifah, una delle opere infrastrutturali più prestigiose del gruppo a livello internazionale.",
        images: [],
      },
      {
        title: "Raccordo Anulare Lotto 2",
        location: "Riyad – Arabia Saudita",
        client: "Committente Internazionale",
        amount: "",
        description:
          "Costruzione del secondo lotto del Raccordo Anulare nella capitale dell'Arabia Saudita.",
        images: [],
      },
      {
        title: "Porto Turistico Riva di Traiano",
        location: "Civitavecchia – Italia",
        client: "Committente Pubblico",
        amount: "",
        description:
          "Realizzazione del Porto Turistico Riva di Traiano, importante infrastruttura marittima sulla costa laziale.",
        images: [],
      },
      {
        title: "Facoltà di Ingegneria di Jedda",
        location: "Jedda – Arabia Saudita",
        client: "Committente Internazionale",
        amount: "",
        description:
          "Costruzione della Facoltà di Ingegneria nella città portuale saudita di Jedda.",
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
