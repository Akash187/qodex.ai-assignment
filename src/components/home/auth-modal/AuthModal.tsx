import Input from '@/components/UI/input/Input'
import Modal from '@/components/UI/modal/Modal'
import classes from './AuthModal.module.css'
import Button from '@/components/UI/Button/Button'
import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { login, register } from '@/api/authAPI'
import { useGlobalStore } from '@/store/GlobalStore'

type IProps = {
	open: boolean
	onClose: () => void
}

const AuthModal = ({ open, onClose }: IProps) => {
	const { dispatch } = useGlobalStore()
	const [formState, setFormState] = useState<0 | 1>(0) // 0 for login, 1 for register
	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const passwordRef = useRef<HTMLInputElement>(null)
	const title = formState === 0 ? 'Login' : 'Register'

	const { mutate, isPending } = useMutation({
		mutationFn: () => {
			const email = emailRef.current?.value
			const password = passwordRef.current?.value
			if (formState === 0) {
				return login(email!, password!)
			} else {
				const name = nameRef.current?.value
				return register(name!, email!, password!)
			}
		},
		onSuccess: (data) => {
			console.log('Success:', data)
			dispatch({
				type: 'SHOW_ALERT',
				payload: {
					level: 'SUCCESS',
					message: `${title} successful`
				}
			})
			dispatch({
				type: 'SET_LOGGED_IN',
				payload: { isLoggedIn: true, userId: data?.user?.id }
			})
			onClose()
		},
		onError: (err) => {
			console.log(err.message)
			dispatch({
				type: 'SHOW_ALERT',
				payload: {
					level: 'ERROR',
					message: err.message || 'An error occurred'
				}
			})
		}
	})

	const handleFormSwitch = () => {
		setFormState((prev) => (prev === 0 ? 1 : 0))
	}
	const inputStyle = { border: '1px solid black', fontSize: '1rem' }
	return (
		<Modal title={title} open={open} onClose={onClose}>
			<form
				className={classes.form}
				onSubmit={(e) => {
					e.preventDefault()
					mutate()
				}}
			>
				{formState === 1 && (
					<div>
						<label htmlFor="name">Name:</label>
						<Input
							type="name"
							id="name"
							name="name"
							required
							style={inputStyle}
							ref={nameRef}
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
						ref={emailRef}
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
						ref={passwordRef}
					/>
				</div>
				<Button type="submit" disabled={isPending}>
					Submit
				</Button>
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
