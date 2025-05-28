import Logo from '@/components/UI/logo/Logo'
import classes from './Navbar.module.css'
import Button from '@/components/UI/Button/Button'
import TempUnit from '@/components/home/temp-unit/TempUnit'
import { useState } from 'react'
import AuthModal from '@/components/home/auth-modal/AuthModal'

const Navbar = () => {
	const [openModal, setOpenModal] = useState(false)
	return (
		<div className={classes.navbar}>
			<div className={classes.container}>
				<Logo />
				<div className={classes.right}>
					<TempUnit />
					<Button onClick={() => setOpenModal(true)}>Login</Button>
				</div>
			</div>
			<AuthModal open={openModal} onClose={() => setOpenModal(false)} />
		</div>
	)
}
export default Navbar
