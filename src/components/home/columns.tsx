import type { ColumnDef } from '@tanstack/react-table'
import type { Person } from '@/types/person'
import { createSortableHeader } from '@/components/shared/data-table'

export const columns: ColumnDef<Person>[] = [
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
