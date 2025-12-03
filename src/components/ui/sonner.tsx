// components/ui/sonner.tsx
"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";
// íconos de ejemplo (puedes usar lucide, Heroicons, etc.)
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react";

export function Toaster({ toastOptions, ...props }: ToasterProps) {



  return (
    <Sonner
		position="top-right"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
      } as React.CSSProperties}
      toastOptions={{
				
        classNames: {
          toast: "group toast rounded-lg border p-4 shadow-lg bg-white dark:bg-gray-800",
          title: "font-semibold text-gray-900 dark:text-gray-100",
          description: "text-sm text-gray-600 dark:text-gray-300",
          icon: "mr-2",
          actionButton: "px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600",
          cancelButton: "px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300",
          success: "!border-green-500  !text-green-800",
          error: "!border-red-500  !text-red-800",
          warning: "!border-yellow-500 !bg-yellow-50 !text-yellow-800",
          info: "!border-blue-500 !bg-blue-50 !text-blue-800",
        },
      }}
			
      {...props}
    />
  );
}

