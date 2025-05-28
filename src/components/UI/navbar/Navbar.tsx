import Logo from '@/components/UI/logo/Logo'
import classes from './Navbar.module.css'
import Button from '@/components/UI/Button/Button'

const Navbar = () => {
	return (
		<div className={classes.navbar}>
			<div className={classes.container}>
				<Logo />
				<div>
					<Button onClick={() => console.log('hello')}>Login</Button>
				</div>
			</div>
		</div>
	)
}
export default Navbar
