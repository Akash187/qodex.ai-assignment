import supabase from '@/database/supabase'
import type { Database } from '@/types/supabase.types'

type TempDataTable = Database['public']['Tables']['temp-data']
export type TempDataRow = TempDataTable['Row']

export const addTempDataAPI = async (addData: TempDataTable['Insert']) => {
	const { data, error } = await supabase.from('temp-data').insert(addData)
	if (error) {
		throw error
	}
	return data
}

export const getAllTempDatAPI = async (user_id: string) => {
	const { data, error } = await supabase
		.from('temp-data')
		.select('*')
		.match({ user_id })
		.order('created_at', { ascending: false })

	if (error) {
		throw error
	}
	return data
}
