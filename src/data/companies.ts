import moleAntonelliana from "@/assets/mole-antonelliana.webp";
import rivaDiTraiano from "@/assets/riva-di-traiano.webp";
export type Project = {
  title: string;
  location: string;
  client: string;
  amount: string;
  amountLabel?: string;
  amountNote?: string;
  description: string;
  newsUrl?: string;
  details?: {
    label: string;
    value: string;
  }[];
  date?: string;
  featuredOnHomepage?: boolean;
  images: string[];
  imageLabels?: string[];
};

export type DocumentGroup = "management" | "social" | "soa" | "other" | "policies";

export const documentGroups: { id: DocumentGroup; label: string }[] = [
  { id: "management", label: "Sistemi di gestione" },
  { id: "social", label: "Sociale / ESG" },
  { id: "soa", label: "Qualificazioni SOA" },
  { id: "other", label: "Altri attestati" },
  { id: "policies", label: "Politiche aziendali" },
];

export const managementSystemSubjects: Record<string, string> = {
  "ISO 9001": "Qualità",
  "ISO 14001": "Ambiente",
  "ISO 45001": "Sicurezza",
  "ISO 50001": "Energia",
  "ISO 37001": "Anticorruzione",
};

export type Certification = {
  name: string;
  pdf: string;
  group: DocumentGroup;
  kind: "Certificazione" | "Attestazione" | "Rating" | "Politica" | "Qualificazione";
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
  technicalresponsible?: string;
  vatNumber?: string;
  address: string;
  phone: string;
  pec: string;
  email: string;
  certifications: Certification[];
  soaCategories?: SoaCategory[];
  projects: Project[];
  highlights?: string[];
};

const publicEmail = {
  label: "protocollo@impreseriunite.it",
  href: "mailto:protocollo@impreseriunite.it",
} as const;

export const siteContact = {
  office: {
    street: "Piazzale Benito Juarez 10/11",
    postalCode: "00144",
    city: "Roma",
    province: "RM",
    country: "Italia",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Piazzale+Benito+Juarez+10%2F11%2C+00144+Roma+RM%2C+Italia",
  },
  phones: [
    { label: "06 45435416", href: "tel:+390645435416" },
    { label: "06 45435417", href: "tel:+390645435417" },
    { label: "06 45435418", href: "tel:+390645435418" },
  ],
  publicEmail,
  emails: [
    publicEmail,
    { label: "appalti@impreseriunite.it", href: "mailto:appalti@impreseriunite.it" },
  ],
  institutionalEmails: [
    {
      label: "PEC Costruzioni Angelico",
      value: "costruzioniangelicostradalisrl@legalmail.it",
      href: "mailto:costruzioniangelicostradalisrl@legalmail.it",
    },
    {
      label: "PEC Nuova C.C.S.",
      value: "nuovaccs.srl@legalmail.it",
      href: "mailto:nuovaccs.srl@legalmail.it",
    },
  ],
} as const;

const sharedOfficeAddress = `${siteContact.office.street}, ${siteContact.office.postalCode}, ${siteContact.office.city} (${siteContact.office.province})`;
const sharedOfficePhones = siteContact.phones.map(({ label }) => label).join(" – ");


const SCUOLA_MONTANARI_IMAGES = [
  "/assets/projects/scuola-montanari-ravenna/01-corridoio-completato.webp",
  "/assets/projects/scuola-montanari-ravenna/02-aula-rinnovata.webp",
  "/assets/projects/scuola-montanari-ravenna/03-aula-esistente.webp",
  "/assets/projects/scuola-montanari-ravenna/04-corridoio-impianti.webp",
  "/assets/projects/scuola-montanari-ravenna/05-impianti-ventilazione.webp",
  "/assets/projects/scuola-montanari-ravenna/06-posa-fotovoltaico.webp",
  "/assets/projects/scuola-montanari-ravenna/07-impianto-fotovoltaico.webp",
];

const CASA_COMUNITA_SCAFA_IMAGES = [
  "/assets/projects/casa-comunita-scafa/01-facciata-cantiere.webp",
  "/assets/projects/casa-comunita-scafa/02-gru-e-macchinari.webp",
  "/assets/projects/casa-comunita-scafa/03-struttura-e-ponteggi.webp",
  "/assets/projects/casa-comunita-scafa/04-struttura-interna.webp",
  "/assets/projects/casa-comunita-scafa/05-corridoio-impianti.webp",
  "/assets/projects/casa-comunita-scafa/06-impianto-fotovoltaico.webp",
  "/assets/projects/casa-comunita-scafa/07-scala-antincendio.webp",
];

const FIANO_LE_FELCIARIE_IMAGES = [
  "/assets/projects/fiano-le-felciarie/01-villino-con-giardino.webp",
  "/assets/projects/fiano-le-felciarie/02-villino-e-vialetto.webp",
  "/assets/projects/fiano-le-felciarie/03-villino-e-terreno.webp",
  "/assets/projects/fiano-le-felciarie/04-bagno-completato.webp",
  "/assets/projects/fiano-le-felciarie/05-bagno-e-doccia.webp",
];

const GIUSTINIANA_IMAGES = [
  "/assets/projects/giustiniana/via_saronno.webp",
];

const JEDDAH_FACULTY_IMAGES = [
  "/assets/projects/jeddah/01-facciata-principale.webp",
  "/assets/projects/jeddah/02-facolta-ingegneria.webp",
  "/assets/projects/jeddah/03-campus-king-abdulaziz.webp",
  "/assets/projects/jeddah/04-edificio-campus.webp",
];

const JEDDAH_OTHER_IMAGES = {
  viadotto: ["/assets/projects/jeddah/viadotto.webp"],
  autostrada: ["/assets/projects/jeddah/autostrada.webp"],
};

const PALAZZO_FARNESE_IMAGES = [
  "/assets/projects/palazzo-farnese/01-facciata-principale.webp",
  "/assets/projects/palazzo-farnese/02-accesso-monumentale.webp",
  "/assets/projects/palazzo-farnese/03-scala-regia.webp",
  "/assets/projects/palazzo-farnese/04-volta-affrescata.webp",
  "/assets/projects/palazzo-farnese/05-sala-affrescata.webp",
  "/assets/projects/palazzo-farnese/06-cantiere-interni.webp",
  "/assets/projects/palazzo-farnese/07-illuminazione-giardino.webp",
  "/assets/projects/palazzo-farnese/08-grotta-illuminata.webp",
];

const LINATE_TORRE_CONTROLLO_IMAGES = [
  "/assets/projects/linate-torre-controllo/01-torre-controllo-render.webp",
  "/assets/projects/linate-torre-controllo/02-sala-controllo-render.webp",
  "/assets/projects/linate-torre-controllo/03-reception-enav-render.webp",
  "/assets/projects/linate-torre-controllo/04-complesso-torre-render.webp",
  "/assets/projects/linate-torre-controllo/05-modello-torre.webp",
  "/assets/projects/linate-torre-controllo/06-modello-strutturale.webp",
];

const ATER_CIVITAVECCHIA_IMAGES = [
  "/assets/projects/ater-civitavecchia/01-demolizione-notturna.webp",
  "/assets/projects/ater-civitavecchia/02-demolizione-edificio.webp",
  "/assets/projects/ater-civitavecchia/03-scavi-e-movimentazione.webp",
  "/assets/projects/ater-civitavecchia/04-fondazioni.webp",
  "/assets/projects/ater-civitavecchia/05-armature-fondazioni.webp",
  "/assets/projects/ater-civitavecchia/06-posa-corrugati.webp",
  "/assets/projects/ater-civitavecchia/07-corrugati-impianti.webp",
  "/assets/projects/ater-civitavecchia/08-cabina-elettrica.webp",
  "/assets/projects/ater-civitavecchia/09-trasformatori.webp",
  "/assets/projects/ater-civitavecchia/10-edificio-in-ricostruzione.webp",
  "/assets/projects/ater-civitavecchia/11-facciata-in-cantiere.webp",
];

const CASA_CIRCONDARIALE_CREMONA_IMAGES = [
  "/assets/projects/casa-circondariale-cremona/01-padiglione-in-costruzione.webp",
  "/assets/projects/casa-circondariale-cremona/02-facciata-padiglione.webp",
  "/assets/projects/casa-circondariale-cremona/03-passerella-tecnica.webp",
  "/assets/projects/casa-circondariale-cremona/04-struttura-passerella.webp",
  "/assets/projects/casa-circondariale-cremona/05-collegamento-padiglioni.webp",
  "/assets/projects/casa-circondariale-cremona/06-quadro-controllo.webp",
  "/assets/projects/casa-circondariale-cremona/07-quadro-elettrico.webp",
  "/assets/projects/casa-circondariale-cremona/08-impianto-tecnico.webp",
  "/assets/projects/casa-circondariale-cremona/09-centrale-termica.webp",
];

const REBIBBIA_LABORATORIO_DNA_IMAGES = [
  "/assets/projects/rebibbia-laboratorio-dna/01-giardino-e-istituto.webp",
  "/assets/projects/rebibbia-laboratorio-dna/02-pensilina-fotovoltaica.webp",
  "/assets/projects/rebibbia-laboratorio-dna/03-giardino-roccioso.webp",
  "/assets/projects/rebibbia-laboratorio-dna/04-pensiline-fotovoltaiche.webp",
  "/assets/projects/rebibbia-laboratorio-dna/05-edificio-laboratorio.webp",
  "/assets/projects/rebibbia-laboratorio-dna/06-impianti-esterni.webp",
  "/assets/projects/rebibbia-laboratorio-dna/07-impianto-meccanico.webp",
];

const RESIDENZE_UNIVERSITARIE_LAZIODISU_IMAGES = [
  "/assets/projects/residenze-universitarie-laziodisu/01-corridoio-residenza.webp",
  "/assets/projects/residenze-universitarie-laziodisu/02-edificio-in-cantiere.webp",
  "/assets/projects/residenze-universitarie-laziodisu/03-progetto-facciata.webp",
];

const AULE_BUNKER_IMAGES = [
  "/assets/projects/aule-bunker/01-impianto-fotovoltaico.webp",
  "/assets/projects/aule-bunker/02-impianti-esterni.webp",
  "/assets/projects/aule-bunker/03-unita-trattamento-aria.webp",
  "/assets/projects/aule-bunker/04-impianto-meccanico.webp",
  "/assets/projects/aule-bunker/05-quadro-controllo.webp",
  "/assets/projects/aule-bunker/06-quadro-elettrico.webp",
  "/assets/projects/aule-bunker/07-quadro-tecnico.webp",
  "/assets/projects/aule-bunker/08-unita-impiantistica.webp",
];

const CITTADELLA_GIUDIZIARIA_LATINA_IMAGES = [
  "/assets/projects/latina-cittadella-giudiziaria/01-edificio-giudiziario.webp",
  "/assets/projects/latina-cittadella-giudiziaria/02-impianto-fotovoltaico.webp",
  "/assets/projects/latina-cittadella-giudiziaria/03-cabina-elettrica.webp",
  "/assets/projects/latina-cittadella-giudiziaria/04-cabina-esterna.webp",
  "/assets/projects/latina-cittadella-giudiziaria/05-quadro-media-tensione.webp",
];

const ENAV_ACCORDO_QUADRO_IMAGES = [
  "/assets/projects/enav-accordo-quadro/01-bari-torre.webp",
  "/assets/projects/enav-accordo-quadro/02-bari-cablaggio.webp",
  "/assets/projects/enav-accordo-quadro/03-brindisi-fotovoltaico.webp",
  "/assets/projects/enav-accordo-quadro/04-brindisi-quadri.webp",
  "/assets/projects/enav-accordo-quadro/05-ciampino-cablaggio.webp",
  "/assets/projects/enav-accordo-quadro/06-ciampino-quadri.webp",
  "/assets/projects/enav-accordo-quadro/07-fiumicino-torre.webp",
  "/assets/projects/enav-accordo-quadro/08-olbia-cantiere.webp",
  "/assets/projects/enav-accordo-quadro/09-olbia-impianti.webp",
  "/assets/projects/enav-accordo-quadro/10-olbia-pista.webp",
  "/assets/projects/enav-accordo-quadro/11-ronchi-pista.webp",
];

const ENAV_ACCORDO_QUADRO_IMAGE_LABELS = [
  "Bari",
  "Bari",
  "Brindisi",
  "Brindisi",
  "Ciampino",
  "Ciampino",
  "Fiumicino",
  "Olbia",
  "Olbia",
  "Olbia",
  "Ronchi dei Legionari",
];

export const companies: Company[] = [
  {
    id: "costruzioni-angelico",
    name: "Costruzioni Angelico",
    fullName: "Costruzioni Angelico Edili Stradali s.r.l.",
    role: "Edilizia",
    description:
      "Costruzioni Angelico Edili Stradali s.r.l. nasce nel <strong>1971</strong> e viene acquisita da Properzi nel 1980. Attualmente, vede in Alfredo Mancinelli (Amministratore Unico), ed in Giuseppe Saputo (Direttore Tecnico), le figure chiave. Grazie ad una guida lungimirante ed al <strong>know how</strong> del top management, si è imposta fin da subito nel panorama nazionale delle opere pubbliche.",
    longDescription:
      "Specializzata nella realizzazione di grandi interventi infrastrutturali, collabora da decenni con  <strong>Roma Capitale, il Ministero della Giustizia, il Ministero della Difesa, l'ENAV</strong> e i principali enti pubblici italiani.",
    admin: "Alfredo Mancinelli",
    technicalDirector: "Geom. Giuseppe Saputo",
    technicalresponsible: "Ing. Ornella Squerzanti",
    vatNumber: "00902311000",
    address: sharedOfficeAddress,
    phone: sharedOfficePhones,
    pec: "costruzioniangelicostradalisrl@legalmail.it",
    email: siteContact.publicEmail.label,
    highlights: [
      "Ristrutturazioni e restauri",
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
      { name: "ISO 9001", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-9001.pdf", group: "management", kind: "Certificazione" },
      { name: "ISO 14001", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-14001.pdf", group: "management", kind: "Certificazione" },
      { name: "ISO 45001", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-45001.pdf", group: "management", kind: "Certificazione" },
      { name: "ISO 50001", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-50001.pdf", group: "management", kind: "Certificazione" },
      { name: "ISO 37001", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-37001.pdf", group: "management", kind: "Certificazione" },
      { name: "SA 8000", pdf: "/assets/certifications/costruzioni-angelico/angelico-sa-8000.pdf", group: "social", kind: "Certificazione" },
      { name: "SOA", pdf: "/assets/certifications/costruzioni-angelico/angelico-soa.pdf", group: "soa", kind: "Qualificazione" },
      { name: "Attestato FGAS", pdf: "/assets/certifications/costruzioni-angelico/angelico-fgas.pdf", group: "other", kind: "Attestazione" },
      { name: "ISO 20400:2017 — Acquisti sostenibili", pdf: "/assets/certifications/costruzioni-angelico/angelico-iso-20400.pdf", group: "other", kind: "Certificazione" },
      { name: "ESG Rating", pdf: "/assets/certifications/costruzioni-angelico/angelico-esg-rating.pdf", group: "social", kind: "Rating" },
      { name: "UNI/PdR 125 – Parità di Genere", pdf: "/assets/certifications/costruzioni-angelico/angelico-uni-pdr-125.pdf", group: "social", kind: "Certificazione" },
      { name: "Politica per la Parità di Genere", pdf: "/assets/certifications/costruzioni-angelico/angelico-politica-parita-genere.pdf", group: "policies", kind: "Politica" },
    ],
    projects: [
      {
        title: "Nuova torre di controllo – Milano Linate",
        location: "Milano",
        client: "ENAV S.p.A.",
        amount: "13.374.426,25 €",
        amountLabel: "Importo lavori",
        featuredOnHomepage: true,
        description:
          "Progettazione esecutiva della nuova torre di controllo e del blocco tecnico del centro aeroportuale ENAV di Milano Linate. La realizzazione partirà nel 2027.",
        images: LINATE_TORRE_CONTROLLO_IMAGES,
      },
      {
        title: "Riqualificazione Case popolari ATER",
        location: "Civitavecchia (RM)",
        client: "Azienda Territoriale per l'Edilizia Residenziale (ATER)",
        amount: "5.678.000,00 €",
        amountLabel: "Importo lavori",
        featuredOnHomepage: false,
        description:
          "Miglioramento sismico ed efficientamento energetico mediante demolizione e ricostruzione degli immobili siti in Civitavecchia, Via XVI Settembre 19/23.",
        details: [
          {
            label: "Appalto in ATI",
            value:
              "Costruzioni Angelico Edili Stradali S.r.l. (mandataria) + Nuova C.C.S. S.r.l.",
          },
        ],
        images: ATER_CIVITAVECCHIA_IMAGES,
      },
      {
        title: "Manutenzione ed efficientamento delle Aule Bunker",
        location: "Roma",
        client:
          "Ministero delle Infrastrutture e della Mobilità Sostenibile – Provveditorato interregionale OO.PP. Lazio, Abruzzo, Sardegna – sede di Roma",
        amount: "4.544.096,43 €",
        amountLabel: "Importo complessivo",
        description:
          "Appalto integrato per progettazione esecutiva ed esecuzione degli interventi di manutenzione straordinaria ed efficientamento energetico del complesso delle Aule Bunker, Via Casale di San Basilio 169, Roma.",
        images: AULE_BUNKER_IMAGES,
      },
      {
        title: "Casa della Comunità di Scafa",
        location: "Scafa (PE)",
        client: "ASL di Pescara",
        amount: "881.496,05 €",
        amountLabel: "Importo lavori",
        description:
          "Realizzazione della Casa della Comunità presso il Comune di Scafa, Via della Stazione.",
        newsUrl:
          "https://www.asl.pe.it/Sezione.jsp?titolo=comunicato-stampa---inaugurata-la-casa-della-comunit%C3%A0-hub-di-scafa&idSezione=2139",
        images: CASA_COMUNITA_SCAFA_IMAGES,
      },
      {
        title: "Accordi quadro per i siti e i sistemi ENAV",
        location: "Territorio nazionale",
        client: "ENAV S.p.A.",
        amount: "6.300.000,00 €",
        amountLabel: "Importo complessivo",
        description:
          "Accordi quadro per lavori civili, impiantistici e manutenzione straordinaria dei siti ENAV e dei sistemi di navigazione aerea e meteorologici sul territorio nazionale.",
        details: [
          { label: "Lotto 1 Nord", value: "1.800.000,00 €" },
          { label: "Lotto 2 Centro", value: "2.250.000,00 €" },
          { label: "Lotto 3 Sud", value: "2.250.000,00 €" },
        ],
        images: ENAV_ACCORDO_QUADRO_IMAGES,
        imageLabels: ENAV_ACCORDO_QUADRO_IMAGE_LABELS,
      },
    ],
  },
  {
    id: "nuova-ccs",
    name: "Nuova C.C.S.",
    fullName: "Nuova C.C.S. S.r.l.",
    role: "Impiantistica elettrica",
    description:
      "Nata nel <strong>1997</strong> dalla scissione del ramo d'azienda della C.C.S., la Nuova C.C.S focalizza le sue competenze sulla parte <strong>impiantistica</strong>, mossa dalla spinta determinante del suo attuale amministratore, Alfredo Mancinelli.",
    longDescription:
      "Oggi l'Azienda vanta elevati standard di professionalità nell'installazione di impianti fotovoltaici, di gruppi elettrogeni, di continuità e cabine di trasformazione MT/BT e nella installazione e manutenzione di impianti elettrici, di sicurezza, d'illuminazione e di autonomia industriale.",
    admin: "Alfredo Mancinelli",
    technicalDirector: "Alfredo Mancinelli",
    technicalresponsible: "Ing. Chiara Milani",
    vatNumber: "05289751009",
    address: sharedOfficeAddress,
    phone: sharedOfficePhones,
    pec: "nuovaccs.srl@legalmail.it",
    email: siteContact.publicEmail.label,
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
      { name: "ISO 9001", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-iso-9001.pdf", group: "management", kind: "Certificazione" },
      { name: "ISO 14001", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-iso-14001.pdf", group: "management", kind: "Certificazione" },
      { name: "ISO 45001", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-iso-45001.pdf", group: "management", kind: "Certificazione" },
      { name: "SA 8000", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-sa-8000.pdf", group: "social", kind: "Certificazione" },
      { name: "SOA", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-soa.pdf", group: "soa", kind: "Qualificazione" },
      { name: "Attestato FGAS", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-fgas.pdf", group: "other", kind: "Attestazione" },
      { name: "Rating di legalità", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-rating-legalita.pdf", group: "social", kind: "Rating" },
      { name: "UNI/PdR 125 – Parità di Genere", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-pdr125.pdf", group: "social", kind: "Certificazione" },
      { name: "Politica per la Parità di Genere", pdf: "/assets/certifications/nuova-ccs/nuova-ccs-politica-parita-genere.pdf", group: "policies", kind: "Politica" },
    ],
    projects: [
      {
        title: "Cittadella Giudiziaria di Latina",
        location: "Latina",
        client:
          "Ministero delle Infrastrutture e della Mobilità Sostenibile – Provveditorato interregionale OO.PP. Lazio, Abruzzo, Sardegna – sede di Roma",
        amount: "4.141.437,00 €",
        amountLabel: "Importo lavori",
        description:
          "Appalto integrato per progettazione esecutiva ed esecuzione degli interventi di manutenzione straordinaria ed efficientamento energetico della Cittadella Giudiziaria di Latina – Nuovo Polo Giudiziario.",
        images: CITTADELLA_GIUDIZIARIA_LATINA_IMAGES,
      },
      {
        title: "Palazzo Farnese di Caprarola",
        location: "Caprarola (VT)",
        client: "Ministero della Cultura",
        amount: "350.000,00 €",
        amountLabel: "Importo lavori",
        featuredOnHomepage: true,
        description:
          "Interventi impiantistici e di illuminazione per la valorizzazione degli ambienti monumentali e degli spazi esterni di Palazzo Farnese a Caprarola.",
        images: PALAZZO_FARNESE_IMAGES,
      },
      {
        title: "Rilocazione luci di pista – Aeroporto Ronchi dei Legionari",
        location: "Ronchi dei Legionari (Gorizia)",
        client: "ENAV S.p.A.",
        amount: "1.963.590,00 €",
        amountLabel: "Importo lavori",
        description:
          "Rilocazione dei pozzetti e delle luci di pista presso l’aeroporto di Ronchi dei Legionari.",
        images: ENAV_ACCORDO_QUADRO_IMAGES.slice(10, 11),
      },
      {
        title: "Nuovo padiglione detentivo – Cremona",
        location: "Cremona",
        client: "Ministero della Giustizia",
        amount: "7.829.376,75 €",
        amountLabel: "Importo lavori",
        featuredOnHomepage: true,
        description:
          "Realizzazione di un nuovo padiglione detentivo, compresa la fornitura e posa in opera di cabina MT e gruppo elettrogeno, presso la Casa circondariale di Cremona.",
        images: CASA_CIRCONDARIALE_CREMONA_IMAGES,
      },
      {
        title: "Impianto di energia alternativa – Laboratorio D.N.A. Rebibbia",
        location: "Roma – Rebibbia",
        client: "Ministero della Giustizia",
        amount: "2.622.892,98 €",
        amountLabel: "Importo lavori",
        description:
          "Opere complementari per la realizzazione di un impianto di produzione di energia alternativa, con adeguamento della cabina MT/BT e installazione di gruppo elettrogeno presso la Casa circondariale di Roma Rebibbia – Laboratorio D.N.A.",
        images: REBIBBIA_LABORATORIO_DNA_IMAGES,
      },
      {
        title: "Adeguamento sismico Ala Callegari – Scuola M. Montanari",
        location: "Ravenna",
        client: "Comune di Ravenna",
        amount: "1.688.000,00 €",
        amountLabel: "Importo lavori",
        description:
          "Adeguamento sismico dell’Ala Callegari presso la scuola secondaria di primo grado M. Montanari, nell’ambito del PNRR – Next Generation EU.",
        images: SCUOLA_MONTANARI_IMAGES,
      },
      {
        title: "Residenze universitarie LazioDisu",
        location: "Roma – Pietralata",
        client:
          "LAZIODISU – Ente per il diritto agli studi universitari nel Lazio",
        amount: "1.430.576,00 €",
        amountLabel: "Importo lavori",
        description:
          "Realizzazione di impianti di illuminazione per le residenze universitarie e servizi correlati presso l’area dello SDO di Pietralata.",
        images: RESIDENZE_UNIVERSITARIE_LAZIODISU_IMAGES,
      },
    ],
  },
  {
    id: "gruppo-immobiliare-properzi",
    name: "Imprese Riunite",
    fullName: "Imprese Riunite – Properzi Costruzioni Generali",
    role: "Management",
    description:
      "Imprese Riunite è l'entità manageriale che coordina e guida le società operative del gruppo. Nata dalla visione imprenditoriale di Pierluigi Properzi, dal 1976 rappresenta il punto di riferimento strategico-gestionale per le attività di Costruzioni Angelico e Nuova C.C.S., garantendo solidità, governance e sviluppo.",
    longDescription:
      "Non operativa direttamente, Imprese Riunite gestisce la coerenza strategica e la sinergia tra le aziende del gruppo. <strong>Il patrimonio della vecchia C.C.S. (Consulenze Costruzioni Speciali) rappresenta l'origine storica del gruppo.</strong>",
    admin: "Pierluigi Properzi",
    address: sharedOfficeAddress,
    phone: siteContact.phones[0].label,
    pec: "info@pec.impreseriunite.it",
    email: siteContact.publicEmail.label,
    highlights: [
      "Coordinamento e guida strategica",
      "Sinergia tra le società operative",
      "Solidità e governance del gruppo"
    ],
    certifications: [],
    projects: [
      {
        title: "Porto turistico Riva di Traiano",
        location: "Civitavecchia (RM)",
        client:
          "Porto Turistico Riva di Traiano S.p.A. (Privato)",
        amount: "",
        description:
          "Realizzazione del porto turistico in località ex scalo Matteuzzi, nel Comune di Civitavecchia. L'opera comprende la realizzazione di 1370 posti barca, 1400 posti auto, cantiere navale, circolo nautico, bar e ristoranti con relativi servizi e infrastrutture.",
        images: [rivaDiTraiano],
      },
      {
        title: "Ristrutturazione e consolidamento della Mole Antonelliana",
        location: "Torino",
        client: "Soc. Garboli Rep S.p.A. (Privato)",
        amount: "857.318,45 €",
        amountLabel: "Importo lavori",
        description:
          "Lavori di ristrutturazione e consolidamento delle strutture della Mole Antonelliana.",
        images: [moleAntonelliana],
      },
      {
        title: "Centro residenziale Le Felciarie",
        location: "Fiano Romano (RM)",
        client: "Immobil Fiano S.r.l. (Privato)",
        amount: "6.350.000,00 €",
        amountLabel: "Importo lavori",
        description:
          "Realizzazione del centro residenziale “Le Felciarie”, composto da 42 villini a Fiano Romano.",
        images: FIANO_LE_FELCIARIE_IMAGES,
      },
      {
        title: "Palazzina residenziale – Via Saronno",
        location: "Roma – Prima Porta",
        client: "Giustiniana Prima S.r.l. (Privato)",
        amount: "",
        description:
          "Realizzazione di una palazzina composta da 26 appartamenti, muniti di box e cantine in Via Saronno s.n.c., Roma.",
        images: GIUSTINIANA_IMAGES,
      },
      {
        title: "Facoltà di Ingegneria di Jeddah",
        location: "Jeddah – Arabia Saudita",
        client: "Committente internazionale (Privato)",
        amount: "",
        description:
          "Costruzione della Facoltà di Ingegneria nella città portuale saudita di Jeddah, opera realizzata dalla storica C.C.S.",
        images: JEDDAH_FACULTY_IMAGES,
      },
      {
        title: "Viadotto Muzdalifah",
        location: "La Mecca – Arabia Saudita",
        client: "Committente internazionale (Privato)",
        amount: "",
        description:
          "Realizzazione del Viadotto Muzdalifah, una delle opere infrastrutturali più prestigiose realizzate dalla storica C.C.S. a livello internazionale.",
        images: JEDDAH_OTHER_IMAGES.viadotto,
      },
      {
        title: "Raccordo Anulare – Lotto 2",
        location: "Riyadh – Arabia Saudita",
        client: "Committente internazionale (Privato)",
        amount: "",
        description:
          "Costruzione del secondo lotto del Raccordo Anulare nella capitale dell’Arabia Saudita, realizzato dalla storica C.C.S.",
        images: JEDDAH_OTHER_IMAGES.autostrada,
      }
    ],
  },
];

export const operatingCompanies = companies.filter(
  ({ id }) => id === "costruzioni-angelico" || id === "nuova-ccs"
);

export const certifiedCompanies = companies.filter(
  ({ certifications }) => certifications.length > 0
);

export const history = {
  intro:
    "La nostra storia trae origine dalla grinta e dalla perseveranza di Pierluigi Properzi.",
  timeline: [
    {
      year: "1976",
      title: "Fondazione C.C.S.",
      desc: "Da giovane geometra, a soli 18 anni, <strong>Pierluigi Properzi</strong> entra a far parte del prestigioso Gruppo Genghini. Diventando a soli 26 anni il più giovane dirigente della società, nel 1976 costituisce, insieme ad altri soci, la <strong>Consulenze Costruzioni Speciali (C.C.S.)</strong>. La società si compone di uno staff di manager, tecnici e maestranze altamente specializzate.",
      short: "A soli 26 anni, già dirigente del Gruppo Genghini, <strong>Pierluigi Properzi</strong> fonda con altri soci la <strong>Consulenze Costruzioni Speciali (C.C.S.)</strong>.",
    },
    {
      year: "1980",
      title: "Acquisizione Costruzioni Angelico",
      desc: "Pierluigi Properzi acquista la <strong>Costruzioni Angelico Edili Stradali</strong> e, grazie alla sua guida lungimirante, la porta in breve tempo ad imporsi nel panorama nazionale delle opere pubbliche.",
      short: "Properzi acquista <strong>Costruzioni Angelico Edili Stradali</strong>, portandola in breve tra i nomi di riferimento delle opere pubbliche.",
    },
    {
      year: "1997",
      title: "Nascita della Nuova C.C.S.",
      desc: "Dalla scissione del ramo d'azienda della C.C.S. e con la successiva annessione all'interno del Gruppo Immobiliare Properzi, nasce la <strong>Nuova C.C.S</strong> che focalizza le sue competenze sull' impiantistica elettrica.",
      short: "Dalla scissione del ramo d'azienda della C.C.S. nasce la <strong>Nuova C.C.S.</strong>, specializzata nell'impiantistica elettrica.",
    },
    {
      year: "Oggi",
      title: "La nuova era",
      desc: "Attualmente amministrata da <strong>Alfredo Mancinelli</strong>, la società riunisce un team dinamico di ingegneri, architetti e tecnici altamente specializzati. Competenze integrate e leadership familiare, eredità della famiglia Properzi, sono sostenute dalle principali certificazioni di settore, a <strong>garanzia di qualità, sicurezza, responsabilità sociale e solidità operativa</strong>.",
      short: "Guidata da <strong>Alfredo Mancinelli</strong>, la società negli ultimi anni si è specializzata nella realizzazione di strutture detentive, sedi istituzionali e infrastrutture strategiche per il paese.",
    },
  ],
};
