import {
	TrendingUp,
	MapPinned,
	ScanBarcode,
	Store,
	Star,
	type LucideIcon,
	Building2,
	Locate,
	Medal,
	LayoutDashboard,
	BarChart3,
	LineChart,
	MapIcon,
	FileText,
	Activity,
	ShieldCheck,
	Sparkles,
	Globe2,
	ScrollText,
	Database,
	BookOpen,
	UserCircle2
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
	TrendingUp,
	MapPinned,
	ScanBarcode,
	Store,
	Star,
	Building2,
	Locate,
	Medal,
	LayoutDashboard,
	BarChart3,
	LineChart,
	MapIcon,
	FileText,
	Activity,
	ShieldCheck,
	Sparkles,
	Globe2,
	ScrollText,
	Database,
	BookOpen,
	UserCircle2
}

export const getIconComponent = (name: string): LucideIcon => {
	return iconMap[name] ?? TrendingUp
}
