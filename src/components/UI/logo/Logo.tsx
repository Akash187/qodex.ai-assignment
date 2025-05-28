import logo from '@/assets/logo.svg'
import classes from './Logo.module.css'

const Logo = () => {
	return (
		<div className={classes.logo}>
			<img className={classes.icon} src={logo} alt="Logo" />
			<div className={classes.text}>Weather App</div>
		</div>
	)
}
export default Logo
