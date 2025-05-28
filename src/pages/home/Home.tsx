import Main from '@/components/home/main/Main'
import Alert from '@/components/UI/alert/Alert'
import Navbar from '@/components/UI/navbar/Navbar'
import supabase from '@/database/supabase'
import { useGlobalStore } from '@/store/GlobalStore'
import { useEffect } from 'react'

const Home = () => {
	const {
		state: { showAlert, alertLevel, alertMessage, isLoggedIn },
		dispatch
	} = useGlobalStore()

	useEffect(() => {
		const helper = async () => {
			if (isLoggedIn) {
				return
			}
			const { data, error } = await supabase.auth.getUser()

			if (error) {
				dispatch({
					type: 'SET_LOGGED_IN',
					payload: {
						userId: undefined,
						isLoggedIn: false
					}
				})
			} else {
				dispatch({
					type: 'SET_LOGGED_IN',
					payload: {
						userId: data.user.id,
						isLoggedIn: true
					}
				})
			}
		}
		helper()
	}, [])

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
