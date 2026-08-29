import { history } from "@/data/companies";
import jeddah from "@/assets/04-edificio-campus.webp";
import rivaDiTraiano from "@/assets/riva-di-traiano.webp";
import dataCenter from "@/assets/data_center.jpg";

type ChapterVisual =
  | {
      kind: "image";
      src: string;
      alt: string;
      caption: string;
    }
  | {
      kind: "certifications";
      caption: string;
    };

export type StoryChapter = {
  year: string;
  milestone: string;
  historyText: string;
  historyShort: string;
  capabilityText: string;
  capabilityShort: string;
  visual: ChapterVisual;
};

export const storyChapters: StoryChapter[] = [
  {
    year: history.timeline[0].year,
    milestone: history.timeline[0].title,
    historyText: history.timeline[0].desc,
    historyShort: history.timeline[0].short ?? history.timeline[0].desc,
    capabilityText:
      "Il gruppo opera nelle grandi opere civili, stradali e idrauliche, a livello nazionale e soprattutto internazionale. Ne sono esempi le opere realizzate in <strong>Arabia Saudita</strong>, tra cui il Viadotto Muzdalifah, il Raccordo Anulare di Riyadh e la Facoltà di Ingegneria di Jeddah.",
    capabilityShort:
      "Dalle origini, grandi opere civili, stradali e idrauliche in <strong>Arabia Saudita</strong> e in Italia.",
    visual: {
      kind: "image",
      src: jeddah,
      alt: "Facoltà di Ingegneria di Jeddah, Arabia Saudita",
      caption: "Consulenze Costruzioni Speciali (C.C.S.)",
    },
  },
  {
    year: history.timeline[1].year,
    milestone: history.timeline[1].title,
    historyText: history.timeline[1].desc,
    historyShort: history.timeline[1].short ?? history.timeline[1].desc,
    capabilityText:
      "Tra le realizzazioni più notevoli, spiccano la ristrutturazione della <strong>Mole Antonelliana</strong> a Torino, il <strong>Porto Turistico Riva di Traiano</strong> a Civitavecchia e la realizzazione di infrastrutture per il settore della difesa e della sicurezza.",
    capabilityShort:
      "Costruzioni Angelico diventa riferimento per istituzioni, strutture detentive e infrastrutture nazionali.",
    visual: {
      kind: "image",
      src: rivaDiTraiano,
      alt: "Veduta aerea del Porto Turistico Riva di Traiano a Civitavecchia",
      caption: "Porto Turistico, Civitavecchia",
    },
  },
  {
    year: history.timeline[2].year,
    milestone: history.timeline[2].title,
    historyText: history.timeline[2].desc,
    historyShort: history.timeline[2].short ?? history.timeline[2].desc,
    capabilityText:
      "La società si impone come leader del settore per la realizzazione di <strong>impianti fotovoltaici</strong>, gruppi elettrogeni e di continuità, cabine di trasformazione MT/BT, sicurezza, illuminazione e autonomia industriale.",
    capabilityShort:
      "La società si impone come leader nell'installazione di impianti <strong>fotovoltaici</strong>, sicurezza e illuminazione e di cabine MT/BT.",
    visual: {
      kind: "image",
      src: dataCenter,
      alt: "Impiantistica avanzata in un data center",
      caption: "Nuova C.C.S.",
    },
  },
  {
    year: history.timeline[3].year,
    milestone: history.timeline[3].title,
    historyText: history.timeline[3].desc,
    historyShort: history.timeline[3].short ?? history.timeline[3].desc,
    capabilityText:
      "Negli ultimi anni il gruppo ha dato vita ad un nuova fase di collaborazioni con <strong>Roma Capitale, Ministeri della Giustizia e della Difesa ed ENAV</strong> per la realizzazione di strutture detentive, sedi istituzionali e infrastrutture strategiche per il paese.",
    capabilityShort:
      "Team specializzato e standard <strong>certificati per qualità, sicurezza e responsabilità sociale</strong>.",
    visual: {
      kind: "certifications",
      caption: "Standard di gruppo",
    },
  },
];
