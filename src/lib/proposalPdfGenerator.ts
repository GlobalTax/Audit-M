import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProposalData } from '@/types/proposal';
import { proposalContent } from './proposalTemplates';

// NRRO Colors
const COLORS = {
  black: '#000000',
  gold: '#C9A962',
  darkGray: '#333333',
  lightGray: '#F5F5F5',
  mediumGray: '#666666',
  white: '#FFFFFF',
};

// Helper to convert hex to RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : { r: 0, g: 0, b: 0 };
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
const formatDate = (dateStr: string, lang: 'en' | 'es') => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const generateProposalPDF = (data: ProposalData): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const content = proposalContent[data.language];
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let currentY = margin;

  // Helper functions
  const addHeader = () => {
    // Black header bar
    const black = hexToRgb(COLORS.black);
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(0, 0, pageWidth, 25, 'F');
    
    // NRRO text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('NRRO', margin, 16);
    
    // International badge
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('INTERNATIONAL', margin + 25, 16);
    
    // Gold line under header
    const gold = hexToRgb(COLORS.gold);
    doc.setFillColor(gold.r, gold.g, gold.b);
    doc.rect(0, 25, pageWidth, 1, 'F');
  };

  const addFooter = (pageNum: number, totalPages: number) => {
    const gray = hexToRgb(COLORS.mediumGray);
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    
    doc.text(content.footer, margin, pageHeight - 10);
    doc.text(`${pageNum} / ${totalPages}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
  };

  const addSectionTitle = (title: string, y: number) => {
    const black = hexToRgb(COLORS.black);
    doc.setTextColor(black.r, black.g, black.b);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, y);
    
    // Gold underline
    const gold = hexToRgb(COLORS.gold);
    doc.setDrawColor(gold.r, gold.g, gold.b);
    doc.setLineWidth(0.5);
    doc.line(margin, y + 2, margin + 40, y + 2);
    
    return y + 12;
  };

  const addBodyText = (text: string, y: number, maxWidth: number = contentWidth) => {
    const gray = hexToRgb(COLORS.darkGray);
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, margin, y);
    return y + (lines.length * 5);
  };

  // === PAGE 1: Cover ===
  addHeader();
  
  // Cover content centered
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(content.title, contentWidth);
  doc.text(titleLines, pageWidth / 2, 100, { align: 'center' });
  
  // Gold line
  const gold = hexToRgb(COLORS.gold);
  doc.setDrawColor(gold.r, gold.g, gold.b);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 30, 115, pageWidth / 2 + 30, 115);
  
  // Subtitle
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(content.subtitle, pageWidth / 2, 130, { align: 'center' });
  
  // Client info box
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, 160, contentWidth, 50, 3, 3, 'F');
  
  doc.setFontSize(10);
  const gray = hexToRgb(COLORS.mediumGray);
  doc.setTextColor(gray.r, gray.g, gray.b);
  doc.text(data.language === 'en' ? 'Prepared for:' : 'Preparado para:', margin + 10, 175);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(data.companyName, margin + 10, 188);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(data.clientName, margin + 10, 198);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(gray.r, gray.g, gray.b);
  doc.text(formatDate(data.proposalDate, data.language), pageWidth / 2, 240, { align: 'center' });
  doc.text(`Ref: ${data.proposalNumber}`, pageWidth / 2, 248, { align: 'center' });
  
  addFooter(1, 6);

  // === PAGE 2: About NRRO ===
  doc.addPage();
  addHeader();
  currentY = 40;
  
  currentY = addSectionTitle(content.aboutTitle, currentY);
  currentY = addBodyText(content.aboutText, currentY);
  
  currentY += 15;
  currentY = addSectionTitle(content.credentialsTitle, currentY);
  
  content.credentials.forEach((cred, i) => {
    const goldRgb = hexToRgb(COLORS.gold);
    doc.setFillColor(goldRgb.r, goldRgb.g, goldRgb.b);
    doc.circle(margin + 3, currentY - 1.5, 2, 'F');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(cred, margin + 10, currentY);
    currentY += 8;
  });
  
  addFooter(2, 6);

  // === PAGE 3: Services ===
  doc.addPage();
  addHeader();
  currentY = 40;
  
  currentY = addSectionTitle(content.servicesTitle, currentY);
  
  data.selectedServices.forEach((service, index) => {
    if (currentY > 240) {
      doc.addPage();
      addHeader();
      currentY = 40;
    }
    
    // Service title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(data.language === 'en' ? service.name : service.nameEs, margin, currentY);
    currentY += 7;
    
    // Service description
    currentY = addBodyText(
      data.language === 'en' ? service.description : service.descriptionEs,
      currentY
    );
    currentY += 10;
  });
  
  addFooter(3, 6);

  // === PAGE 4: Economic Proposal ===
  doc.addPage();
  addHeader();
  currentY = 40;
  
  currentY = addSectionTitle(content.economicProposalTitle, currentY);
  currentY += 5;
  
  // Services table
  const tableData = data.selectedServices.map(service => [
    data.language === 'en' ? service.name : service.nameEs,
    service.isOneTime 
      ? (data.language === 'en' ? 'One-time fee' : 'Pago único')
      : (data.language === 'en' ? 'Monthly retainer' : 'Retención mensual'),
    service.isOneTime ? '-' : formatCurrency(service.monthlyFee),
    service.isOneTime 
      ? formatCurrency(service.monthlyFee)
      : formatCurrency(service.annualFee || service.monthlyFee * 12),
  ]);
  
  // Total row
  const totalMonthly = data.selectedServices
    .filter(s => !s.isOneTime)
    .reduce((sum, s) => sum + s.monthlyFee, 0);
  const totalAnnual = data.selectedServices
    .reduce((sum, s) => sum + (s.annualFee || s.monthlyFee * (s.isOneTime ? 1 : 12)), 0);
  
  tableData.push([
    'TOTAL',
    '',
    formatCurrency(totalMonthly),
    formatCurrency(totalAnnual),
  ]);
  
  autoTable(doc, {
    startY: currentY,
    head: [[
      content.tableHeaders.service,
      content.tableHeaders.description,
      content.tableHeaders.monthlyFee,
      content.tableHeaders.annualFee,
    ]],
    body: tableData,
    theme: 'plain',
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 50 },
      2: { cellWidth: 35, halign: 'right' },
      3: { cellWidth: 35, halign: 'right' },
    },
    didParseCell: (data) => {
      // Style the total row
      if (data.row.index === tableData.length - 1) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fillColor = [201, 169, 98];
        data.cell.styles.textColor = [0, 0, 0];
      }
    },
  });
  
  // Terms
  currentY = (doc as any).lastAutoTable.finalY + 20;
  
  if (currentY < 220) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(content.termsTitle, margin, currentY);
    currentY += 8;
    
    const terms = data.paymentTerms || content.defaultTerms;
    currentY = addBodyText(terms, currentY);
    
    // Validity note
    currentY += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`${content.validityNote} ${formatDate(data.validUntil, data.language)}`, margin, currentY);
  }
  
  addFooter(4, 6);

  // === PAGE 5: Why NRRO ===
  doc.addPage();
  addHeader();
  currentY = 40;
  
  currentY = addSectionTitle(content.whyNrroTitle, currentY);
  currentY += 5;
  
  content.whyNrro.forEach((item, index) => {
    // Number circle
    const goldRgb = hexToRgb(COLORS.gold);
    doc.setFillColor(goldRgb.r, goldRgb.g, goldRgb.b);
    doc.circle(margin + 5, currentY + 3, 5, 'F');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(String(index + 1), margin + 3.5, currentY + 5);
    
    // Title
    doc.setFontSize(12);
    doc.text(item.title, margin + 15, currentY + 5);
    currentY += 10;
    
    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const descLines = doc.splitTextToSize(item.description, contentWidth - 15);
    doc.text(descLines, margin + 15, currentY);
    currentY += descLines.length * 5 + 12;
  });
  
  addFooter(5, 6);

  // === PAGE 6: Next Steps & Contact ===
  doc.addPage();
  addHeader();
  currentY = 40;
  
  currentY = addSectionTitle(content.nextStepsTitle, currentY);
  currentY += 5;
  
  content.nextSteps.forEach((step, index) => {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`${index + 1}.`, margin, currentY);
    
    doc.setFont('helvetica', 'normal');
    doc.text(step, margin + 10, currentY);
    currentY += 10;
  });
  
  currentY += 20;
  currentY = addSectionTitle(content.contactTitle, currentY);
  currentY += 5;
  
  // Contact box
  doc.setFillColor(0, 0, 0);
  doc.roundedRect(margin, currentY, contentWidth, 45, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const contactY = currentY + 12;
  doc.text(content.contactInfo.address, margin + 10, contactY);
  doc.text(content.contactInfo.phone, margin + 10, contactY + 10);
  doc.text(content.contactInfo.email, margin + 10, contactY + 20);
  
  const goldText = hexToRgb(COLORS.gold);
  doc.setTextColor(goldText.r, goldText.g, goldText.b);
  doc.setFont('helvetica', 'bold');
  doc.text(content.contactInfo.web, pageWidth - margin - 10, contactY + 10, { align: 'right' });
  
  // Additional notes if any
  if (data.additionalNotes) {
    currentY += 60;
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    const noteLines = doc.splitTextToSize(data.additionalNotes, contentWidth);
    doc.text(noteLines, margin, currentY);
  }
  
  addFooter(6, 6);

  return doc;
};

export const downloadProposalPDF = (data: ProposalData) => {
  const doc = generateProposalPDF(data);
  const fileName = `NRRO_Proposal_${data.companyName.replace(/\s+/g, '_')}_${data.proposalNumber}.pdf`;
  doc.save(fileName);
};
