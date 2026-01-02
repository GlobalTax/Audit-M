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
    descripcion: "Over 300 family businesses and corporate groups trust Navarro."
  },
  {
    categoria: "Projects",
    valor: "500+",
    descripcion: "Restructuring, succession, and M&A operations successfully completed."
  },
  {
    categoria: "Years of Experience",
    valor: "25+",
    descripcion: "A solid track record supporting family businesses in their growth."
  },
  {
    categoria: "Team",
    valor: "70+",
    descripcion: "Attorneys and professionals specializing in tax, corporate, labour, and M&A."
  },
  {
    categoria: "Commitment",
    valor: "100%",
    descripcion: "Full dedication to every engagement, with technical rigor and confidentiality."
  },
  {
    categoria: "M&A Transactions",
    valor: "100+",
    descripcion: "Buy-side and sell-side mandates advised with an integrated approach."
  }
];

export const useHomeDatos = (language: string = 'es') => {
  const { data: contentData, isLoading } = usePageContent('home', 'datos', language);
  
  const datos: DatoItem[] = contentData && contentData.length > 0
    ? (contentData[0].content as any).items
    : DEFAULT_DATOS;
  
  return { datos, isLoading };
};
