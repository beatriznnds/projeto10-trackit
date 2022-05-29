import { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import UserContext from '../contexts/UserContext'
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
export default function DataHistory () {

    const { user } = useContext(UserContext);

    return (
        <>
            <Header />
            <Container>
                <h1>Meu histórico</h1>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
                                
            </Container>
            <Footer />
        </>
    )

}

const Container=styled.div`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    padding: 20px;

    h1 {
        color: #126ba5;
        font-size: 24px;
        margin-bottom: 10px;
    }

    p {
        font-size: 18px;
        color: #666666;
    }
`