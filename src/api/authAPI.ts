import supabase from '@/database/supabase'

export const login = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	})
	if (error) {
		throw error
	}

	return data
}

export const register = async (
	name: string,
	email: string,
	password: string
) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name
			}
		}
	})
	if (error) {
		throw error
	}

	return data
}

export const logout = async () => {
	const { error } = await supabase.auth.signOut()
	if (error) {
		throw error
	}
	return true
}

export const getUserSession = async () => {
	const { data, error } = await supabase.auth.getUser()

	if (error) {
		throw error
	}
	return data.user
}
