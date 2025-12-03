'use client'

import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import { useId, useState } from 'react'

import { cn } from '@/app/lib/utils'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'

import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'

type Accessor<T> = keyof T | ((item: T) => string | number)

function getAccessorValue<T>(item: T, accessor: Accessor<T>): string {
	if (typeof accessor === 'function') {
		return String(accessor(item))
	}
	return String(item[accessor])
}

interface MultiSelectAutocompleteProps<T> {
	label?: string
	items: T[]
	placeholder?: string
	value?: T[]
	onChange?: (value: T[]) => void
	className?: string
	getLabel: Accessor<T>
	getValue: Accessor<T>
}

export function MultiSelectAutocomplete<T>({
	label,
	items,
	placeholder = 'Selecciona...',
	value: controlledValue,
	onChange,
	className,
	getLabel,
	getValue
}: MultiSelectAutocompleteProps<T>) {
	const id = useId()
	const [open, setOpen] = useState(false)
	const [internalValue, setInternalValue] = useState<T[]>([])
	const value = controlledValue ?? internalValue

	const isSelected = (item: T) => {
		return value.some(
			(selected) =>
				getAccessorValue(selected, getValue) ===
				getAccessorValue(item, getValue)
		)
	}

	const toggleItem = (item: T) => {
		const alreadySelected = isSelected(item)
		const updated = alreadySelected
			? value.filter(
					(selected) =>
						getAccessorValue(selected, getValue) !==
						getAccessorValue(item, getValue)
				)
			: [...value, item]

		if (!controlledValue) {
			setInternalValue(updated)
		}
		onChange?.(updated)
	}

	const clearAll = () => {
		if (!controlledValue) {
			setInternalValue([])
		}
		onChange?.([])
		setOpen(false)
	}

	const selectedLabels = value.map((item) => getAccessorValue(item, getLabel))

	return (
		<div className={cn('*:not-first:mt-2')}>
			{label && <Label htmlFor={id}>{label}</Label>}
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						id={id}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={cn(
							'w-full justify-between border-input bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:outline-[3px]',
							className
						)}
					>
						<span
							className={cn(
								'truncate text-left w-full',
								!value.length && 'text-muted-foreground'
							)}
						>
							{value.length > 0 ? selectedLabels.join(', ') : placeholder}
						</span>
						<div className="flex items-center gap-1">
							{value.length > 0 && (
								<XIcon
									size={16}
									className="text-muted-foreground cursor-pointer hover:text-foreground"
									onClick={(e) => {
										e.stopPropagation()
										clearAll()
									}}
								/>
							)}
							<ChevronDownIcon
								size={16}
								className="shrink-0 text-muted-foreground/80"
								aria-hidden="true"
							/>
						</div>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className="min-w-[var(--radix-popper-anchor-width)] border-input p-0"
					align="start"
				>
					<Command>
						<CommandInput placeholder="Buscar..." />
						<CommandList>
							<CommandEmpty>Sin resultados</CommandEmpty>
							<CommandGroup>
								{items.map((item) => (
									<CommandItem
										key={getAccessorValue(item, getValue)}
										value={getAccessorValue(item, getValue)}
										onSelect={() => toggleItem(item)}
									>
										{getAccessorValue(item, getLabel)}
										{isSelected(item) && (
											<CheckIcon size={16} className="ml-auto" />
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	)
}
