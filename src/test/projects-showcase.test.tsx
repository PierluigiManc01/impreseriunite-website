import type { ReactNode } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Navbar from "@/components/Navbar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import { companies, operatingCompanies } from "@/data/companies";
import { calculateDesktopCarouselLayout } from "@/lib/project-carousel-layout";

vi.mock("@/components/ScrollReveal", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

const renderShowcase = () =>
  render(
    <MemoryRouter>
      <ProjectsShowcase />
    </MemoryRouter>
  );

const parseEuro = (amount: string) =>
  Number(amount.replace(" €", "").replace(/\./g, "").replace(",", "."));

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Navbar company links", () => {
  it("lists Imprese Riunite in desktop dropdown and mobile menu", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link", { name: "Imprese Riunite" });
    expect(links).toHaveLength(2);
    links.forEach((link) =>
      expect(link).toHaveAttribute(
        "href",
        "/azienda/gruppo-immobiliare-properzi"
      )
    );
  });
});

describe("ProjectsShowcase", () => {
  it("calculates centered alignment, viewport clamp, and end runway", () => {
    expect(
      calculateDesktopCarouselLayout({
        rowTop: 363,
        rowHeight: 174,
        trackTop: 112,
        trackHeight: 788,
        carouselHeight: 502,
        navbarBottom: 112,
        viewportHeight: 900,
        lastRowHeight: 133,
        isLastRowActive: true,
        boundaryBottom: 1200,
      })
    ).toEqual({ offset: 87, runway: 201 });

    expect(
      calculateDesktopCarouselLayout({
        rowTop: 80,
        rowHeight: 120,
        trackTop: 112,
        trackHeight: 788,
        carouselHeight: 502,
        navbarBottom: 112,
        viewportHeight: 900,
        lastRowHeight: 133,
        isLastRowActive: false,
        boundaryBottom: 1200,
      }).offset
    ).toBe(16);

    expect(
      calculateDesktopCarouselLayout({
        rowTop: 600,
        rowHeight: 160,
        trackTop: 112,
        trackHeight: 600,
        carouselHeight: 400,
        navbarBottom: 112,
        viewportHeight: 900,
        lastRowHeight: 160,
        isLastRowActive: false,
        boundaryBottom: 650,
      }).offset
    ).toBe(122);
  });

  it("expands active project facts and keeps company navigation separate", () => {
    renderShowcase();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Cantieri e risultati verificabili",
      })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Filtra per azienda per esplorare i cantieri del gruppo, con evidenza di luogo, committente e importi ove disponibili."
      )
    ).not.toBeInTheDocument();

    const facts = screen.getByTestId("desktop-project-facts");
    expect(within(facts).getByText("Committente")).toBeInTheDocument();
    expect(
      within(facts).getByText("ENAV S.p.A.")
    ).toBeInTheDocument();
    expect(within(facts).getByText("Importo lavori")).toBeInTheDocument();
    expect(within(facts).getByText("13.374.426,25 €")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Vai alla scheda di Costruzioni Angelico",
      })
    ).toHaveAttribute("href", "/azienda/costruzioni-angelico");

    const secondProject = screen.getByTestId("desktop-project-select-1");
    expect(secondProject).toHaveAttribute("aria-expanded", "false");
    fireEvent.mouseEnter(secondProject);
    secondProject.focus();
    expect(secondProject).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("desktop-project-select-0")).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    fireEvent.click(secondProject);
    expect(secondProject).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("desktop-project-select-0")).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("shows every project with its carousel and required facts", () => {
    renderShowcase();

    const cards = screen.getAllByTestId("mobile-project-card");
    expect(cards).toHaveLength(12);

    const firstCard = cards[0];
    expect(
      within(firstCard).getByRole("link", {
        name: "Nuova torre di controllo – Milano Linate",
      })
    ).toHaveAttribute("href", "/azienda/costruzioni-angelico");
    expect(within(firstCard).getByText("Committente")).toBeInTheDocument();
    expect(within(firstCard).getByText("Importo lavori")).toBeInTheDocument();
    expect(within(firstCard).getByText("13.374.426,25 €")).toBeInTheDocument();
    expect(within(firstCard).getByText("1 / 6")).toBeInTheDocument();
  });

  it("navigates a card carousel without autoplay controls", () => {
    renderShowcase();

    expect(
      screen.queryByRole("button", { name: "Pausa riproduzione automatica" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Riprendi riproduzione automatica" })
    ).not.toBeInTheDocument();

    const firstCard = screen.getAllByTestId("mobile-project-card")[0];
    const nextButton = within(firstCard).getByRole("button", { name: "Foto successiva" });
    nextButton.focus();
    expect(nextButton).toHaveFocus();
    fireEvent.click(nextButton);

    expect(within(firstCard).getByText("2 / 6")).toBeInTheDocument();
  });

  it("updates ENAV site labels with the active carousel image", () => {
    renderShowcase();

    const enavCard = screen
      .getAllByTestId("mobile-project-card")
      .find((card) =>
        within(card).queryByRole("link", {
          name: "Accordi quadro per i siti e i sistemi ENAV",
        })
      );

    expect(enavCard).toBeDefined();
    expect(within(enavCard!).getByTestId("project-image-label")).toHaveTextContent(
      "Bari"
    );

    const nextButton = within(enavCard!).getByRole("button", {
      name: "Foto successiva",
    });
    fireEvent.click(nextButton);
    expect(within(enavCard!).getByText("2 / 11")).toBeInTheDocument();
    expect(within(enavCard!).getByTestId("project-image-label")).toHaveTextContent(
      "Bari"
    );

    fireEvent.click(nextButton);
    expect(within(enavCard!).getByText("3 / 11")).toBeInTheDocument();
    expect(within(enavCard!).getByTestId("project-image-label")).toHaveTextContent(
      "Brindisi"
    );
  });

  it("filters mobile cards by operating company", () => {
    renderShowcase();

    fireEvent.click(screen.getByRole("button", { name: "Costruzioni Angelico" }));
    expect(screen.getAllByTestId("mobile-project-card")).toHaveLength(5);

    fireEvent.click(screen.getByRole("button", { name: "Nuova C.C.S." }));
    expect(screen.getAllByTestId("mobile-project-card")).toHaveLength(7);

    fireEvent.click(screen.getByRole("button", { name: "Tutte" }));
    expect(screen.getAllByTestId("mobile-project-card")).toHaveLength(12);
  });

  it("matches supplied project counts, totals, clients, and image galleries", () => {
    const angelico = operatingCompanies.find(
      ({ id }) => id === "costruzioni-angelico"
    );
    const nuovaCcs = operatingCompanies.find(({ id }) => id === "nuova-ccs");
    const holding = companies.find(
      ({ id }) => id === "gruppo-immobiliare-properzi"
    );

    expect(angelico?.projects).toHaveLength(5);
    expect(nuovaCcs?.projects).toHaveLength(7);
    expect(holding?.projects).toHaveLength(7);

    expect(new Set(angelico?.projects.map(({ client }) => client))).toHaveLength(4);
    expect(new Set(nuovaCcs?.projects.map(({ client }) => client))).toHaveLength(6);

    expect(
      angelico?.projects.reduce((total, { amount }) => total + parseEuro(amount), 0)
    ).toBeCloseTo(30_778_018.73, 2);
    expect(
      nuovaCcs?.projects.reduce((total, { amount }) => total + parseEuro(amount), 0)
    ).toBeCloseTo(20_025_872.73, 2);

    const montanariProject = nuovaCcs?.projects.find(({ title }) =>
      title.includes("Scuola M. Montanari")
    );
    expect(montanariProject?.images).toHaveLength(7);
    expect(
      montanariProject?.images.every((image) =>
        image.startsWith("/assets/projects/scuola-montanari-ravenna/")
      )
    ).toBe(true);

    const scafaProject = angelico?.projects.find(
      ({ title }) => title === "Casa della Comunità di Scafa"
    );
    expect(scafaProject?.images).toHaveLength(7);
    expect(
      scafaProject?.images.every((image) =>
        image.startsWith("/assets/projects/casa-comunita-scafa/")
      )
    ).toBe(true);

    const fianoProject = holding?.projects.find(
      ({ title }) => title === "Centro residenziale Le Felciarie"
    );
    expect(fianoProject?.images).toHaveLength(5);
    expect(
      fianoProject?.images.every((image) =>
        image.startsWith("/assets/projects/fiano-le-felciarie/")
      )
    ).toBe(true);
    expect(
      operatingCompanies
        .flatMap(({ projects }) => projects)
        .some(({ title }) => title === "Centro residenziale Le Felciarie")
    ).toBe(false);

    const palazzoFarneseProject = nuovaCcs?.projects.find(
      ({ title }) => title === "Palazzo Farnese di Caprarola"
    );
    expect(palazzoFarneseProject?.client).toBe("Ministero della Cultura");
    expect(palazzoFarneseProject?.amount).toBe("350.000,00 €");
    expect(palazzoFarneseProject?.images).toHaveLength(8);
    expect(
      palazzoFarneseProject?.images.every((image) =>
        image.startsWith("/assets/projects/palazzo-farnese/")
      )
    ).toBe(true);

    const linateProject = angelico?.projects.find(
      ({ title }) => title === "Nuova torre di controllo – Milano Linate"
    );
    expect(linateProject?.images).toHaveLength(6);
    expect(
      linateProject?.images.every((image) =>
        image.startsWith("/assets/projects/linate-torre-controllo/")
      )
    ).toBe(true);

    const aterProject = angelico?.projects.find(
      ({ title }) => title === "Riqualificazione Case popolari ATER"
    );
    expect(aterProject?.images).toHaveLength(11);
    expect(
      aterProject?.images.every((image) =>
        image.startsWith("/assets/projects/ater-civitavecchia/")
      )
    ).toBe(true);

    const cremonaProject = nuovaCcs?.projects.find(
      ({ title }) => title === "Nuovo padiglione detentivo – Cremona"
    );
    expect(cremonaProject?.images).toHaveLength(9);
    expect(
      cremonaProject?.images.every((image) =>
        image.startsWith("/assets/projects/casa-circondariale-cremona/")
      )
    ).toBe(true);

    const rebibbiaProject = nuovaCcs?.projects.find(({ title }) =>
      title.includes("Rebibbia")
    );
    expect(rebibbiaProject?.images).toHaveLength(7);
    expect(
      rebibbiaProject?.images.every((image) =>
        image.startsWith("/assets/projects/rebibbia-laboratorio-dna/")
      )
    ).toBe(true);

    const laziodisuGallery = nuovaCcs?.projects.find(
      ({ client }) => client.startsWith("LAZIODISU")
    );
    expect(laziodisuGallery?.images).toHaveLength(3);
    expect(
      laziodisuGallery?.images.every((image) =>
        image.startsWith("/assets/projects/residenze-universitarie-laziodisu/")
      )
    ).toBe(true);

    const auleBunkerProject = angelico?.projects.find(({ title }) =>
      title.includes("Aule Bunker")
    );
    expect(auleBunkerProject?.images).toHaveLength(8);
    expect(
      auleBunkerProject?.images.every((image) =>
        image.startsWith("/assets/projects/aule-bunker/")
      )
    ).toBe(true);

    const latinaProject = nuovaCcs?.projects.find(
      ({ title }) => title === "Cittadella Giudiziaria di Latina"
    );
    expect(latinaProject?.images).toHaveLength(5);
    expect(
      latinaProject?.images.every((image) =>
        image.startsWith("/assets/projects/latina-cittadella-giudiziaria/")
      )
    ).toBe(true);

    const enavProject = angelico?.projects.find(
      ({ title }) => title === "Accordi quadro per i siti e i sistemi ENAV"
    );
    expect(enavProject?.images).toHaveLength(11);
    expect(
      enavProject?.images.every((image) =>
        image.startsWith("/assets/projects/enav-accordo-quadro/")
      )
    ).toBe(true);
    expect(enavProject?.imageLabels).toEqual([
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
    ]);

    expect(
      operatingCompanies
        .flatMap(({ projects }) => projects)
        .filter(
          ({ title }) =>
            !title.includes("Scuola M. Montanari") &&
            title !== "Casa della Comunità di Scafa" &&
            !title.includes("Ronchi dei Legionari") &&
            title !== "Nuova torre di controllo – Milano Linate" &&
            !title.startsWith("Riqualificazione Case popolari") &&
            title !== "Nuovo padiglione detentivo – Cremona" &&
            !title.includes("Rebibbia") &&
            !title.startsWith("Residenze universitarie") &&
            !title.includes("Aule Bunker") &&
            title !== "Cittadella Giudiziaria di Latina" &&
            title !== "Accordi quadro per i siti e i sistemi ENAV" &&
            !title.includes("Palazzo Farnese di Caprarola")
        )
        .every(({ images }) => images.length === 2)
    ).toBe(true);
    expect(
      holding?.projects.every(({ images }) => images.length > 0)
    ).toBe(true);
    expect(
      operatingCompanies
        .flatMap(({ projects }) => projects)
        .filter(({ featuredOnHomepage }) => featuredOnHomepage)
        .map(({ title }) => title)
    ).toEqual([
      "Nuova torre di controllo – Milano Linate",
      "Nuovo padiglione detentivo – Cremona",
      "Palazzo Farnese di Caprarola",
    ]);

    const laziodisuProject = nuovaCcs?.projects.find(
      ({ client }) => client.startsWith("LAZIODISU")
    );
    expect(laziodisuProject?.title).toBe("Residenze universitarie LazioDisu");
    expect(laziodisuProject?.description).toContain(
      "Realizzazione di impianti di illuminazione"
    );

    expect(
      aterProject?.details?.[0].value
    ).toContain("mandataria");
    expect(
      angelico?.projects.find(({ client }) => client === "ASL di Pescara")
        ?.newsUrl
    ).toBe(
      "https://www.asl.pe.it/Sezione.jsp?titolo=comunicato-stampa---inaugurata-la-casa-della-comunit%C3%A0-hub-di-scafa&idSezione=2139"
    );
    expect(holding?.projects.map(({ title }) => title)).toEqual([
      "Porto turistico Riva di Traiano",
      "Ristrutturazione e consolidamento della Mole Antonelliana",
      "Facoltà di Ingegneria di Jeddah",
      "Centro residenziale Le Felciarie",
      "Viadotto Muzdalifah",
      "Raccordo Anulare – Lotto 2",
      "Palazzina residenziale – Via Saronno",
    ]);
    expect(
      holding?.projects
        .find(({ title }) => title.includes("Mole Antonelliana"))
        ?.images[0]
    ).toContain("mole-antonelliana");
    expect(
      holding?.projects
        .find(({ title }) => title === "Porto turistico Riva di Traiano")
        ?.images[0]
    ).toContain("riva-di-traiano");
    expect(
      holding?.projects.find(
        ({ title }) => title === "Facoltà di Ingegneria di Jeddah"
      )?.images
    ).toEqual([
      "/assets/projects/jeddah/01-facciata-principale.webp",
      "/assets/projects/jeddah/02-facolta-ingegneria.webp",
      "/assets/projects/jeddah/03-campus-king-abdulaziz.webp",
      "/assets/projects/jeddah/04-edificio-campus.webp",
    ]);
  });
});
