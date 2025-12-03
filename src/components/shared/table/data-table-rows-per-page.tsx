interface Props {
	totalItems: number
	pageSize: number
	pageIndex: number
}

export function DataTableRowsPerPage({
	pageIndex,
	pageSize,
	totalItems
}: Props) {
	return (
		<div>
			<span className="text-xs text-muted-foreground ">
				Mostrando {(pageIndex - 1) * pageSize + 1} -{' '}
				{Math.min(pageIndex * pageSize, totalItems)} de {totalItems}
			</span>
		</div>
	)
}