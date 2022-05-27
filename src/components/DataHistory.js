import { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import UserContext from '../contexts/UserContext'
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
export default function DataHistory () {

    const { user } = useContext(UserContext);
    const {habitsHistory, setHabitsHistory} = useState([]);

    useEffect (() => {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily', config);
        promise.then((res) => setHabitsHistory(res.data))
    })

    return (
        <>
            <Header />
            <Container>
                <h1>Meu histórico</h1>
                {
                    habitsHistory ? (
                        habitsHistory.map((value) =>
                        <p>{value}</p>)
                    ) : (
                        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                    )
                }                
            </Container>
            <Footer />
        </>
    )

}

const Container=styled.div`
`