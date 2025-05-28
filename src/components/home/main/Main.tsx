import SearchBar from '@/components/home/searchbar/SearchBar'
import classes from './Main.module.css'
import { useQuery } from '@tanstack/react-query'
import { getWeatherDataAPI } from '@/api/weatherAPI'
import Loader from '@/components/UI/loader/Loader'

const q = 'jaunpur'

// console.log(`${entry.time} | ${entry.temp}°C | ${entry.weather} | ${entry.icon}`)

const Main = () => {
	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['weather', q],
		queryFn: () => getWeatherDataAPI(q),
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
		refetchOnMount: false,
		staleTime: 30, // 30 seconds
		retry: 1
	})

	return (
		<div className={classes.main}>
			<div className={classes.container}>
				<SearchBar />
				<div>
					{isLoading && <Loader />}
					{isError && <div style={{ color: 'red' }}>{error.message}</div>}
				</div>
			</div>
		</div>
	)
}
export default Main
