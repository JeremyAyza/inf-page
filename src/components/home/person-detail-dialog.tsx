import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Person } from "@/types/person"

interface PersonDetailDialogProps {
	person: Person | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function PersonDetailDialog({ person, open, onOpenChange }: PersonDetailDialogProps) {
	if (!person) return null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className=" md:max-w-7xl max-h-[90vh] overflow-auto">
				<DialogHeader>
					<DialogTitle className="text-xl">Detalle de Persona</DialogTitle>
					<DialogDescription>
						Información completa del registro.
					</DialogDescription>
				</DialogHeader>

				<ScrollArea className="flex-1 pr-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
						<div className="space-y-1">
							<h4 className="text-sm font-medium text-muted-foreground">Nombres</h4>
							<p className="text-base font-medium">{person.firstName}</p>
						</div>
						<div className="space-y-1">
							<h4 className="text-sm font-medium text-muted-foreground">Apellidos</h4>
							<p className="text-base font-medium">{person.lastName}</p>
						</div>

						<div className="space-y-1">
							<h4 className="text-sm font-medium text-muted-foreground">Departamento</h4>
							<p className="text-base">{person.department || '-'}</p>
						</div>
						<div className="space-y-1">
							<h4 className="text-sm font-medium text-muted-foreground">Distrito</h4>
							<p className="text-base">{person.district || '-'}</p>
						</div>

						<div className="space-y-1">
							<h4 className="text-sm font-medium text-muted-foreground">Edad</h4>
							<p className="text-base">{person.age || '-'}</p>
						</div>
						<div className="space-y-1">
							<h4 className="text-sm font-medium text-muted-foreground">Ocupación</h4>
							<p className="text-base">{person.occupation || '-'}</p>
						</div>

						<div className="col-span-1 md:col-span-2 space-y-1">
							<h4 className="text-sm font-medium text-muted-foreground">Redes Sociales</h4>
							<p className="text-base break-words">{person.socialMedia || '-'}</p>
						</div>

						<div className="col-span-1 md:col-span-2 space-y-1 bg-muted/50 p-4 rounded-md">
							<h4 className="text-sm font-medium text-muted-foreground mb-2">Motivo</h4>
							<p className="text-base whitespace-pre-wrap leading-relaxed">
								{person.motive || 'Sin motivo especificado'}
							</p>
						</div>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}
