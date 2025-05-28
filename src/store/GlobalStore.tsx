import React, { createContext, useContext, useReducer } from 'react'

type TempUnit = 0 | 1 // 0 = Celsius, 1 = Fahrenheit

type State = {
	unit: TempUnit
	showAlert: boolean
	alertLevel: 'ERROR' | 'SUCCESS'
	alertMessage: string
	isLoggedIn?: boolean
}
type Action =
	| { type: 'SET_UNIT'; payload: TempUnit }
	| {
			type: 'SHOW_ALERT'
			payload: { level: 'ERROR' | 'SUCCESS'; message: string }
	  }
	| { type: 'HIDE_ALERT' }
	| { type: 'SET_LOGGED_IN'; payload: boolean }

type IProps = {
	children: React.ReactNode
}

const GlobalStoreContext = createContext<
	| {
			state: State
			dispatch: React.Dispatch<Action>
	  }
	| undefined
>(undefined)

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_UNIT':
			return { ...state, unit: action.payload }
		case 'SHOW_ALERT':
			return {
				...state,
				showAlert: true,
				alertLevel: action.payload.level,
				alertMessage: action.payload.message
			}
		case 'HIDE_ALERT':
			return {
				...state,
				showAlert: false,
				alertLevel: 'SUCCESS',
				alertMessage: ''
			}
		case 'SET_LOGGED_IN':
			return { ...state, isLoggedIn: action.payload }
		default:
			return state
	}
}

export const GlobalStoreProvider = ({ children }: IProps) => {
	const [state, dispatch] = useReducer(reducer, {
		unit: 0,
		showAlert: false,
		alertLevel: 'SUCCESS',
		alertMessage: '',
		isLoggedIn: false
	})
	return (
		<GlobalStoreContext.Provider value={{ state, dispatch }}>
			{children}
		</GlobalStoreContext.Provider>
	)
}

export const useGlobalStore = () => {
	const context = useContext(GlobalStoreContext)
	if (!context)
		throw new Error('useGlobalStore must be used within GlobalStoreProvider')
	return context
}
