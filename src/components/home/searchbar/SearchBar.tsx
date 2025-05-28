import Input from '@/components/UI/input/Input'
import { IconSearch } from '@tabler/icons-react'
import classes from './SearchBar.module.css'
import Button from '@/components/UI/Button/Button'

const SearchBar = () => {
	return (
		<div className={classes.searchBar}>
			<Input placeholder="Enter Place" />
			<Button circular style={{ height: '36px', width: '36px' }}>
				<IconSearch size={24} />
			</Button>
		</div>
	)
}
export default SearchBar
