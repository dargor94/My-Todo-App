import React from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "./features/home/Home";
import {ProtectedComponent} from "./features/auth/ProtectedComponent";


export const App = () => {

    return (
        <Routes>
            <Route path={"/"} exact element={<ProtectedComponent component={Home}/>}/>
        </Routes>
    );
}