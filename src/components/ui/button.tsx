import { Slot, Slottable } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/app/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all disabled:cursor-not-allowed cursor-pointer active:scale-[0.98]  active:shadow-inner ',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				xs: 'h-7 text-xs  px-2.5 py-1.5 has-[>svg]:px-2',
				sm: 'h-8  gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10  px-6 has-[>svg]:px-4',
				icon: 'size-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
)

// 👇 Aquí usamos React.forwardRef para aceptar refs
const Button = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
		loading?: boolean
	}
>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			loading = false,
			disabled = false,
			children,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button'

		return (
			<Comp
				data-slot="button"
				ref={ref} // 👈 ahora sí podemos pasar ref
				disabled={disabled || loading}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			>
				{loading ? (
					<Loader2 className="h-4 w-4 animate-spin" />
				) : (
					<Slottable>{children}</Slottable>
				)}
			</Comp>
		)
	}
)

Button.displayName = 'Button'

export { Button, buttonVariants }
