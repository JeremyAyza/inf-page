import type { ColumnDef } from '@tanstack/react-table'
import type { Person } from '@/types/person'
import { createSortableHeader } from '@/components/shared/data-table'

import { Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<Person>[] = [
	{
		id: 'actions',
		cell: () => {
			return (
				<Button variant="ghost" size="icon" className="h-8 w-8 p-0">
					<Eye className="h-4 w-4" />
					<span className="sr-only">Ver detalle</span>
				</Button>
			)
		},
		size: 50,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'firstName',
		header: createSortableHeader('Nombres'),
	},
	{
		accessorKey: 'lastName',
		header: createSortableHeader('Apellidos'),
	},
	{
		accessorKey: 'department',
		header: createSortableHeader('Departamento'),
	},
	{
		accessorKey: 'district',
		header: createSortableHeader('Distrito'),
	},
	{
		accessorKey: 'age',
		header: createSortableHeader('Edad'),
	},
	{
		accessorKey: 'occupation',
		header: createSortableHeader('Ocupación'),
	},
	{
		accessorKey: 'motive',
		header: 'Motivo',
		cell: ({ row }) => {
			const motive = row.getValue('motive') as string
			if (!motive) return null
			return <div className="max-w-[300px] truncate" title={motive}>{motive}</div>
		}
	},
	{
		accessorKey: 'socialMedia',
		header: 'Redes Sociales',
		cell: ({ row }) => {
			const social = row.getValue('socialMedia') as string
			if (!social) return null
			// Basic link detection could be added here, but for now just text
			return <div className="truncate" title={social}>{social}</div>
		}
	},
]
