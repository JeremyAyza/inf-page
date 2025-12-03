import { useMemo, useState } from 'react'
import rawData from '@/app/list.json'

import { DataTable } from '@/components/shared/data-table'
import { columns } from '@/components/home/columns'
import { Filters, type FilterState } from '@/components/home/filters'
import { PersonDetailDialog } from '@/components/home/person-detail-dialog'
import { RegisterDialog } from '@/components/home/register-dialog'
import { Button } from '@/components/ui/button'
import { Filter, UserPlus } from 'lucide-react'
import type { Person } from '@/types/person'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export default function HomePage() {
	const [filters, setFilters] = useState<FilterState>({
		firstName: '',
		lastName: '',
		department: '',
		district: '',
		age: '',
		occupation: '',
		socialMedia: '',
		motive: ''
	})

	const [globalFilter, setGlobalFilter] = useState('')
	const [showFilters, setShowFilters] = useState(false)
	const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)

	const [pagination, setPagination] = useState({
		pageIndex: 1,
		pageSize: 10
	})

	// Process raw data: remove header row and cast
	const allData = useMemo(() => {
		return (rawData as unknown as Person[]).slice(1)
	}, [])

	// Filter data
	const filteredData = useMemo(() => {
		return allData.filter((person) => {
			// Global Search
			if (globalFilter) {
				const searchLower = globalFilter.toLowerCase()
				const matchesGlobal = Object.values(person).some((val) =>
					String(val || '').toLowerCase().includes(searchLower)
				)
				if (!matchesGlobal) return false
			}

			// Specific Filters
			const matches = (val: string | number | null, filter: string) => {
				if (!filter) return true
				if (val === null || val === undefined) return false
				return String(val).toLowerCase().includes(filter.toLowerCase())
			}

			return (
				matches(person.firstName, filters.firstName) &&
				matches(person.lastName, filters.lastName) &&
				matches(person.department, filters.department) &&
				matches(person.district, filters.district) &&
				matches(person.age, filters.age) &&
				matches(person.occupation, filters.occupation) &&
				matches(person.socialMedia, filters.socialMedia) &&
				matches(person.motive, filters.motive)
			)
		})
	}, [allData, filters, globalFilter])

	// Pagination
	const paginatedData = useMemo(() => {
		const start = (pagination.pageIndex - 1) * pagination.pageSize
		const end = start + pagination.pageSize
		return filteredData.slice(start, end)
	}, [filteredData, pagination])

	const totalPages = Math.ceil(filteredData.length / pagination.pageSize)

	const handleFilterChange = (key: keyof FilterState, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }))
		setPagination((prev) => ({ ...prev, pageIndex: 1 }))
	}

	const handleClearFilters = () => {
		setFilters({
			firstName: '',
			lastName: '',
			department: '',
			district: '',
			age: '',
			occupation: '',
			socialMedia: '',
			motive: ''
		})
		setGlobalFilter('')
		setPagination((prev) => ({ ...prev, pageIndex: 1 }))
	}

	const handleRowClick = (person: Person) => {
		setSelectedPerson(person)
		setIsDialogOpen(true)
	}

	return (
		<div className="container mx-auto py-6 space-y-6 h-screen flex flex-col">
			<div className="flex flex-col space-y-4 flex-shrink-0">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold tracking-tight">Lista de Personas</h1>
						<p className="text-sm text-muted-foreground">
							{filteredData.length} registros encontrados
						</p>
					</div>
				</div>

				<Collapsible open={showFilters} onOpenChange={setShowFilters}>
					<CollapsibleContent>
						<Filters
							filters={filters}
							onFilterChange={handleFilterChange}
							onClearFilters={handleClearFilters}
						/>
					</CollapsibleContent>
				</Collapsible>
			</div>

			<div className=" flex-1  border-red-500">
				<DataTable
					columns={columns}
					data={paginatedData}
					totalItems={filteredData.length}
					pageIndex={pagination.pageIndex}
					pageSize={pagination.pageSize}
					totalPages={totalPages}
					onPageChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page }))}
					onPageSizeChange={(size) => setPagination((prev) => ({ ...prev, pageSize: size, pageIndex: 1 }))}
					onRowClick={handleRowClick}
					searchValue={globalFilter}
					onSearchChange={setGlobalFilter}
				>
					<Button
						variant="default"
						size="sm"
						className="gap-2"
						onClick={() => setIsRegisterDialogOpen(true)}
					>
						<UserPlus className="h-4 w-4" />
						Registrar
					</Button>
					<Collapsible open={showFilters} onOpenChange={setShowFilters}>
						<CollapsibleTrigger asChild>
							<Button variant="outline" size="sm" className="gap-2">
								<Filter className="h-4 w-4" />
								Filtros por campo
							</Button>
						</CollapsibleTrigger>
					</Collapsible>
				</DataTable>
			</div>

			<PersonDetailDialog
				person={selectedPerson}
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
			/>

			<RegisterDialog
				open={isRegisterDialogOpen}
				onOpenChange={setIsRegisterDialogOpen}
			/>
		</div>
	)
}
