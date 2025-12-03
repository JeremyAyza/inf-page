import { useMemo, useState } from 'react'
import rawData from '@/app/list.json'

import { DataTable } from '@/components/shared/data-table'
import { columns } from '@/components/home/columns'
import { Filters, type FilterState } from '@/components/home/filters'
import type { Person } from '@/types/person'

export default function HomePage() {
	const [filters, setFilters] = useState<FilterState>({
		firstName: '',
		lastName: '',
		department: '',
		district: '',
		age: '',
		occupation: '',
		socialMedia: ''
	})

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
				matches(person.socialMedia, filters.socialMedia)
			)
		})
	}, [allData, filters])

	// Pagination
	const paginatedData = useMemo(() => {
		const start = (pagination.pageIndex - 1) * pagination.pageSize
		const end = start + pagination.pageSize
		return filteredData.slice(start, end)
	}, [filteredData, pagination])

	const totalPages = Math.ceil(filteredData.length / pagination.pageSize)

	const handleFilterChange = (key: keyof FilterState, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }))
		setPagination((prev) => ({ ...prev, pageIndex: 1 })) // Reset to first page on filter change
	}

	const handleClearFilters = () => {
		setFilters({
			firstName: '',
			lastName: '',
			department: '',
			district: '',
			age: '',
			occupation: '',
			socialMedia: ''
		})
		setPagination((prev) => ({ ...prev, pageIndex: 1 }))
	}

	return (
		<div className="container mx-auto py-10 space-y-8">
			<div className="flex flex-col space-y-2">
				<h1 className="text-3xl font-bold tracking-tight">Lista de Personas</h1>
				<p className="text-muted-foreground">
					Gestiona y visualiza la información de la lista.
				</p>
			</div>

			<Filters
				filters={filters}
				onFilterChange={handleFilterChange}
				onClearFilters={handleClearFilters}
			/>

			<DataTable
				columns={columns}
				data={paginatedData}
				totalItems={filteredData.length}
				pageIndex={pagination.pageIndex}
				pageSize={pagination.pageSize}
				totalPages={totalPages}
				onPageChange={(page) => setPagination((prev) => ({ ...prev, pageIndex: page }))}
				onPageSizeChange={(size) => setPagination((prev) => ({ ...prev, pageSize: size, pageIndex: 1 }))}
			/>
		</div>
	)
}
