import jsPDF from 'jspdf';
import { PresentationData } from '@/types/corporatePresentation';
import { presentationContent } from './corporatePresentationContent';

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

// Format date
const formatDate = (dateStr: string, lang: 'en' | 'es') => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === 'en' ? 'en-GB' : 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const generateCorporatePresentationPDF = (data: PresentationData): jsPDF => {
  const isLandscape = data.format === 'landscape';
  
  const doc = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const content = presentationContent[data.language];
  const pageWidth = isLandscape ? 297 : 210;
  const pageHeight = isLandscape ? 210 : 297;
  const margin = isLandscape ? 15 : 20;
  const contentWidth = pageWidth - (margin * 2);
  let currentY = margin;
  let pageNum = 0;
  const totalPages = countPages(data);

  // Helper functions
  const addHeader = () => {
    const black = hexToRgb(COLORS.black);
    doc.setFillColor(black.r, black.g, black.b);
    doc.rect(0, 0, pageWidth, isLandscape ? 18 : 25, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(isLandscape ? 12 : 14);
    doc.setFont('helvetica', 'bold');
    doc.text('NRRO', margin, isLandscape ? 12 : 16);
    
    doc.setFontSize(isLandscape ? 7 : 8);
    doc.setFont('helvetica', 'normal');
    doc.text('INTERNATIONAL', margin + (isLandscape ? 20 : 25), isLandscape ? 12 : 16);
    
    const gold = hexToRgb(COLORS.gold);
    doc.setFillColor(gold.r, gold.g, gold.b);
    doc.rect(0, isLandscape ? 18 : 25, pageWidth, 1, 'F');
  };

  const addFooter = () => {
    pageNum++;
    const gray = hexToRgb(COLORS.mediumGray);
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    
    doc.text(content.footer, margin, pageHeight - 8);
    doc.text(`${pageNum} / ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
  };

  const addSectionTitle = (title: string, y: number) => {
    const black = hexToRgb(COLORS.black);
    doc.setTextColor(black.r, black.g, black.b);
    doc.setFontSize(isLandscape ? 18 : 20);
    doc.setFont('helvetica', 'bold');
    doc.text(title, margin, y);
    
    const gold = hexToRgb(COLORS.gold);
    doc.setDrawColor(gold.r, gold.g, gold.b);
    doc.setLineWidth(0.8);
    doc.line(margin, y + 3, margin + 50, y + 3);
    
    return y + (isLandscape ? 12 : 15);
  };

  const addBodyText = (text: string, y: number, maxWidth: number = contentWidth) => {
    const gray = hexToRgb(COLORS.darkGray);
    doc.setTextColor(gray.r, gray.g, gray.b);
    doc.setFontSize(isLandscape ? 9 : 10);
    doc.setFont('helvetica', 'normal');
    
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, margin, y);
    return y + (lines.length * (isLandscape ? 4.5 : 5));
  };

  // === PAGE 1: Cover ===
  const black = hexToRgb(COLORS.black);
  doc.setFillColor(black.r, black.g, black.b);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Gold accent lines
  const gold = hexToRgb(COLORS.gold);
  doc.setFillColor(gold.r, gold.g, gold.b);
  doc.rect(margin, pageHeight * 0.35, 60, 2, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(isLandscape ? 36 : 42);
  doc.setFont('helvetica', 'bold');
  doc.text(content.coverTitle, margin, pageHeight * 0.42);
  
  // Subtitle
  doc.setFontSize(isLandscape ? 16 : 18);
  doc.setFont('helvetica', 'normal');
  doc.text(content.coverSubtitle, margin, pageHeight * 0.50);
  
  // Tagline
  const goldRgb = hexToRgb(COLORS.gold);
  doc.setTextColor(goldRgb.r, goldRgb.g, goldRgb.b);
  doc.setFontSize(isLandscape ? 11 : 12);
  doc.setFont('helvetica', 'italic');
  doc.text(content.coverTagline, margin, pageHeight * 0.58);
  
  // Recipient info if provided
  if (data.recipientName || data.recipientCompany) {
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const recipientY = pageHeight * 0.75;
    doc.text(content.preparedFor + ':', margin, recipientY);
    
    doc.setFont('helvetica', 'bold');
    if (data.recipientCompany) {
      doc.text(data.recipientCompany, margin, recipientY + 8);
    }
    if (data.recipientName) {
      doc.setFont('helvetica', 'normal');
      doc.text(data.recipientName, margin, recipientY + (data.recipientCompany ? 16 : 8));
    }
  }
  
  // Date
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(formatDate(data.presentationDate, data.language), margin, pageHeight - 20);
  
  pageNum++;
  doc.text(`${pageNum} / ${totalPages}`, pageWidth - margin, pageHeight - 20, { align: 'right' });

  // === SECTION PAGES ===
  
  // About Us
  if (data.sections.aboutUs) {
    doc.addPage();
    addHeader();
    currentY = isLandscape ? 30 : 40;
    
    currentY = addSectionTitle(content.aboutTitle, currentY);
    currentY = addBodyText(content.aboutText, currentY, isLandscape ? contentWidth * 0.65 : contentWidth);
    
    currentY += 10;
    
    // Highlights
    content.aboutHighlights.forEach((highlight) => {
      const goldColor = hexToRgb(COLORS.gold);
      doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
      doc.circle(margin + 3, currentY - 1.5, 2, 'F');
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(highlight, margin + 10, currentY);
      currentY += 8;
    });
    
    addFooter();
  }

  // Key Figures
  if (data.sections.keyFigures) {
    doc.addPage();
    addHeader();
    currentY = isLandscape ? 30 : 40;
    
    currentY = addSectionTitle(content.keyFiguresTitle, currentY);
    currentY += 10;
    
    const figures = content.keyFigures;
    const cols = isLandscape ? 3 : 2;
    const figWidth = (contentWidth - (cols - 1) * 10) / cols;
    const figHeight = isLandscape ? 35 : 45;
    
    figures.forEach((fig, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = margin + col * (figWidth + 10);
      const y = currentY + row * (figHeight + 10);
      
      // Box
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(x, y, figWidth, figHeight, 3, 3, 'F');
      
      // Value
      const goldText = hexToRgb(COLORS.gold);
      doc.setTextColor(goldText.r, goldText.g, goldText.b);
      doc.setFontSize(isLandscape ? 22 : 26);
      doc.setFont('helvetica', 'bold');
      doc.text(fig.value, x + figWidth / 2, y + (isLandscape ? 18 : 22), { align: 'center' });
      
      // Label
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(isLandscape ? 9 : 10);
      doc.setFont('helvetica', 'normal');
      doc.text(fig.label, x + figWidth / 2, y + (isLandscape ? 28 : 34), { align: 'center' });
    });
    
    addFooter();
  }

  // Practice Areas
  if (data.sections.practiceAreas) {
    doc.addPage();
    addHeader();
    currentY = isLandscape ? 30 : 40;
    
    currentY = addSectionTitle(content.practiceAreasTitle, currentY);
    currentY += 5;
    
    const areas = content.practiceAreas;
    const cols = isLandscape ? 2 : 1;
    const areaWidth = isLandscape ? (contentWidth - 15) / 2 : contentWidth;
    
    areas.forEach((area, index) => {
      const col = isLandscape ? index % cols : 0;
      const x = margin + col * (areaWidth + 15);
      
      if (isLandscape && index % 2 === 0 && index > 0) {
        currentY += 25;
      } else if (!isLandscape && index > 0) {
        currentY += 18;
      }
      
      const yPos = isLandscape ? currentY : currentY;
      
      // Title
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(area.name, x, yPos);
      
      // Description
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      const gray = hexToRgb(COLORS.darkGray);
      doc.setTextColor(gray.r, gray.g, gray.b);
      const descLines = doc.splitTextToSize(area.description, areaWidth - 5);
      doc.text(descLines, x, yPos + 6);
    });
    
    addFooter();
  }

  // Team
  if (data.sections.team) {
    doc.addPage();
    addHeader();
    currentY = isLandscape ? 30 : 40;
    
    currentY = addSectionTitle(content.teamTitle, currentY);
    currentY += 10;
    
    const members = content.teamMembers;
    const cols = isLandscape ? 4 : 2;
    const memberWidth = (contentWidth - (cols - 1) * 10) / cols;
    
    members.forEach((member, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = margin + col * (memberWidth + 10);
      const y = currentY + row * 40;
      
      // Placeholder for photo
      doc.setFillColor(220, 220, 220);
      doc.circle(x + memberWidth / 2, y + 10, isLandscape ? 12 : 15, 'F');
      
      // Name
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text(member.name, x + memberWidth / 2, y + (isLandscape ? 28 : 32), { align: 'center' });
      
      // Role
      const gold = hexToRgb(COLORS.gold);
      doc.setTextColor(gold.r, gold.g, gold.b);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(member.role, x + memberWidth / 2, y + (isLandscape ? 34 : 38), { align: 'center' });
    });
    
    addFooter();
  }

  // Sectors
  if (data.sections.sectors) {
    doc.addPage();
    addHeader();
    currentY = isLandscape ? 30 : 40;
    
    currentY = addSectionTitle(content.sectorsTitle, currentY);
    currentY += 10;
    
    const sectors = content.sectors;
    const cols = isLandscape ? 4 : 2;
    const sectorWidth = (contentWidth - (cols - 1) * 10) / cols;
    
    sectors.forEach((sector, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = margin + col * (sectorWidth + 10);
      const y = currentY + row * 25;
      
      // Box
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(x, y, sectorWidth, 18, 2, 2, 'F');
      
      // Text
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(sector, x + sectorWidth / 2, y + 11, { align: 'center' });
    });
    
    addFooter();
  }

  // References
  if (data.sections.references) {
    doc.addPage();
    addHeader();
    currentY = isLandscape ? 30 : 40;
    
    currentY = addSectionTitle(content.referencesTitle, currentY);
    currentY += 15;
    
    content.references.forEach((ref, index) => {
      // Quote
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'italic');
      const quoteLines = doc.splitTextToSize(ref.quote, contentWidth - 20);
      doc.text(quoteLines, margin + 10, currentY);
      currentY += quoteLines.length * 6 + 5;
      
      // Author
      const gold = hexToRgb(COLORS.gold);
      doc.setTextColor(gold.r, gold.g, gold.b);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('— ' + ref.author, margin + 10, currentY);
      currentY += 25;
    });
    
    addFooter();
  }

  // Why NRRO
  if (data.sections.whyNrro) {
    doc.addPage();
    addHeader();
    currentY = isLandscape ? 30 : 40;
    
    currentY = addSectionTitle(content.whyNrroTitle, currentY);
    currentY += 10;
    
    content.whyNrro.forEach((item, index) => {
      // Number circle
      const goldColor = hexToRgb(COLORS.gold);
      doc.setFillColor(goldColor.r, goldColor.g, goldColor.b);
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
      doc.setFontSize(9);
      const gray = hexToRgb(COLORS.darkGray);
      doc.setTextColor(gray.r, gray.g, gray.b);
      const descLines = doc.splitTextToSize(item.description, contentWidth - 15);
      doc.text(descLines, margin + 15, currentY);
      currentY += descLines.length * 4.5 + 10;
    });
    
    addFooter();
  }

  // Contact
  if (data.sections.contact) {
    doc.addPage();
    addHeader();
    currentY = isLandscape ? 30 : 40;
    
    currentY = addSectionTitle(content.contactTitle, currentY);
    currentY += 20;
    
    // Contact box
    const boxHeight = 50;
    doc.setFillColor(0, 0, 0);
    doc.roundedRect(margin, currentY, contentWidth, boxHeight, 3, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const contactY = currentY + 15;
    doc.text(content.contactInfo.address, margin + 15, contactY);
    doc.text(content.contactInfo.phone, margin + 15, contactY + 10);
    doc.text(content.contactInfo.email, margin + 15, contactY + 20);
    
    const goldText = hexToRgb(COLORS.gold);
    doc.setTextColor(goldText.r, goldText.g, goldText.b);
    doc.setFont('helvetica', 'bold');
    doc.text(content.contactInfo.web, pageWidth - margin - 15, contactY + 10, { align: 'right' });
    
    addFooter();
  }

  return doc;
};

// Count total pages based on selected sections
const countPages = (data: PresentationData): number => {
  let count = 1; // Cover
  if (data.sections.aboutUs) count++;
  if (data.sections.keyFigures) count++;
  if (data.sections.practiceAreas) count++;
  if (data.sections.team) count++;
  if (data.sections.sectors) count++;
  if (data.sections.references) count++;
  if (data.sections.whyNrro) count++;
  if (data.sections.contact) count++;
  return count;
};

export const downloadCorporatePresentationPDF = (data: PresentationData) => {
  const doc = generateCorporatePresentationPDF(data);
  const recipient = data.recipientCompany || 'General';
  const formatSuffix = data.format === 'landscape' ? 'slides' : 'doc';
  const fileName = `NRRO_Presentation_${recipient.replace(/\s+/g, '_')}_${formatSuffix}.pdf`;
  doc.save(fileName);
};
