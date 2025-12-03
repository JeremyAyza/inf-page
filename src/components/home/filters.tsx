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
	motive: string
}

interface FiltersProps {
	filters: FilterState
	onFilterChange: (key: keyof FilterState, value: string) => void
	onClearFilters: () => void
}

export function Filters({ filters, onFilterChange, onClearFilters }: FiltersProps) {
	return (
		<div className="p-1">

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
				<div className="space-y-1">
					<Label htmlFor="firstName" className="text-xs">Nombres</Label>
					<Input
						id="firstName"
						placeholder="Filtrar..."
						value={filters.firstName}
						onChange={(e) => onFilterChange('firstName', e.target.value)}
						className="h-8 text-sm"
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="lastName" className="text-xs">Apellidos</Label>
					<Input
						id="lastName"
						placeholder="Filtrar..."
						value={filters.lastName}
						onChange={(e) => onFilterChange('lastName', e.target.value)}
						className="h-8 text-sm"
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="department" className="text-xs">Departamento</Label>
					<Input
						id="department"
						placeholder="Filtrar..."
						value={filters.department}
						onChange={(e) => onFilterChange('department', e.target.value)}
						className="h-8 text-sm"
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="district" className="text-xs">Distrito</Label>
					<Input
						id="district"
						placeholder="Filtrar..."
						value={filters.district}
						onChange={(e) => onFilterChange('district', e.target.value)}
						className="h-8 text-sm"
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="age" className="text-xs">Edad</Label>
					<Input
						id="age"
						placeholder="Filtrar..."
						value={filters.age}
						onChange={(e) => onFilterChange('age', e.target.value)}
						className="h-8 text-sm"
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="occupation" className="text-xs">Ocupación</Label>
					<Input
						id="occupation"
						placeholder="Filtrar..."
						value={filters.occupation}
						onChange={(e) => onFilterChange('occupation', e.target.value)}
						className="h-8 text-sm"
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="socialMedia" className="text-xs">Redes Sociales</Label>
					<Input
						id="socialMedia"
						placeholder="Filtrar..."
						value={filters.socialMedia}
						onChange={(e) => onFilterChange('socialMedia', e.target.value)}
						className="h-8 text-sm"
					/>
				</div>
				<div className="space-y-1">
					<Label htmlFor="motive" className="text-xs">Motivo</Label>
					<Input
						id="motive"
						placeholder="Filtrar..."
						value={filters.motive}
						onChange={(e) => onFilterChange('motive', e.target.value)}
						className="h-8 text-sm"
					/>
				</div>
				<div className="space-y-1">
					<Button
						variant="ghost"
						size="sm"
						onClick={onClearFilters}
						className="h-8 px-2 text-muted-foreground hover:text-foreground"
					>
						<X className="mr-2 h-4 w-4" />
						Limpiar filtros
					</Button>
				</div>

			</div>
		</div>
	)
}
