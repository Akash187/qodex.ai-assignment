import { type JSX } from 'react'
import {
	IconSun,
	IconCloud,
	IconCloudRain,
	IconCloudStorm,
	IconSnowflake,
	IconCloudFog,
	IconWind,
	IconAlarmSmoke,
	IconDroplet,
	IconMist,
	IconTornado,
	IconAlertTriangle
} from '@tabler/icons-react'
import type { WeatherCondition } from '@/types/index.types'

interface IProps {
	condition: WeatherCondition | string
	size?: number
	color?: string
}

const WeatherIcon = ({ condition, size = 24, color = 'black' }: IProps) => {
	const iconMap: Record<WeatherCondition, JSX.Element> = {
		Clear: <IconSun size={size} color={color} />,
		Clouds: <IconCloud size={size} color={color} />,
		Rain: <IconCloudRain size={size} color={color} />,
		Thunderstorm: <IconCloudStorm size={size} color={color} />,
		Snow: <IconSnowflake size={size} color={color} />,
		Drizzle: <IconDroplet size={size} color={color} />,
		Mist: <IconMist size={size} color={color} />,
		Smoke: <IconAlarmSmoke size={size} color={color} />,
		Haze: <IconCloudFog size={size} color={color} />,
		Dust: <IconCloudFog size={size} color={color} />,
		Fog: <IconCloudFog size={size} color={color} />,
		Sand: <IconCloudFog size={size} color={color} />,
		Ash: <IconAlarmSmoke size={size} color={color} />,
		Squall: <IconWind size={size} color={color} />,
		Tornado: <IconTornado size={size} color={color} />
	}

	return (
		iconMap[condition as WeatherCondition] ?? (
			<IconAlertTriangle size={size} color={color} />
		)
	)
}

export default WeatherIcon
