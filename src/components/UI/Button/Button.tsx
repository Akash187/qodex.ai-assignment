type IProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode
}
import classes from './Button.module.css'

const Button = ({ children, ...rest }: IProps) => {
	return (
		<button className={classes.button} {...rest}>
			{children}
		</button>
	)
}
export default Button
