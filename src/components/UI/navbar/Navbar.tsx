import Logo from '@/components/UI/logo/Logo'
import classes from './Navbar.module.css'
import Button from '@/components/UI/Button/Button'
import TempUnit from '@/components/home/temp-unit/TempUnit'
import { useState } from 'react'
import AuthModal from '@/components/home/auth-modal/AuthModal'
import { useGlobalStore } from '@/store/GlobalStore'
import { useMutation } from '@tanstack/react-query'
import { logout } from '@/api/authAPI'

const Navbar = () => {
	const [openModal, setOpenModal] = useState(false)
	const {
		state: { isLoggedIn },
		dispatch
	} = useGlobalStore()

	const { mutate, isPending } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			dispatch({
				type: 'SET_LOGGED_IN',
				payload: { isLoggedIn: false, userId: undefined }
			})
			dispatch({
				type: 'SHOW_ALERT',
				payload: {
					level: 'SUCCESS',
					message: 'Logout successful'
				}
			})
		},
		onError: (error) => {
			console.error('Mutation error:', error)
			dispatch({
				type: 'SHOW_ALERT',
				payload: {
					level: 'ERROR',
					message: error.message || 'An error occurred during logout'
				}
			})
		}
	})
	return (
		<div className={classes.navbar}>
			<div className={classes.container}>
				<div className={classes.left}>
					<button
						onClick={() => dispatch({ type: 'TOGGLE_SIDENAV' })}
						className={classes.openBtn}
					>
						&#9776;
					</button>
					<Logo />
				</div>
				<div className={classes.right}>
					<TempUnit />
					{isLoggedIn ? (
						<Button disabled={isPending} onClick={() => mutate()}>
							Logout
						</Button>
					) : (
						<Button onClick={() => setOpenModal(true)}>Login</Button>
					)}
				</div>
			</div>
			<AuthModal open={openModal} onClose={() => setOpenModal(false)} />
		</div>
	)
}
export default Navbar
