import { getUserSession } from '@/api/authAPI'
import Main from '@/components/home/main/Main'
import Alert from '@/components/UI/alert/Alert'
import Navbar from '@/components/UI/navbar/Navbar'
import { useGlobalStore } from '@/store/GlobalStore'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
	const {
		state: { showAlert, alertLevel, alertMessage, isLoggedIn },
		dispatch
	} = useGlobalStore()

	const { data, isError } = useQuery({
		queryKey: ['userSession'],
		queryFn: getUserSession,
		enabled: !isLoggedIn, // Only fetch if not logged in
		staleTime: 1000 * 60 * 5 // 5 minutes
	})

	if (data?.user && !isLoggedIn) {
		dispatch({
			type: 'SET_LOGGED_IN',
			payload: {
				userId: data.user.id,
				isLoggedIn: true
			}
		})
	} else if (isError) {
		dispatch({
			type: 'SET_LOGGED_IN',
			payload: {
				userId: undefined,
				isLoggedIn: false
			}
		})
	}

	return (
		<div>
			<Navbar />
			<Main />
			{showAlert && (
				<Alert
					level={alertLevel}
					message={alertMessage}
					onClose={() => dispatch({ type: 'HIDE_ALERT' })}
				/>
			)}
		</div>
	)
}
export default Home
