import classes from './Input.module.css'
type IProps = React.InputHTMLAttributes<HTMLInputElement> & {
	ref?: React.Ref<HTMLInputElement>
}

const Input = ({ ...props }: IProps) => {
	return <input className={classes.input} {...props} />
}
export default Input
