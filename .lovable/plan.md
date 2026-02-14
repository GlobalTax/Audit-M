

# Plan: Herramienta de Facturación, Previsión y Propuestas

## Resumen

Crear un módulo de **Facturación** integrado en el CRM que permita:
1. Registrar facturas emitidas (histórico real de lo cobrado)
2. Ver un dashboard de facturación anual con comparativa año anterior
3. Previsión automática del año siguiente basada en contratos activos y pipeline
4. Acceso directo al generador de propuestas PDF ya existente

---

## 1. Nueva tabla de base de datos: `crm_invoices`

Tabla para registrar cada factura emitida individualmente:

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | uuid (PK) | Identificador |
| `client_id` | uuid (FK crm_clients) | Cliente asociado |
| `contract_id` | uuid (FK crm_contracts, nullable) | Contrato relacionado (opcional) |
| `invoice_number` | text (unique) | Numero de factura (ej: FAC-2025-001) |
| `issue_date` | date | Fecha de emisión |
| `due_date` | date (nullable) | Fecha de vencimiento |
| `amount` | numeric | Importe total |
| `tax_amount` | numeric (default 0) | IVA u otros impuestos |
| `total_amount` | numeric | Importe total con impuestos |
| `status` | enum: borrador, emitida, pagada, vencida, anulada | Estado de la factura |
| `service_description` | text | Concepto / descripción del servicio |
| `notes` | text (nullable) | Notas internas |
| `created_at` | timestamptz | Fecha de creación |
| `updated_at` | timestamptz | Última actualización |

- RLS: solo accesible por rol `admin`
- Trigger `update_updated_at_column` para `updated_at`

---

## 2. Navegación: nueva sección "Facturación" en el sidebar del CRM

Añadir dentro del CRM una nueva sub-sección bajo **Herramientas**:

```text
Herramientas
  > Analítica
  > Facturación    <-- NUEVO
  > Propuestas     <-- Mover aquí el enlace existente
```

Rutas:
- `/admin/crm/facturacion` - Dashboard de facturación
- `/admin/crm/propuestas` - Redirige al generador de propuestas existente

---

## 3. Vista principal: Dashboard de Facturación (`/admin/crm/facturacion`)

### 3.1 KPIs superiores (4 tarjetas)

| KPI | Fuente |
|-----|--------|
| **Facturado 2025** | Suma de `crm_invoices` con estado pagada/emitida del año actual |
| **Facturado 2024** | Suma de `crm_invoices` del año anterior |
| **Variación interanual** | Porcentaje de cambio entre ambos años |
| **Previsión 2026** | Cálculo automático desde contratos activos (importe x frecuencia anualizada) + pipeline ponderado |

### 3.2 Gráfico de barras mensual

- Barras agrupadas: año anterior vs año actual (12 meses)
- Línea punteada: previsión año siguiente
- Usando Recharts (ya instalado)

### 3.3 Tabla de facturas

Listado completo de facturas con:
- Número, cliente, concepto, fecha, importe, estado
- Filtros por año y estado
- Botón para crear nueva factura (formulario modal)

### 3.4 Desglose por cliente

- Top 10 clientes por facturación
- Gráfico de tarta o barras horizontales

---

## 4. Previsión del año siguiente

Cálculo automático basado en:
- **Contratos activos**: importe mensual x 12 (o ajustado por frecuencia de facturación)
- **Contratos con renovación pendiente**: se incluyen con un factor de probabilidad del 70%
- **Pipeline (propuesta/negociación)**: valor estimado x probabilidad de cierre (propuesta: 30%, negociación: 60%)

Se muestra como tarjeta resumen + desglose en una sección expandible.

---

## 5. Formulario de nueva factura

Modal con campos:
- Cliente (selector de `crm_clients`)
- Contrato asociado (selector opcional de `crm_contracts` del cliente)
- Número de factura (auto-generado: FAC-YYYY-NNN)
- Fecha de emisión y vencimiento
- Concepto, importe base, IVA, total
- Estado inicial: borrador o emitida

---

## 6. Integración con Propuestas

Mover el enlace del generador de propuestas existente (`/admin/proposal-generator`) a la sub-navegación del CRM bajo **Herramientas > Propuestas**, manteniendo la funcionalidad actual intacta.

---

## Archivos a crear/modificar

| Archivo | Acción |
|---------|--------|
| **Migración SQL** | Crear tabla `crm_invoices` con enum, RLS, trigger |
| `src/hooks/useCRMInvoices.ts` | **Nuevo**: hook CRUD para facturas |
| `src/components/admin/crm/CRMBillingDashboard.tsx` | **Nuevo**: dashboard principal con KPIs, gráficos y tabla |
| `src/components/admin/crm/CRMInvoiceForm.tsx` | **Nuevo**: formulario modal para crear/editar facturas |
| `src/components/admin/crm/CRMBillingForecast.tsx` | **Nuevo**: componente de previsión con desglose |
| `src/components/admin/AdminSidebar.tsx` | Modificar: añadir "Facturación" y "Propuestas" bajo Herramientas en sub-nav CRM |
| `src/pages/admin/AdminCRM.tsx` | Modificar: añadir cases para `facturacion` y `propuestas` |
| `src/lib/crm.ts` | Modificar: añadir constantes de estado de facturas y helpers de cálculo |

