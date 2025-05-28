import Temp from '@/components/home/temp/Temp'
import Time from '@/components/home/time/Time'
import type { WeatherCondition } from '@/types/index.types'
import classes from './CurrentWeather.module.css'
import Button from '@/components/UI/Button/Button'

type IProps = {
	time: Date
	temp: number
	iconCode: string
	weather: WeatherCondition
	city: string
}

const CurrentWeather = ({ time, temp, weather, iconCode, city }: IProps) => {
	return (
		<div className={classes.currentWeather}>
			<div className={classes.contentLeft}>
				<h2>Today</h2>
				<Temp temp={temp} />
				<Button style={{ fontSize: '1rem' }}>Save</Button>
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
