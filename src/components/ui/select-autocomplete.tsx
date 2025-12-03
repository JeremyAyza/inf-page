'use client'

import { CheckIcon, ChevronDownIcon } from 'lucide-react'
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

interface SelectAutocompleteProps<T> {
	label?: string
	items: T[]
	placeholder?: string
	value?: T | null
	onChange?: (value: T | null) => void
	className?: string
	getLabel: Accessor<T>
	getValue: Accessor<T>
}

export function SelectAutocomplete<T>({
	label,
	items,
	placeholder = 'Selecciona',
	value: controlledValue,
	onChange,
	className,
	getLabel,
	getValue
}: SelectAutocompleteProps<T>) {
	const id = useId()
	const [open, setOpen] = useState(false)
	const [internalValue, setInternalValue] = useState<T | null>(null)
	const isControlled = controlledValue !== undefined
	const value = isControlled ? controlledValue : internalValue

	const isSelected = (item: T) => {
		if (!value) return false
		return (
			getAccessorValue(item, getValue) === getAccessorValue(value, getValue)
		)
	}

	const handleSelect = (newItem: T) => {
		const selected = isSelected(newItem) ? null : newItem
		if (!controlledValue) {
			setInternalValue(selected)
		}
		onChange?.(selected)
		setOpen(false)
	}

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
							'w-full justify-between border-input bg-background px-3 font-normal outline-offset-0 outline-none hover:bg-background focus-visible:outline-[3px]',
							className
						)}
						// className="w-full justify-between border-input bg-background px-3 font-normal outline-offset-0 outline-none hover:bg-background focus-visible:outline-[3px]"
					>
						<span className={cn('truncate', !value && 'text-muted-foreground')}>
							{value ? getAccessorValue(value, getLabel) : placeholder}
						</span>
						<ChevronDownIcon
							size={16}
							className="shrink-0 text-muted-foreground/80"
							aria-hidden="true"
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className=" min-w-[var(--radix-popper-anchor-width)] border-input p-0"
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
										value={getAccessorValue(item, getLabel)}
										onSelect={() => handleSelect(item)}
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
