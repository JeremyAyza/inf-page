import { useState, useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { Loader2 } from 'lucide-react'

interface RegisterDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function RegisterDialog({ open, onOpenChange }: RegisterDialogProps) {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (open) {
			setIsLoading(true)
			const timer = setTimeout(() => {
				setIsLoading(false)
			}, 10000)

			return () => clearTimeout(timer)
		}
	}, [open])

	const handleClose = () => {
		setIsLoading(true)
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl">Registrar Infiel</DialogTitle>
					<DialogDescription>
						Preparando formulario de registro...
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col items-center justify-center py-8 space-y-6">
					{isLoading ? (
						<>
							<Loader2 className="h-12 w-12 animate-spin text-primary" />
							<p className="text-sm text-muted-foreground animate-pulse">
								Cargando formulario...
							</p>
						</>
					) : (
						<div className="text-center space-y-4 px-4">
							<div className="text-6xl">😂</div>
							<h3 className="text-2xl font-bold">¡Supera! 🫵</h3>
							<p className="text-muted-foreground text-sm">
								(A futuro habrá formulario de registro)
							</p>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
