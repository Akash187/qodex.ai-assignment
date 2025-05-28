import dayjs from 'dayjs'

type IProps = {
	date: Date
}

const getLabel = (date: Date) => {
	const today = dayjs()
	const d = dayjs(date)

	if (d.isSame(today, 'day')) return 'Today'
	if (d.isSame(today.add(1, 'day'), 'day')) return 'Tomorrow'
	return d.format('dddd') // e.g., Friday, Saturday
}

const Day = ({ date }: IProps) => {
	return <div>{getLabel(date)}</div>
}
export default Day
