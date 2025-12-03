import type { ColumnDef, Row, Table } from '@tanstack/react-table'
import type { LucideIcon } from 'lucide-react'

export interface DataTableProps<TData, TValue> {
	// Core props
	columns: ColumnDef<TData, TValue>[]
	data: TData[]

	// Search & Filtering
	searchKey?: string
	searchPlaceholder?: string
	customFilters?: CustomFilter<TData>[]

	// Actions
	onExport?: () => void
	bulkActions?: BulkAction<TData>[]
	onRowClick?: (row: TData) => void

	// UI States
	isLoading?: boolean
	emptyMessage?: string
	rowClassName?: (row: TData) => string

	// Feature Toggles
	enableRowSelection?: boolean
	enableMultiRowSelection?: boolean
	enableSorting?: boolean
	enableFiltering?: boolean
	enablePagination?: boolean
	enableColumnVisibility?: boolean

	// Pagination
	pageSize?: number
	pageSizeOptions?: number[]
	manualPagination?: boolean
	pageCount?: number
	onPaginationChange?: (pagination: {
		pageIndex: number
		pageSize: number
	}) => void

	// Advanced
	stickyHeader?: boolean
	getRowId?: (row: TData, index: number) => string
}

export interface DataTableToolbarProps<TData> {
	table: Table<TData>
	searchKey?: string
	searchPlaceholder?: string
	onExport?: () => void
	customFilters?: CustomFilter<TData>[]
	bulkActions?: BulkAction<TData>[]
}

export interface CustomFilter<TData> {
	id: string
	label: string
	render: (table: Table<TData>) => React.ReactNode
}

export interface BulkAction<TData> {
	label: string
	icon?: LucideIcon
	variant?:
	| 'default'
	| 'destructive'
	| 'outline'
	| 'secondary'
	| 'ghost'
	| 'link'
	onClick: (rows: Row<TData>[]) => void
}