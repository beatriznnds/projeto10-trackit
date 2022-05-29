import styled from 'styled-components'
import UserContext from '../contexts/UserContext'
import { useContext } from 'react'

export default function Header () {
    const { user } = useContext(UserContext);
    return (
        <Container>
            <h1>TrackIt</h1>
            <img src={user.image} />
        </Container>
    )
}

const Container=styled.div`
    width: 100%;
    height: 70px;
    background-color: #126BA5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        z-index: 1;
    }
    
    h1 {
        font-family: 'Playball', cursive;
        color: #ffffff;
        font-size: 40px;
    }
`