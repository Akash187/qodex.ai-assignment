type IProps = {
	temp: number
}
const Temp = ({ temp }: IProps) => {
	return <div>{temp}°C</div>
}
export default Temp
