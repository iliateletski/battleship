import { useContext } from 'react'
import { Context } from '..'

export const useAppContext = () => {
	return useContext(Context)
}
