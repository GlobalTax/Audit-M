import { usePageContent } from './usePageContent';

interface DatoItem {
  categoria: string;
  valor: string;
  descripcion: string;
}

const DEFAULT_DATOS: DatoItem[] = [
  {
    categoria: "Clients",
    valor: "300+",
    descripcion: "Over 300 companies trust Audit for their audit needs."
  },
  {
    categoria: "Audits Completed",
    valor: "500+",
    descripcion: "Statutory audits, due diligence, and ESG verification engagements."
  },
  {
    categoria: "Years of Experience",
    valor: "25+",
    descripcion: "A solid track record providing independent audit services."
  },
  {
    categoria: "Team",
    valor: "50+",
    descripcion: "Certified auditors specializing in financial audit, DD, and ESG."
  },
  {
    categoria: "Independence",
    valor: "100%",
    descripcion: "Complete objectivity in every audit engagement."
  },
  {
    categoria: "International Clients",
    valor: "40%",
    descripcion: "Subsidiaries of multinational groups audited annually."
  }
];

export const useHomeDatos = (language: string = 'es') => {
  const { data: contentData, isLoading } = usePageContent('home', 'datos', language);
  
  const datos: DatoItem[] = contentData && contentData.length > 0
    ? (contentData[0].content as any).items
    : DEFAULT_DATOS;
  
  return { datos, isLoading };
};
