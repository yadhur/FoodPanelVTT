import { Routes, Route } from "react-router-dom";
import { Dashboard,FoodList,FoodDetails, FoodForm } from "../pages";

const MainRoutes = () => {

    return(
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/list" element={<FoodList />} />
            <Route path="/details/:id" element={<FoodDetails />} />
            <Route path="/food/add" element={<FoodForm />} />
            <Route path="/food/update/:id" element={<FoodForm />} />
            
        </Routes>
    )
}

export default MainRoutes;