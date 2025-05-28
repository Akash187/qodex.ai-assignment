import dayjs from 'dayjs'

type IProps = {
	date: Date
}

const Time = ({ date }: IProps) => {
	const formattedTime = dayjs(date).format('h:mm A')
	return <div>{formattedTime}</div>
}
export default Time
