import "../assets/reset.css";
import "../assets/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import UserContext from '../contexts/UserContext.js'
import Login from './Login';
import SignUp from './SignUp';
import Habits from './Habits';
import Today from './Today';
import DataHistory from './DataHistory';

export default function App () {

    const [user, setUser] = useState(
        localStorage.getItem('userdata')
            ? JSON.parse(localStorage.getItem('userdata'))
            : null
    );
    const [progress, setProgress] = useState(0);

    console.log(user)
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