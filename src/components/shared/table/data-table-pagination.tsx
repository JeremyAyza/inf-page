'use client'

import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight
} from 'lucide-react'
import { DataTableRowsPerPage } from './data-table-rows-per-page'

interface DataTablePaginationProps {
	pageIndex: number
	pageSize: number
	totalPages: number
	pageSizeOptions?: number[]
	onPageChange: (pageIndex: number) => void
	onPageSizeChange: (pageSize: number) => void
	totalItems?: number
}

export function DataTablePagination({
	pageIndex,
	pageSize,
	totalPages,
	pageSizeOptions = [10, 20, 30, 40, 50],
	onPageChange,
	onPageSizeChange,
	totalItems = 0
}: DataTablePaginationProps) {
	const goToPage = (p: number) => {
		if (p < 1 || p > totalPages) return
		onPageChange(p)
	}

	return (
		<div className="border-t flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-1.5">
			{/* Información de páginas */}
			<p className="text-xs text-muted-foreground">
				Página {pageIndex} de {totalPages}
			</p>

			<div className="flex items-center gap-2">
				{!!totalItems && (
					<DataTableRowsPerPage
						pageIndex={pageIndex}
						pageSize={pageSize}
						totalItems={totalItems}
					/>
				)}

				{/* Filas por página */}
				<div className="flex items-center gap-2">
					<p className="text-xs text-muted-foreground">Filas:</p>
					<Select
						value={`${pageSize}`}
						onValueChange={(v) => onPageSizeChange(Number(v))}
					>
						<SelectTrigger className="h-8 w-[80px] rounded-full">
							<SelectValue />
						</SelectTrigger>
						<SelectContent side="top">
							{pageSizeOptions.map((size) => (
								<SelectItem key={size} value={`${size}`}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Navegación */}
				<div className="flex items-center gap-1">
					<Button
						variant="outline"
						size="sm"
						className="rounded-full"
						onClick={() => goToPage(1)}
						disabled={pageIndex <= 1}
					>
						<ChevronsLeft />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="rounded-full"
						onClick={() => goToPage(pageIndex - 1)}
						disabled={pageIndex <= 1}
					>
						<ChevronLeft />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="rounded-full"
						onClick={() => goToPage(pageIndex + 1)}
						disabled={pageIndex >= totalPages}
					>
						<ChevronRight />
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="rounded-full"
						onClick={() => goToPage(totalPages)}
						disabled={pageIndex >= totalPages}
					>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</div>
	)
}