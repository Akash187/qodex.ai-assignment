import Button from '@/components/UI/Button/Button'
import classes from './TempUnit.module.css'
import { useGlobalStore } from '@/store/GlobalStore'

const TempUnit = () => {
	const {
		state: { unit },
		dispatch
	} = useGlobalStore()
	const buttonStyle = { borderRadius: 0, padding: '0.4rem 0.6rem' }
	return (
		<div className={classes.tempUnit}>
			<Button
				disabled={unit === 0}
				style={buttonStyle}
				onClick={() => dispatch({ type: 'SET_UNIT', payload: 0 })}
			>
				°C
			</Button>
			<Button
				disabled={unit === 1}
				style={buttonStyle}
				onClick={() => dispatch({ type: 'SET_UNIT', payload: 1 })}
			>
				°F
			</Button>
		</div>
	)
}
export default TempUnit
