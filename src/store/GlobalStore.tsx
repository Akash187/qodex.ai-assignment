import React, { createContext, useContext, useReducer } from 'react'

type TempUnit = 0 | 1 // 0 = Celsius, 1 = Fahrenheit

type State = { unit: TempUnit }
type Action = { type: 'SET_UNIT'; payload: TempUnit }

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
			return { unit: action.payload }
		default:
			return state
	}
}

export const GlobalStoreProvider = ({ children }: IProps) => {
	const [state, dispatch] = useReducer(reducer, { unit: 0 })
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
