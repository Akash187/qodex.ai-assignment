type ForecastEntry = {
	time: Date
	temp: number
	weather: string
	icon: string // add icon code
}

// Extract only time, temp, weather, and icon
interface WeatherAPIResponse {
	list: WeatherListItem[]
}

interface WeatherListItem {
	dt: number
	main: {
		temp: number
	}
	weather: {
		main: string
		icon: string // add icon code
	}[]
}

export const getWeatherDataAPI = async (
	city: string
): Promise<ForecastEntry[]> => {
	const API_KEY = import.meta.env.VITE_OPENWEATERMAP_API_KEY
	const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`

	try {
		const response = await fetch(url)
		if (!response.ok) {
			throw new Error(`Error fetching weather data: ${response.statusText}`)
		}
		const data = await response.json()
		console.log('Weather Data:', data)
		return (data as WeatherAPIResponse).list.map((item: WeatherListItem) => ({
			time: new Date(item.dt * 1000),
			temp: Math.round(item.main.temp),
			weather: item.weather[0].main,
			icon: item.weather[0].icon // extract icon code
		}))
	} catch (error) {
		console.error('Error fetching weather data:', error)
		throw error
	}
}
