import Temp from '@/components/home/temp/Temp'
import Time from '@/components/home/time/Time'
import type { WeatherCondition } from '@/types/index.types'
import classes from './CurrentWeather.module.css'
import Button from '@/components/UI/Button/Button'
import { useGlobalStore } from '@/store/GlobalStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTempDataAPI } from '@/api/tempData'

type IProps = {
	time: Date
	temp: number
	iconCode: string
	weather: WeatherCondition
	city: string
}

const CurrentWeather = ({ time, temp, weather, iconCode, city }: IProps) => {
	const queryClient = useQueryClient()
	const {
		state: { isLoggedIn, userId },
		dispatch
	} = useGlobalStore()

	const { mutate, isPending } = useMutation({
		mutationFn: () => {
			return addTempDataAPI({
				user_id: userId,
				temp,
				place: city,
				temp_date: time.toISOString()
			})
		},
		onSuccess: (data) => {
			console.log('Temperature data saved successfully:', data)
			dispatch({
				type: 'SHOW_ALERT',
				payload: {
					level: 'SUCCESS',
					message: 'Temperature data saved successfully!'
				}
			})
			queryClient.invalidateQueries({ queryKey: ['tempData', userId] })
		},
		onError: (error) => {
			console.error('Error saving temperature data:', error)
			dispatch({
				type: 'SHOW_ALERT',
				payload: {
					level: 'ERROR',
					message: 'Failed to save temperature data.'
				}
			})
		}
	})

	return (
		<div className={classes.currentWeather}>
			<div className={classes.contentLeft}>
				<h2>Today</h2>
				<Temp temp={temp} />
				<Button
					disabled={!isLoggedIn || isPending}
					style={{ fontSize: '1rem' }}
					onClick={() => mutate()}
				>
					{isLoggedIn ? 'Save' : 'Login to save'}
				</Button>
			</div>
			<div>
				<img
					src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
					alt={`${weather} photo`}
				/>
			</div>
			<div className={classes.contentRight}>
				<p style={{ textTransform: 'capitalize' }}>{city}</p>
				<Time date={time} />
				<p>{weather}</p>
			</div>
		</div>
	)
}
export default CurrentWeather
