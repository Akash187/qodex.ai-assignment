import Home from '@/pages/home/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1 * 60 * 60 * 1000, //1hr
			retry: 1
		}
	}
})

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div>
				<Home />
			</div>
			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
		</QueryClientProvider>
	)
}

export default App
