import { GAME_ROUTE, HOME_ROUTE, SHIPS_ROUTE } from "./consts"
import HomePage from '../pages/HomePage/HomePage'
import PlaceShips from '../pages/PlaceShips/PlaceShips'
import RequireGame from "../hoc/RequireGame"

 
export const gameRoutes = [
    {path: HOME_ROUTE, element: <HomePage/>},
    {path: SHIPS_ROUTE, element: <RequireGame/>},
    {path: `${SHIPS_ROUTE}/:roomId`, element: <RequireGame><PlaceShips/></RequireGame>},
]