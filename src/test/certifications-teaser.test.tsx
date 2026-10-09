import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import CertificationsTeaser from "@/components/CertificationsTeaser";

describe("Homepage qualifications", () => {
  it("combines subjects and standards in pills linked to the details page", () => {
    render(<MemoryRouter><CertificationsTeaser /></MemoryRouter>);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Qualità ISO 9001" })).toHaveAttribute("href", "/certificazioni");
    expect(screen.getByRole("link", { name: "Appalti pubblici SOA" })).toHaveAttribute("href", "/certificazioni");
    expect(screen.getByRole("link", { name: "Scopri certificazioni e SOA" })).toHaveAttribute("href", "/certificazioni");
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
