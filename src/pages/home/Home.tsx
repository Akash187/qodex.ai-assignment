import Main from '@/components/home/main/Main'
import Alert from '@/components/UI/alert/Alert'
import Navbar from '@/components/UI/navbar/Navbar'
import { useGlobalStore } from '@/store/GlobalStore'

const Home = () => {
	const {
		state: { showAlert, alertLevel, alertMessage },
		dispatch
	} = useGlobalStore()
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
