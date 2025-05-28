import classes from './Button.module.css'

type IProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode
	circular?: boolean
}

const Button = ({ children, circular, ...rest }: IProps) => {
	const btnClass = circular
		? `${classes.button} ${classes.circular}`
		: classes.button

	return (
		<button className={btnClass} {...rest}>
			{children}
		</button>
	)
}
export default Button
