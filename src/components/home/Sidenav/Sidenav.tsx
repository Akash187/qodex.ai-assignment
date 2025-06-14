import { getAllTempDatAPI } from '@/api/tempData'
import classes from './Sidenav.module.css'
import Logo from '@/components/UI/logo/Logo'
import { useGlobalStore } from '@/store/GlobalStore'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/UI/loader/Loader'
import Temp from '@/components/home/temp/Temp'
import dayjs from 'dayjs'

const Sidenav = () => {
	const {
		state: { openedSidenav, isLoggedIn, userId },
		dispatch
	} = useGlobalStore()

	const { data, isError, isLoading } = useQuery({
		queryKey: ['tempData', userId],
		queryFn: () => {
			return getAllTempDatAPI(userId!)
		},
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
		enabled: isLoggedIn,
		staleTime: 1000 * 60 * 5 // 5 minutes
	})

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
					{(!data || data.length === 0) && (
						<div className={classes.contentAlert}>
							{isLoading && <Loader />}
							{!isLoggedIn && <div>Login to See Saved Data</div>}
							{isError && (
								<div style={{ color: 'red', textAlign: 'center' }}>
									Failed to load data
								</div>
							)}
							{data?.length === 0 && (
								<div style={{ textAlign: 'center' }}>
									No saved temperature data found.
								</div>
							)}
						</div>
					)}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							overflowY: 'auto',
							maxHeight: 'calc(100vh - 60px)' // Adjust height based on header
						}}
					>
						{data?.map((tempData) => (
							<div
								key={tempData.id}
								style={{
									display: 'flex',
									flexDirection: 'column',
									borderBottom: '1px solid #ccc',
									padding: '0.5rem 1rem'
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between'
									}}
								>
									<h3>{tempData.place}</h3>
									<Temp temp={tempData.temp} />
								</div>
								<p>
									Saved At:{' '}
									{dayjs(tempData.created_at).format('DD/MM/YYYY h:mm A')}
								</p>
							</div>
						))}
					</div>
				</div>
			</nav>
			{/* Button to open on mobile */}
		</>
	)
}

export default Sidenav
