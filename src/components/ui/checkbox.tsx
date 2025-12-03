'use client'

import { cn } from '@/app/lib/utils'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { type VariantProps, cva } from 'class-variance-authority'
import { CheckIcon } from 'lucide-react'
import React from 'react'
import { Label } from './label'

const checkboxVariants = cva(
	'peer border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 data-[state=checked]:text-primary-foreground size-4.5 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			color: {
				default:
					'data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400',
				success:
					'data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500',
				destructive:
					'data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500',
				warning:
					'data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400',
			}
		},
		defaultVariants: {
			color: 'default'
		}
	}
)

// ✅ Tipado correcto
type CheckboxVariant = VariantProps<typeof checkboxVariants>['color']

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & {
	labelClassName?: string
	label?: string
	color?: CheckboxVariant
}

function Checkbox({
	className,
	labelClassName,
	label,
	color,
	...props
}: CheckboxProps) {
	const id = props?.id || React.useId()
	return (
		<div className="inline-flex items-center gap-2">
			<CheckboxPrimitive.Root
				data-slot="checkbox"
				className={cn(checkboxVariants({ color }), className)}
				id={id}
				{...props}
			>
				<CheckboxPrimitive.Indicator
					data-slot="checkbox-indicator"
					className="flex items-center justify-center text-current transition-none"
				>
					<CheckIcon className="size-3.5" strokeWidth={4} />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
			{label ? (
				<Label className={cn('text-sm font-normal', labelClassName)} htmlFor={id}>
					{label}
				</Label>
			) : null}
		</div>
	)
}

export { Checkbox }
