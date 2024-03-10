import React from 'react'
import { observer } from 'mobx-react-lite'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppContext } from '../hook/useAppContext'
import Game from '../pages/Game/Game'
import { GAME_ROUTE, HOME_ROUTE } from '../utils/consts'
import { gameRoutes } from '../utils/routes'

const AppRouter = observer(() => {
	const { application } = useAppContext()

	return (
		<Routes>
			{gameRoutes.map(({ path, element }) => (
				<Route key={path} path={path} element={element} />
			))}
			{application.isApp && <Route path={`${GAME_ROUTE}/:roomId`} element={<Game />} />}
			<Route path='*' element={<Navigate to={HOME_ROUTE} />} />
		</Routes>
	)
})
export default AppRouter
