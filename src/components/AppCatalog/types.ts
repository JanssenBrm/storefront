export type AppCatalogProps = {
  appsToDisplay: CatalogAppDetails[];
  catalogMode?: "marketplace" | "publisher";
};

export type CatalogAppDetails = {
  summary: string;
  id: number;
  labels: string[];
  logo: string;
  name: string;
  publisher: string;
};
