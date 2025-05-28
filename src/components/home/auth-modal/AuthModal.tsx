import Input from '@/components/UI/input/Input'
import Modal from '@/components/UI/modal/Modal'
import classes from './AuthModal.module.css'
import Button from '@/components/UI/Button/Button'
import { useState } from 'react'

type IProps = {
	open: boolean
	onClose: () => void
}

const AuthModal = ({ open, onClose }: IProps) => {
	const [formState, setFormState] = useState<0 | 1>(0) // 0 for login, 1 for register
	const handleFormSwitch = () => {
		setFormState((prev) => (prev === 0 ? 1 : 0))
	}
	const inputStyle = { border: '1px solid black' }
	return (
		<Modal
			title={formState === 0 ? 'Login' : 'Register'}
			open={open}
			onClose={onClose}
		>
			<form className={classes.form} onSubmit={(e) => e.preventDefault()}>
				{formState === 1 && (
					<div>
						<label htmlFor="name">Name:</label>
						<Input
							type="name"
							id="name"
							name="name"
							required
							style={inputStyle}
						/>
					</div>
				)}
				<div>
					<label htmlFor="email">Email:</label>
					<Input
						type="email"
						id="email"
						name="email"
						required
						style={inputStyle}
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<Input
						type="password"
						id="password"
						name="password"
						required
						style={inputStyle}
					/>
				</div>
				<Button type="submit">Submit</Button>
				{formState === 0 ? (
					<div className={classes.switchForm}>
						Don't have an account?{' '}
						<span onClick={handleFormSwitch} className={classes.link}>
							Register
						</span>
					</div>
				) : (
					<div className={classes.switchForm}>
						Already have an account?{' '}
						<span onClick={handleFormSwitch} className={classes.link}>
							Login
						</span>
					</div>
				)}
			</form>
		</Modal>
	)
}
export default AuthModal
