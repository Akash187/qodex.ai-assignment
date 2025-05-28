import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-multi-carousel/lib/styles.css'
import '@/styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
