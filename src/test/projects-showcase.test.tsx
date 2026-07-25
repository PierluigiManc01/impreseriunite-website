import type { ReactNode } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ProjectsShowcase from "@/components/ProjectsShowcase";

vi.mock("@/components/ScrollReveal", () => ({
  default: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

const renderShowcase = () =>
  render(
    <MemoryRouter>
      <ProjectsShowcase />
    </MemoryRouter>
  );

describe("ProjectsShowcase mobile cards", () => {
  it("uses compact page copy and prominent desktop project facts", () => {
    renderShowcase();

    expect(
      screen.getByRole("heading", { name: "Cantieri e risultati verificabili" })
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Filtra per azienda per esplorare i cantieri del gruppo, con evidenza di luogo, committente e importi ove disponibili."
      )
    ).not.toBeInTheDocument();

    const facts = screen.getByTestId("desktop-project-facts");
    expect(within(facts).getByText("Committente")).toBeInTheDocument();
    expect(
      within(facts).getByText(
        "Ministero Grazia e Giustizia – Dipartimento Amministrazione Penitenziaria"
      )
    ).toBeInTheDocument();
    expect(within(facts).getByText("Importo")).toBeInTheDocument();
    expect(within(facts).getByText("8.454.874,99 €")).toBeInTheDocument();
  });

  it("shows every project with its carousel and required facts", () => {
    renderShowcase();

    const cards = screen.getAllByTestId("mobile-project-card");
    expect(cards).toHaveLength(8);

    const firstCard = cards[0];
    expect(
      within(firstCard).getByRole("link", { name: "Padiglione Detentivo Ariano Irpino" })
    ).toHaveAttribute("href", "/azienda/costruzioni-angelico");
    expect(within(firstCard).getByText("Committente")).toBeInTheDocument();
    expect(within(firstCard).getByText("Importo")).toBeInTheDocument();
    expect(within(firstCard).getByText("8.454.874,99 €")).toBeInTheDocument();
    expect(within(firstCard).getByText("1 / 2")).toBeInTheDocument();
  });

  it("navigates a card carousel without autoplay controls", () => {
    renderShowcase();

    const firstCard = screen.getAllByTestId("mobile-project-card")[0];
    const nextButton = within(firstCard).getByRole("button", { name: "Foto successiva" });
    nextButton.focus();
    expect(nextButton).toHaveFocus();
    fireEvent.click(nextButton);

    expect(within(firstCard).getByText("2 / 2")).toBeInTheDocument();
  });

  it("filters mobile cards by operating company", () => {
    renderShowcase();

    fireEvent.click(screen.getByRole("button", { name: "Costruzioni Angelico" }));
    expect(screen.getAllByTestId("mobile-project-card")).toHaveLength(3);

    fireEvent.click(screen.getByRole("button", { name: "Nuova C.C.S." }));
    expect(screen.getAllByTestId("mobile-project-card")).toHaveLength(5);

    fireEvent.click(screen.getByRole("button", { name: "Tutte" }));
    expect(screen.getAllByTestId("mobile-project-card")).toHaveLength(8);
  });
});
