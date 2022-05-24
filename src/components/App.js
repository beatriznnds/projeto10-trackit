import "../assets/reset.css";
import "../assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from '../contexts/UserContext.js'
import Login from './Login';
import SignUp from './SignUp';
import Habits from './Habits';
import Today from './Today';
import DataHistory from './DataHistory';

export default function App () {

    const lastUser = JSON.parse(localStorage.getItem("Last User"))
    const [user, setUser] = useState(lastUser);
    const [progress, setProgress] = useState(0);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{user, setUser, progress, setProgress}}>
                <Routes>
                    <Route path='/' element={ <Login/> } />
                    <Route path='/cadastro' element={ <SignUp/> } />
                    <Route path='/habitos' element={ <Habits/> } />
                    <Route path='/hoje' element={ <Today/> } />
                    <Route path='/historico' element={ <DataHistory/> } />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}