'use client'

import { cn } from '@/app/lib/utils'
import * as React from 'react'
import { Label } from './label'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	labelClassName?: string
	prefixIcon?: React.ReactNode
	suffixIcon?: React.ReactNode
	prefixAddon?: React.ReactNode
	suffixAddon?: React.ReactNode
	containerClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			label,
			labelClassName,
			prefixIcon,
			suffixIcon,
			prefixAddon,
			suffixAddon,
			containerClassName,
			id,
			type = 'text',
			disabled,
			...props
		},
		ref
	) => {
		const inputId = React.useId()
		const finalId = id || inputId

		return (
			<div className={cn('flex flex-col gap-1', containerClassName)}>
				{/* Label */}
				{label && (
					<Label
						htmlFor={finalId}
						className={cn('text-muted-foreground', labelClassName)}
					>
						{label}
					</Label>
				)}

				{/* Contenedor visual */}
				<div
					className={cn(
						'relative flex items-stretch w-full rounded-full border border-input bg-input text-sm transition-colors',
						'focus-within:ring focus-within:ring-ring focus-within:ring-offset-0',
						'disabled:cursor-not-allowed disabled:opacity-50',
						disabled && 'opacity-70 pointer-events-none'
					)}
				>
					{/* Prefix Addon (dentro del ring ahora) */}
					{prefixAddon && (
						<span className="flex items-center pl-3  rounded-l-full bg-transparent text-muted-foreground text-sm select-none">
							{prefixAddon}
						</span>
					)}

					{/* Prefix Icon */}
					{prefixIcon && (
						<div className="flex items-center pl-3 text-muted-foreground pointer-events-none">
							{prefixIcon}
						</div>
					)}

					{/* Input principal */}
					<input
						id={finalId}
						ref={ref}
						type={type}
						disabled={disabled}
						className={cn(
							'flex w-full min-w-[300px] bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground border-0',
							'focus-visible:ring-0 focus-visible:outline-none',
							!prefixAddon && 'rounded-l-full',
							!suffixAddon && 'rounded-r-full',
							prefixIcon && 'pl-2',
							suffixIcon && 'pr-2',
							className
						)}
						{...props}
					/>

					{/* Suffix Icon (interactivo si lo requiere) */}
					{suffixIcon && (
						<div className="flex items-center pr-3 text-muted-foreground">
							{suffixIcon}
						</div>
					)}

					{/* Suffix Addon (dentro del ring también) */}
					{suffixAddon && (
						<span className="flex items-center pr-3 rounded-r-full bg-transparent text-muted-foreground text-sm select-none">
							{suffixAddon}
						</span>
					)}
				</div>
			</div>
		)
	}
)

Input.displayName = 'Input'