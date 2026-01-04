import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { ResourceFilters as Filters, ResourceType, ResourceCategory } from "@/hooks/useResources";

const categories: { value: ResourceCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'accounting', label: 'Accounting' },
  { value: 'tax', label: 'Tax' },
  { value: 'payroll', label: 'Payroll' },
  { value: 'corporate_legal', label: 'Corporate Legal' },
  { value: 'treasury', label: 'Treasury' },
  { value: 'transfer_pricing', label: 'Transfer Pricing' },
  { value: 'governance', label: 'Governance' },
];

const types: { value: ResourceType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'white_paper', label: 'White Papers' },
  { value: 'country_guide', label: 'Country Guides' },
  { value: 'template', label: 'Templates' },
  { value: 'webinar', label: 'Webinars' },
];

const countries = [
  { value: 'all', label: 'All Countries' },
  { value: 'Spain', label: 'Spain' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'USA', label: 'United States' },
  { value: 'LATAM', label: 'Latin America' },
];

const personas = [
  { value: 'all', label: 'All Roles' },
  { value: 'CFO', label: 'CFO' },
  { value: 'Tax Director', label: 'Tax Director' },
  { value: 'HR Manager', label: 'HR Manager' },
  { value: 'CEO', label: 'CEO' },
  { value: 'General Counsel', label: 'General Counsel' },
  { value: 'Controller', label: 'Controller' },
  { value: 'Finance Manager', label: 'Finance Manager' },
];

interface ResourceFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export const ResourceFilters = ({ filters, onFiltersChange }: ResourceFiltersProps) => {
  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
    
    // Track filter applied
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_filter_applied', {
        filter_type: 'search',
        filter_value: value,
      });
    }
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
    
    // Track filter applied
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'resource_filter_applied', {
        filter_type: key,
        filter_value: value,
      });
    }
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      type: 'all',
      category: 'all',
      country: 'all',
      persona: 'all',
    });
  };

  const hasActiveFilters = 
    filters.search || 
    (filters.type && filters.type !== 'all') || 
    (filters.category && filters.category !== 'all') ||
    (filters.country && filters.country !== 'all') ||
    (filters.persona && filters.persona !== 'all');

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search resources..."
          value={filters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Type */}
        <Select
          value={filters.type || 'all'}
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category */}
        <Select
          value={filters.category || 'all'}
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Country */}
        <Select
          value={filters.country || 'all'}
          onValueChange={(value) => handleFilterChange('country', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Persona */}
        <Select
          value={filters.persona || 'all'}
          onValueChange={(value) => handleFilterChange('persona', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            {personas.map((persona) => (
              <SelectItem key={persona.value} value={persona.value}>
                {persona.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};
