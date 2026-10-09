import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CompanyDocuments from "@/components/CompanyDocuments";
import { certifiedCompanies } from "@/data/companies";

describe("Company documents", () => {
  it.each(certifiedCompanies)("distinguishes certifications, ratings, policies and qualifications for $name", (company) => {
    render(<CompanyDocuments company={company} />);
    const management = screen.getByRole("region", { name: "Sistemi di gestione" });
    expect(within(management).queryByText("ISO 14000")).not.toBeInTheDocument();
    expect(within(management).getByText("ISO 14001")).toBeInTheDocument();
    expect(within(management).queryByText("SOA")).not.toBeInTheDocument();
    const policies = screen.getByRole("region", { name: "Politiche aziendali" });
    expect(within(policies).getByText("Politica per la Parità di Genere")).toBeInTheDocument();
    expect(within(policies).queryByText("Certificazione")).not.toBeInTheDocument();
    const social = screen.getByRole("region", { name: "Sociale / ESG" });
    expect(within(social).getByText("Rating")).toBeInTheDocument();
    const soa = screen.getByRole("region", { name: "Qualificazioni SOA" });
    for (const category of company.soaCategories ?? []) {
      expect(within(soa).getByText(category.code.replace(/\s+/g, ""), { exact: true })).toBeInTheDocument();
    }
    expect(screen.getAllByRole("link")).toHaveLength(company.certifications.length);
  });

});
