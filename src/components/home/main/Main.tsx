import SearchBar from '@/components/home/searchbar/SearchBar'
import classes from './Main.module.css'

const Main = () => {
	return (
		<div className={classes.main}>
			<div className={classes.container}>
				<SearchBar />
			</div>
		</div>
	)
}
export default Main
