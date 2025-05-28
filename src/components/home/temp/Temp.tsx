import { useGlobalStore } from '@/store/GlobalStore'

type IProps = {
	temp: number
}
const Temp = ({ temp }: IProps) => {
	const {
		state: { unit }
	} = useGlobalStore()

	if (unit === 1) {
		// Convert Celsius to Fahrenheit
		temp = Math.round((temp * 9) / 5 + 32)
	}
	return (
		<div>
			{temp}°{unit === 0 ? 'C' : 'F'}
		</div>
	)
}
export default Temp
