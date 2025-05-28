import React from 'react'
import classes from './Modal.module.css'

type IProps = {
	open: boolean
	onClose: () => void
	children: React.ReactNode
	title?: React.ReactNode
}

const Modal = ({ open, onClose, children, title }: IProps) => {
	if (!open) return null

	return (
		<div className={classes.backdrop} onClick={onClose}>
			<div className={classes.modal} onClick={(e) => e.stopPropagation()}>
				<button className={classes.close} onClick={onClose} aria-label="Close">
					&times;
				</button>
				{title && <div className={classes.title}>{title}</div>}
				<div className={classes.content}>{children}</div>
			</div>
		</div>
	)
}

export default Modal
