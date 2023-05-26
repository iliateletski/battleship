import React from "react"
import { Routes, Route } from 'react-router-dom'
import HomePage from "../pages/HomePage/HomePage"
import { gameRoutes } from "../utils/routes"

const AppRouter = () => {
    
    return (
        <Routes>
            {
                gameRoutes.map(({path, element}) => 
                    <Route key={path} path={path} element={element}/>
                )
            }
                <Route path="*" element={<HomePage/>}/>
        </Routes>
    )
}

export default AppRouter;