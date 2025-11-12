import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export interface ContactLeadFiltersState {
  search: string;
  status: string;
  serviceType: string;
  dateFrom: string;
  dateTo: string;
}

interface ContactLeadFiltersProps {
  filters: ContactLeadFiltersState;
  onFiltersChange: (filters: ContactLeadFiltersState) => void;
  onClearFilters: () => void;
}

export const ContactLeadFilters = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: ContactLeadFiltersProps) => {
  const hasActiveFilters = 
    filters.search || 
    filters.status !== "all" || 
    filters.serviceType !== "all" ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="bg-card border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Filtros</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8"
          >
            <X className="h-4 w-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Búsqueda */}
        <div className="lg:col-span-2">
          <Label htmlFor="search" className="text-xs">Buscar</Label>
          <div className="relative mt-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Nombre, email, empresa..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>

        {/* Estado */}
        <div>
          <Label htmlFor="status" className="text-xs">Estado</Label>
          <Select
            value={filters.status}
            onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
          >
            <SelectTrigger id="status" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="responded">Respondidos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tipo de Servicio */}
        <div>
          <Label htmlFor="service-type" className="text-xs">Tipo de Servicio</Label>
          <Select
            value={filters.serviceType}
            onValueChange={(value) => onFiltersChange({ ...filters, serviceType: value })}
          >
            <SelectTrigger id="service-type" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="tax_advisory">Asesoría Fiscal</SelectItem>
              <SelectItem value="legal_services">Servicios Legales</SelectItem>
              <SelectItem value="accounting">Contabilidad</SelectItem>
              <SelectItem value="payroll">Nóminas</SelectItem>
              <SelectItem value="other">Otro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fecha Desde */}
        <div>
          <Label htmlFor="date-from" className="text-xs">Desde</Label>
          <Input
            id="date-from"
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value })}
            className="mt-1"
          />
        </div>

        {/* Fecha Hasta */}
        <div>
          <Label htmlFor="date-to" className="text-xs">Hasta</Label>
          <Input
            id="date-to"
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};
