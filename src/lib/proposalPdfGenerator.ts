import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ProposalData } from '@/types/proposal';
import { proposalContent } from './proposalTemplates';

const COLORS = {
  black: '#000000',
  gold: '#C9A962',
  darkGray: '#333333',
  lightGray: '#F5F5F5',
  mediumGray: '#666666',
  white: '#FFFFFF',
};

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : { r: 0, g: 0, b: 0 };
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateStr: string, lang: 'en' | 'es' | 'ca') => {
  const date = new Date(dateStr);
  const locale = lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES';
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

const getServiceName = (service: any, lang: 'en' | 'es' | 'ca') => {
  if (lang === 'ca') return service.nameCa || service.nameEs;
  if (lang === 'en') return service.name;
  return service.nameEs;
};

const getServiceDescription = (service: any, lang: 'en' | 'es' | 'ca') => {
  if (lang === 'ca') return service.descriptionCa || service.descriptionEs;
  if (lang === 'en') return service.description;
  return service.descriptionEs;
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

  const addHeader = () => {
    const black = hexToRgb(COLORS.black);
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(0, 0, pageWidth, 25, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(content.companyName.toUpperCase(), margin, 16);

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

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(content.title, contentWidth);
  doc.text(titleLines, pageWidth / 2, 100, { align: 'center' });

  const gold = hexToRgb(COLORS.gold);
  doc.setDrawColor(gold.r, gold.g, gold.b);
  doc.setLineWidth(1);
  doc.line(pageWidth / 2 - 30, 115, pageWidth / 2 + 30, 115);

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(content.subtitle, pageWidth / 2, 130, { align: 'center' });

  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, 160, contentWidth, 50, 3, 3, 'F');

  doc.setFontSize(10);
  const gray = hexToRgb(COLORS.mediumGray);
  doc.setTextColor(gray.r, gray.g, gray.b);
  const preparedLabel = data.language === 'en' ? 'Prepared for:' : data.language === 'ca' ? 'Preparat per a:' : 'Preparado para:';
  doc.text(preparedLabel, margin + 10, 175);

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(data.companyName, margin + 10, 188);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(data.clientName, margin + 10, 198);

  doc.setFontSize(10);
  doc.setTextColor(gray.r, gray.g, gray.b);
  doc.text(formatDate(data.proposalDate, data.language), pageWidth / 2, 240, { align: 'center' });
  doc.text(`Ref: ${data.proposalNumber}`, pageWidth / 2, 248, { align: 'center' });

  addFooter(1, 6);

  // === PAGE 2: About ===
  doc.addPage();
  addHeader();
  currentY = 40;

  currentY = addSectionTitle(content.aboutTitle, currentY);
  currentY = addBodyText(content.aboutText, currentY);

  currentY += 15;
  currentY = addSectionTitle(content.credentialsTitle, currentY);

  content.credentials.forEach((cred) => {
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

  data.selectedServices.forEach((service) => {
    if (currentY > 240) {
      doc.addPage();
      addHeader();
      currentY = 40;
    }

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(getServiceName(service, data.language), margin, currentY);
    currentY += 7;

    currentY = addBodyText(
      getServiceDescription(service, data.language),
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

  const oneTimeLabel = data.language === 'en' ? 'One-time fee' : data.language === 'ca' ? 'Pagament únic' : 'Pago único';
  const retainerLabel = data.language === 'en' ? 'Monthly retainer' : data.language === 'ca' ? 'Retenció mensual' : 'Retención mensual';

  const tableData = data.selectedServices.map(service => [
    getServiceName(service, data.language),
    service.isOneTime ? oneTimeLabel : retainerLabel,
    service.isOneTime ? '-' : formatCurrency(service.monthlyFee),
    service.isOneTime
      ? formatCurrency(service.monthlyFee)
      : formatCurrency(service.annualFee || service.monthlyFee * 12),
  ]);

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
      if (data.row.index === tableData.length - 1) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fillColor = [201, 169, 98];
        data.cell.styles.textColor = [0, 0, 0];
      }
    },
  });

  currentY = (doc as any).lastAutoTable.finalY + 20;

  if (currentY < 220) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(content.termsTitle, margin, currentY);
    currentY += 8;

    const terms = data.paymentTerms || content.defaultTerms;
    currentY = addBodyText(terms, currentY);

    currentY += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text(`${content.validityNote} ${formatDate(data.validUntil, data.language)}`, margin, currentY);
  }

  addFooter(4, 6);

  // === PAGE 5: Why Us ===
  doc.addPage();
  addHeader();
  currentY = 40;

  currentY = addSectionTitle(content.whyUsTitle, currentY);
  currentY += 5;

  content.whyUs.forEach((item, index) => {
    const goldRgb = hexToRgb(COLORS.gold);
    doc.setFillColor(goldRgb.r, goldRgb.g, goldRgb.b);
    doc.circle(margin + 5, currentY + 3, 5, 'F');

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(String(index + 1), margin + 3.5, currentY + 5);

    doc.setFontSize(12);
    doc.text(item.title, margin + 15, currentY + 5);
    currentY += 10;

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
  const companyName = proposalContent[data.language].companyName;
  const fileName = `${companyName}_Propuesta_${data.companyName.replace(/\s+/g, '_')}_${data.proposalNumber}.pdf`;
  doc.save(fileName);
};
