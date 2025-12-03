import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

export type FilterState = {
	firstName: string
	lastName: string
	department: string
	district: string
	age: string
	occupation: string
	socialMedia: string
}

interface FiltersProps {
	filters: FilterState
	onFilterChange: (key: keyof FilterState, value: string) => void
	onClearFilters: () => void
}

export function Filters({ filters, onFilterChange, onClearFilters }: FiltersProps) {
	return (
		<div className="grid gap-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold tracking-tight">Filtros de Búsqueda</h3>
				<Button
					variant="outline"
					size="sm"
					onClick={onClearFilters}
					className="h-8 px-2 lg:px-3"
				>
					<X className="mr-2 h-4 w-4" />
					Limpiar
				</Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				<div className="space-y-2">
					<Label htmlFor="firstName">Nombres</Label>
					<Input
						id="firstName"
						placeholder="Buscar por nombre..."
						value={filters.firstName}
						onChange={(e) => onFilterChange('firstName', e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="lastName">Apellidos</Label>
					<Input
						id="lastName"
						placeholder="Buscar por apellido..."
						value={filters.lastName}
						onChange={(e) => onFilterChange('lastName', e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="department">Departamento</Label>
					<Input
						id="department"
						placeholder="Buscar por departamento..."
						value={filters.department}
						onChange={(e) => onFilterChange('department', e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="district">Distrito</Label>
					<Input
						id="district"
						placeholder="Buscar por distrito..."
						value={filters.district}
						onChange={(e) => onFilterChange('district', e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="age">Edad</Label>
					<Input
						id="age"
						placeholder="Buscar por edad..."
						value={filters.age}
						onChange={(e) => onFilterChange('age', e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="occupation">Ocupación</Label>
					<Input
						id="occupation"
						placeholder="Buscar por ocupación..."
						value={filters.occupation}
						onChange={(e) => onFilterChange('occupation', e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="socialMedia">Redes Sociales</Label>
					<Input
						id="socialMedia"
						placeholder="Buscar por redes..."
						value={filters.socialMedia}
						onChange={(e) => onFilterChange('socialMedia', e.target.value)}
					/>
				</div>
			</div>
		</div>
	)
}
