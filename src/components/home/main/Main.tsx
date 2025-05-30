import SearchBar from '@/components/home/searchbar/SearchBar'
import classes from './Main.module.css'
import { useQuery } from '@tanstack/react-query'
import { getWeatherDataAPI } from '@/api/weatherAPI'
import Loader from '@/components/UI/loader/Loader'
import CurrentWeather from '@/components/home/current-weather/CurrentWeather'
import type { WeatherCondition } from '@/types/index.types'
import Carousel from 'react-multi-carousel'
import { carouselResponsiveInfo } from '@/utils/helper'
import Temp from '@/components/home/temp/Temp'
import Day from '@/components/home/day/Day'
import Time from '@/components/home/time/Time'
import { useState } from 'react'
import Sidenav from '@/components/home/Sidenav/Sidenav'

const Main = () => {
	const [city, setCity] = useState<string>(
		localStorage.getItem('city') || 'Delhi'
	)

	const { data, error, isError, isLoading } = useQuery({
		queryKey: ['weather', city],
		queryFn: () => getWeatherDataAPI(city),
		refetchOnWindowFocus: true,
		refetchOnReconnect: false,
		refetchOnMount: false,
		refetchInterval: 30000
	})

	return (
		<div style={{ display: 'flex', width: '100%' }}>
			<Sidenav />
			<div className={classes.main}>
				<div className={classes.container}>
					<SearchBar setCity={setCity} isLoading={isLoading} />
					<div className={classes.mainContent}>
						{isLoading && <Loader />}
						{isError && (
							<div style={{ color: 'red', textAlign: 'center' }}>
								{error.message}
							</div>
						)}
						{data && (
							<>
								<CurrentWeather
									time={data[0].time}
									temp={data[0].temp}
									iconCode={data[0].icon}
									weather={data[0].weather as WeatherCondition}
									city={city}
								/>
								<hr />
								<div className={classes.futureForecast}>
									<h2 style={{ marginBottom: '1rem' }}>Future Forecast</h2>
									<Carousel
										responsive={carouselResponsiveInfo}
										removeArrowOnDeviceType={['tablet', 'mobile']}
									>
										{data.slice(1).map((forecast) => (
											<div
												key={forecast.time.toISOString()}
												className={classes.futureForecastItem}
											>
												<Day date={forecast.time} />
												<Time date={forecast.time} />
												<Temp temp={forecast.temp} />
												<img
													src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
													alt={`${forecast.weather} photo`}
												/>
												<div>{forecast.weather}</div>
											</div>
										))}
									</Carousel>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
export default Main
