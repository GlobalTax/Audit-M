import Papa from 'papaparse';
import * as XLSX from 'xlsx';

// Generic export functions remain for potential future use

export const exportToCSV = (data: any[], filename: string) => {
  const csv = Papa.unparse(data, {
    header: true,
  });

  // Add UTF-8 BOM for proper Excel display
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToExcel = (data: any[], filename: string) => {
  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Export');

  // Generate Excel file and trigger download
  XLSX.writeFile(workbook, filename);
};
