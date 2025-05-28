import Logo from '@/components/UI/logo/Logo'
import classes from './PageLoader.module.css'
import Loader from '@/components/UI/loader/Loader'

const PageLoader = () => {
	return (
		<div className={classes.pageLoader}>
			<Logo />
			<Loader />
		</div>
	)
}
export default PageLoader
