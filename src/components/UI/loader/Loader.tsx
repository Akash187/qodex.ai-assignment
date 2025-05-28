import loader from '@/assets/loader.svg'
import classes from './Loader.module.css'

const Loader = () => {
	return (
		<div className={classes.loader}>
			<img src={loader} alt="loader" />
		</div>
	)
}

export default Loader
