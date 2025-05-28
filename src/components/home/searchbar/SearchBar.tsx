import Input from '@/components/UI/input/Input'
import { IconSearch } from '@tabler/icons-react'
import classes from './SearchBar.module.css'
import Button from '@/components/UI/Button/Button'

type IProps = {
	isLoading?: boolean
	setCity: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar = ({ setCity, isLoading }: IProps) => {
	return (
		<form
			className={classes.searchBar}
			onSubmit={(e) => {
				e.preventDefault()
				const input = e.target as HTMLFormElement
				const place = (input.elements.namedItem('place') as HTMLInputElement)
					.value
				if (place.trim() !== '') {
					setCity(place.trim())
					localStorage.setItem('city', place.trim())
				}
			}}
		>
			<Input name="place" placeholder="Enter Place" />
			<Button
				disabled={isLoading}
				type="submit"
				circular
				style={{ height: '36px', width: '36px' }}
			>
				<IconSearch size={24} />
			</Button>
		</form>
	)
}
export default SearchBar
