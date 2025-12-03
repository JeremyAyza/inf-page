import ReactDOM from 'react-dom/client'
import QueryClientProvider from '@/app/providers/query-client-provider'
import './index.css'
import Router from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QueryClientProvider>
		<Router />
	</QueryClientProvider>
)
