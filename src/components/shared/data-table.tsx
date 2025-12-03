'use client'

import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
	type OnChangeFn,
	type SortingState
} from '@tanstack/react-table'
import { ArrowUpDown, Loader2 } from 'lucide-react'

import { cn } from '@/app/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import type { DataTableProps } from '../types/data-table.props'
import { Button } from '../ui/button'
import { DataTablePagination } from './table/data-table-pagination'
import { DataTableToolbar } from './table/data-table-toolbar'

export function DataTable<TData, TValue>({
	columns,
	data,
	isLoading = false,
	emptyMessage = 'Sin resultados',
	onRowClick,
	searchValue,
	onSearchChange,
	totalItems = 0,
	pageIndex = 1,
	pageSize = 10,
	totalPages = 1,
	onPageChange,
	onPageSizeChange,
	onExport,
	rowClassName,
	enableColumnVisibility,
	children,
	sorting,
	onSortingChange
}: DataTableProps<TData, TValue> & {
	searchValue?: string
	onSearchChange?: (v: string) => void
	pageIndex?: number
	pageSize?: number
	totalPages?: number
	totalItems?: number
	onPageChange?: (pageIndex: number) => void
	onPageSizeChange?: (pageSize: number) => void
	rowClassName?: string
	children?: React.ReactNode
	sorting?: SortingState
	onSortingChange?: OnChangeFn<SortingState>
}) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting: sorting || []
		},
		onSortingChange: onSortingChange,
		manualSorting: true, // Sorting is handled externally
		sortingFns: {
			// Custom case-insensitive sorting function
			alphanumeric: (rowA, rowB, columnId) => {
				const a = rowA.getValue(columnId)
				const b = rowB.getValue(columnId)

				// Convert to lowercase strings for comparison
				const aStr = String(a ?? '').toLowerCase()
				const bStr = String(b ?? '').toLowerCase()

				return aStr.localeCompare(bStr, 'es', { numeric: true })
			}
		}
	})

	return (
		<div className="space-y-2 flex-1 flex flex-col overflow-hidden">
			<DataTableToolbar
				table={table}
				searchValue={searchValue}
				onSearchChange={onSearchChange}
				onExport={onExport}
				enableColumnVisibility={enableColumnVisibility}
				totalItems={totalItems}
			>
				{children}
			</DataTableToolbar>

			<div className="overflow-auto rounded-md flex-1 flex flex-col justify-between border ">
				<ScrollArea className={cn('w-full flex-1')}>
					<Table>
						<TableHeader className="sticky top-0 z-10 ">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<TableHead key={header.id}>
												{header.isPlaceholder
													? null
													: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
											</TableHead>
										)
									})}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{isLoading ? (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center"
									>
										<div className="flex items-center justify-center">
											<Loader2 className="mr-2 h-6 w-6 animate-spin" />
											<span>Cargando...</span>
										</div>
									</TableCell>
								</TableRow>
							) : table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										onClick={() => onRowClick?.(row.original)}
										className={
											onRowClick
												? `cursor-pointer ${rowClassName?.(row.original) || ''}`
												: rowClassName?.(row.original) || ''
										}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="max-w-[175px] truncate"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-28 text-center"
									>
										{emptyMessage}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				{onPageSizeChange && onPageChange && (
					<DataTablePagination
						pageIndex={pageIndex}
						pageSize={pageSize}
						totalPages={totalPages}
						onPageChange={onPageChange}
						onPageSizeChange={onPageSizeChange}
						totalItems={totalItems}
					/>
				)}
			</div>
		</div>
	)
}

// Utility function to create sortable header
export function createSortableHeader(label: string) {
	return ({ column }: { column: any }) => {
		return (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				className="-ml-4"
			>
				{label}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</Button>
		)
	}
}
