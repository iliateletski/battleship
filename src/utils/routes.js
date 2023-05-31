import { GAME_ROUTE, HOME_ROUTE, SHIPS_ROUTE } from "./consts"
import HomePage from '../pages/HomePage/HomePage'
import Game from '../pages/Game/Game'
import PlaceShips from '../pages/PlaceShips/PlaceShips'

 
export const gameRoutes = [
    {path: HOME_ROUTE, element: <HomePage/>},
    {path: GAME_ROUTE, element: <Game/>},
    {path: SHIPS_ROUTE, element: <PlaceShips/>},
    {path: `${SHIPS_ROUTE}/:roomId`, element: <PlaceShips/>},
]