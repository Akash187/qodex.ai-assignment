import { useEffect, useState } from 'react'
import classes from './Alert.module.css'

type IProps = {
	level: 'ERROR' | 'SUCCESS'
	message: string
	onClose?: () => void
}

const Alert = ({ level, message, onClose }: IProps) => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		setVisible(true)
		const timer = setTimeout(() => {
			setVisible(false)
			if (onClose) onClose()
		}, 3000)
		return () => clearTimeout(timer)
	}, [onClose])

	return (
		<div
			className={`${classes.alert} ${classes[level.toLowerCase()]} ${
				visible ? classes.show : ''
			}`}
		>
			{message}
		</div>
	)
}

export default Alert
