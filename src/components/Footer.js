import { useContext } from 'react'
import UserContext from '../contexts/UserContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


export default function Footer () {
    const { progress } = useContext(UserContext);
    return (
        <Container>
            <Link to='/habitos'>
                <h2>Hábitos</h2>
            </Link>
            <Link to="/hoje">
                <CircularProgressbar 
                    className="progress-bar"
                    value={progress}
                    text={"Hoje"}
                    background
                    styles = { buildStyles ( {
                        backgroundColor: '#52B6FF',
                        textColor: '#FFFFFF',
                        pathColor: '#FFFFFF',
                        trailColor: 'transparent'
                    })}
                />
            </Link>
            <Link to='/historico'>
                <h2>Histórico</h2>
            </Link>
        </Container>
    )
}

const Container=styled.div`
    width: 100%;
    height: 70px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    font-size: 18px;
    padding: 20 px;
`