import Logo from '@/components/UI/logo/Logo'
import classes from './Navbar.module.css'
import Button from '@/components/UI/Button/Button'
import TempUnit from '@/components/home/temp-unit/TempUnit'

const Navbar = () => {
	return (
		<div className={classes.navbar}>
			<div className={classes.container}>
				<Logo />
				<div className={classes.right}>
					<TempUnit />
					<Button onClick={() => console.log('hello')}>Login</Button>
				</div>
			</div>
		</div>
	)
}
export default Navbar
