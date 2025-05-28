import PageLoader from '@/components/UI/page-loader/PageLoader'
import { GlobalStoreProvider } from '@/store/GlobalStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { lazy, Suspense } from 'react'
const Home = lazy(() => import('@/pages/home/Home'))

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
		<GlobalStoreProvider>
			<QueryClientProvider client={queryClient}>
				<Suspense fallback={<PageLoader />}>
					<Home />
				</Suspense>
				<ReactQueryDevtools
					initialIsOpen={false}
					buttonPosition="bottom-left"
				/>
			</QueryClientProvider>
		</GlobalStoreProvider>
	)
}

export default App
