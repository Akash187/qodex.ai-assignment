import classes from './Sidenav.module.css'
import Logo from '@/components/UI/logo/Logo'
import { useGlobalStore } from '@/store/GlobalStore'

const Sidenav = () => {
	const {
		state: { openedSidenav },
		dispatch
	} = useGlobalStore()

	return (
		<>
			{/* Overlay for mobile */}
			<div
				className={`${classes.overlay} ${openedSidenav ? classes.show : ''}`}
				onClick={() => dispatch({ type: 'TOGGLE_SIDENAV' })}
			/>
			<nav
				className={`${classes.sidenav} ${openedSidenav ? classes.open : ''}`}
			>
				<div style={{ display: 'flex', alignItems: 'center', height: '60px' }}>
					<Logo />
					<button
						className={classes.closeBtn}
						onClick={() => dispatch({ type: 'TOGGLE_SIDENAV' })}
					>
						&times;
					</button>
				</div>
				<div className={classes.content}>
					<div className={classes.contentAlert}>
						<div>No Data Found</div>
						{/* <div>Login to See Saved Data</div> */}
					</div>
				</div>
			</nav>
			{/* Button to open on mobile */}
		</>
	)
}

export default Sidenav
