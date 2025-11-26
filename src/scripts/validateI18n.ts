#!/usr/bin/env tsx
/**
 * i18n Translation Validation Script
 * 
 * Validates translation completeness across ES/CA/EN languages
 * Detects missing keys, unused keys, and inconsistencies
 * 
 * Usage:
 *   npm run validate:i18n
 *   npm run validate:i18n -- --strict
 *   tsx src/scripts/validateI18n.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

// ============================================================================
// TYPES
// ============================================================================

type Language = 'es' | 'ca' | 'en';

interface I18nIssue {
  type: 'missing' | 'unused' | 'empty' | 'inconsistent';
  key: string;
  languages: Language[];
  severity: 'error' | 'warning';
  context?: string;
  suggestion?: string;
}

interface ValidationResult {
  totalKeys: number;
  missingKeys: number;
  unusedKeys: number;
  emptyKeys: number;
  issues: I18nIssue[];
  keysByLanguage: Record<Language, number>;
  coverage: Record<Language, string>;
  usedKeysInCode: Set<string>;
}

interface TranslationData {
  [key: string]: string | TranslationData;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const LOCALES_DIR = path.resolve(process.cwd(), 'public/locales');
const SOURCE_DIR = path.resolve(process.cwd(), 'src');
const LANGUAGES: Language[] = ['es', 'ca', 'en'];

// Files to exclude from code scanning
const EXCLUDED_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/*.test.tsx',
  '**/*.spec.tsx',
  '**/scripts/**'
];

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Flatten nested object to dot notation
 * { a: { b: 'value' } } => { 'a.b': 'value' }
 */
function flattenObject(
  obj: TranslationData,
  prefix = '',
  result: Record<string, string> = {}
): Record<string, string> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = String(value);
    }
  }
  
  return result;
}

/**
 * Load and flatten a translation JSON file
 */
function loadTranslations(lang: Language): Record<string, string> {
  const filePath = path.join(LOCALES_DIR, lang, 'common.json');
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(content);
    return flattenObject(parsed);
  } catch (error) {
    console.error(`❌ Error loading ${lang}/common.json:`, error);
    return {};
  }
}

/**
 * Extract translation keys used in code
 * Matches: t('key'), t("key"), t(`key`), i18nT('key'), etc.
 */
function extractKeysFromCode(content: string): string[] {
  const keys: string[] = [];
  
  // Match t('key'), t("key"), t(`key`)
  const patterns = [
    /\bt\(['"`]([^'"`]+)['"`]/g,
    /\bi18nT\(['"`]([^'"`]+)['"`]/g,
    /useTranslation\(\).*?t\(['"`]([^'"`]+)['"`]/gs,
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      keys.push(match[1]);
    }
  }
  
  return keys;
}

/**
 * Scan all source files for translation key usage
 */
async function scanSourceFiles(): Promise<Set<string>> {
  const usedKeys = new Set<string>();
  
  try {
    const files = await glob('src/**/*.{tsx,ts}', {
      ignore: EXCLUDED_PATTERNS,
      absolute: true,
    });
    
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const keys = extractKeysFromCode(content);
      keys.forEach(key => usedKeys.add(key));
    }
  } catch (error) {
    console.error('❌ Error scanning source files:', error);
  }
  
  return usedKeys;
}

// ============================================================================
// VALIDATION LOGIC
// ============================================================================

/**
 * Get all unique keys across all languages
 */
function getAllKeys(translations: Record<Language, Record<string, string>>): Set<string> {
  const allKeys = new Set<string>();
  
  for (const lang of LANGUAGES) {
    Object.keys(translations[lang]).forEach(key => allKeys.add(key));
  }
  
  return allKeys;
}

/**
 * Validate translations and detect issues
 */
async function validateTranslations(): Promise<ValidationResult> {
  console.log('🔍 Loading translation files...\n');
  
  // Load all translation files
  const translations: Record<Language, Record<string, string>> = {
    es: loadTranslations('es'),
    ca: loadTranslations('ca'),
    en: loadTranslations('en'),
  };
  
  console.log('📊 Scanning source code for used keys...\n');
  const usedKeysInCode = await scanSourceFiles();
  
  const allKeys = getAllKeys(translations);
  const issues: I18nIssue[] = [];
  
  // Check each key across all languages
  for (const key of allKeys) {
    const missingIn: Language[] = [];
    const emptyIn: Language[] = [];
    
    for (const lang of LANGUAGES) {
      const value = translations[lang][key];
      
      if (value === undefined) {
        missingIn.push(lang);
      } else if (value === '' || value.trim() === '') {
        emptyIn.push(lang);
      }
    }
    
    // Missing key issue
    if (missingIn.length > 0) {
      issues.push({
        type: 'missing',
        key,
        languages: missingIn,
        severity: 'error',
        context: `Key exists in ${LANGUAGES.filter(l => !missingIn.includes(l)).join(', ')} but missing in ${missingIn.join(', ')}`,
      });
    }
    
    // Empty value issue
    if (emptyIn.length > 0) {
      issues.push({
        type: 'empty',
        key,
        languages: emptyIn,
        severity: 'warning',
        context: `Empty value in ${emptyIn.join(', ')}`,
      });
    }
    
    // Unused key issue (exists in JSON but not used in code)
    if (!usedKeysInCode.has(key) && missingIn.length === 0) {
      // Only report if key exists in all languages (complete but unused)
      issues.push({
        type: 'unused',
        key,
        languages: [],
        severity: 'warning',
        context: 'Key exists in JSON but not found in any component',
      });
    }
  }
  
  // Check for keys used in code but missing in JSON
  for (const usedKey of usedKeysInCode) {
    const existsInES = translations.es[usedKey] !== undefined;
    
    if (!existsInES) {
      issues.push({
        type: 'missing',
        key: usedKey,
        languages: LANGUAGES,
        severity: 'error',
        context: 'Key used in code but not found in any translation file',
        suggestion: 'Add this key to all translation files',
      });
    }
  }
  
  // Calculate statistics
  const keysByLanguage: Record<Language, number> = {
    es: Object.keys(translations.es).length,
    ca: Object.keys(translations.ca).length,
    en: Object.keys(translations.en).length,
  };
  
  const totalKeys = allKeys.size;
  const coverage: Record<Language, string> = {
    es: ((keysByLanguage.es / totalKeys) * 100).toFixed(1) + '%',
    ca: ((keysByLanguage.ca / totalKeys) * 100).toFixed(1) + '%',
    en: ((keysByLanguage.en / totalKeys) * 100).toFixed(1) + '%',
  };
  
  const missingKeys = issues.filter(i => i.type === 'missing').length;
  const unusedKeys = issues.filter(i => i.type === 'unused').length;
  const emptyKeys = issues.filter(i => i.type === 'empty').length;
  
  return {
    totalKeys,
    missingKeys,
    unusedKeys,
    emptyKeys,
    issues,
    keysByLanguage,
    coverage,
    usedKeysInCode,
  };
}

// ============================================================================
// REPORTING
// ============================================================================

/**
 * Generate colored console output
 */
function colorize(text: string, color: 'red' | 'yellow' | 'green' | 'blue' | 'cyan'): string {
  const colors = {
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m',
  };
  
  return `${colors[color]}${text}${colors.reset}`;
}

/**
 * Print validation results to console
 */
function printReport(result: ValidationResult, strict: boolean = false): void {
  const { totalKeys, missingKeys, unusedKeys, emptyKeys, issues, keysByLanguage, coverage, usedKeysInCode } = result;
  
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║           VALIDACIÓN i18n - REPORTE COMPLETO                 ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');
  
  // Coverage summary
  console.log('📊 RESUMEN DE COBERTURA');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Claves totales definidas:    ${colorize(String(totalKeys), 'cyan')}`);
  console.log(`  Claves usadas en código:     ${colorize(String(usedKeysInCode.size), 'cyan')}`);
  console.log(`  Español (ES):                 ${keysByLanguage.es} (${coverage.es})`);
  console.log(`  Català (CA):                  ${keysByLanguage.ca} (${coverage.ca})`);
  console.log(`  English (EN):                 ${keysByLanguage.en} (${coverage.en})\n`);
  
  // Missing keys (ERRORS)
  const missingIssues = issues.filter(i => i.type === 'missing');
  if (missingIssues.length > 0) {
    console.log(colorize(`❌ CLAVES FALTANTES (${missingKeys})`, 'red'));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    const grouped: Record<string, string[]> = {};
    for (const issue of missingIssues.slice(0, 20)) {
      const langKey = issue.languages.join(', ');
      if (!grouped[langKey]) grouped[langKey] = [];
      grouped[langKey].push(issue.key);
    }
    
    for (const [langs, keys] of Object.entries(grouped)) {
      console.log(colorize(`  Falta en ${langs}:`, 'red'));
      keys.forEach(key => console.log(`    • ${key}`));
    }
    
    if (missingIssues.length > 20) {
      console.log(colorize(`    ... y ${missingIssues.length - 20} más`, 'red'));
    }
    console.log();
  }
  
  // Empty values (WARNINGS)
  const emptyIssues = issues.filter(i => i.type === 'empty');
  if (emptyIssues.length > 0) {
    console.log(colorize(`⚠️  VALORES VACÍOS (${emptyKeys})`, 'yellow'));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    emptyIssues.slice(0, 10).forEach(issue => {
      console.log(`  • ${issue.key} ${colorize(`[${issue.languages.join(', ')}]`, 'yellow')}`);
    });
    if (emptyIssues.length > 10) {
      console.log(colorize(`  ... y ${emptyIssues.length - 10} más`, 'yellow'));
    }
    console.log();
  }
  
  // Unused keys (WARNINGS)
  const unusedIssues = issues.filter(i => i.type === 'unused');
  if (unusedIssues.length > 0) {
    console.log(colorize(`⚠️  CLAVES SIN USO EN CÓDIGO (${unusedKeys})`, 'yellow'));
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    unusedIssues.slice(0, 15).forEach(issue => {
      console.log(`  • ${issue.key}`);
    });
    if (unusedIssues.length > 15) {
      console.log(colorize(`  ... y ${unusedIssues.length - 15} más`, 'yellow'));
    }
    console.log();
  }
  
  // Final verdict
  const hasErrors = missingKeys > 0;
  const hasWarnings = unusedKeys > 0 || emptyKeys > 0;
  
  if (!hasErrors && !hasWarnings) {
    console.log(colorize('✅ VALIDACIÓN: EXITOSA', 'green'));
    console.log(colorize('   Todas las traducciones están completas y consistentes.\n', 'green'));
  } else if (hasErrors) {
    console.log(colorize(`❌ VALIDACIÓN: FALLIDA (${missingKeys} errores, ${unusedKeys + emptyKeys} warnings)`, 'red'));
    console.log(colorize('   Debes corregir las claves faltantes antes de continuar.\n', 'red'));
  } else if (hasWarnings && strict) {
    console.log(colorize(`⚠️  VALIDACIÓN: FALLIDA EN MODO STRICT (${unusedKeys + emptyKeys} warnings)`, 'yellow'));
    console.log(colorize('   El modo --strict requiere 0 warnings.\n', 'yellow'));
  } else {
    console.log(colorize(`✅ VALIDACIÓN: EXITOSA CON WARNINGS (${unusedKeys + emptyKeys} warnings)`, 'yellow'));
    console.log(colorize('   Considera limpiar las claves no utilizadas.\n', 'yellow'));
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const args = process.argv.slice(2);
  const strict = args.includes('--strict');
  
  console.clear();
  console.log(colorize('🌍 Iniciando validación de traducciones i18n...\n', 'cyan'));
  
  const result = await validateTranslations();
  printReport(result, strict);
  
  // Exit with appropriate code for CI
  const hasErrors = result.missingKeys > 0;
  const hasWarnings = result.unusedKeys > 0 || result.emptyKeys > 0;
  
  if (hasErrors) {
    process.exit(1);
  } else if (hasWarnings && strict) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error(colorize('💥 Error fatal:', 'red'), error);
    process.exit(1);
  });
}

export { validateTranslations, type ValidationResult, type I18nIssue };
