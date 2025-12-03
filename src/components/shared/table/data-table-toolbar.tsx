'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import type { Table } from '@tanstack/react-table'
import { Download, Search, Settings2 } from 'lucide-react'

export interface DataTableToolbarProps<TData> {
	table: Table<TData>
	searchValue?: string
	totalItems: number
	onSearchChange?: (value: string) => void
	onExport?: () => void
	enableColumnVisibility?: boolean
}

export function DataTableToolbar<TData>({
	table,
	searchValue,
	onSearchChange,
	onExport,
	enableColumnVisibility = true
}: DataTableToolbarProps<TData>) {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-[1.5px]">
			{/* 🔍 Input controlado desde el padre */}
			{onSearchChange ? (
				<Input
					suffixIcon={<Search size={18} />}
					value={searchValue ?? ''}
					onChange={(e) => onSearchChange?.(e.target.value)}
					placeholder="Buscar..."
					className=" min-w-[300px] "
				/>
			) : (
				<div />
			)}
			<div className="flex gap-x-2 items-center">
				{enableColumnVisibility && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="outline"
								size="sm"
								className="flex items-center gap-1 rounded-full "
							>
								<Settings2 size={16} />
								<span>Columnas</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-[180px]">
							{table
								.getAllColumns()
								.filter(
									(column) =>
										typeof column.accessorFn !== 'undefined' &&
										column.getCanHide()
								)
								.map((column) => (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{typeof column?.columnDef?.header === 'string'
											? column?.columnDef?.header.toString()
											: column.id}
									</DropdownMenuCheckboxItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>

			{/* 📤 Export button */}
			{onExport && (
				<Button variant="outline" size="sm" onClick={onExport}>
					<Download className="mr-2 h-4 w-4" />
					Exportar
				</Button>
			)}
		</div>
	)
}