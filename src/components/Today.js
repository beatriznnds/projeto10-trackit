import axios from 'axios'
import { useEffect, useContext, useState } from 'react'
import UserContext from  "../contexts/UserContext"
import Header from './Header'
import Footer from './Footer'
import TodayHabit from './TodayHabit'
import styled from 'styled-components'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export default function Today () {
    const {user, progress, setProgress} = useContext(UserContext);
    const [habitsList, setHabitsList] = useState();
    const date = dayjs().locale('pt-br').format('dddd, DD/MM');


    function listTodayHabits () {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const promise =  axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config)
        promise.then((res) => {
            setHabitsList(res.data);
            setProgress(
                (res.data.filter((habit) => habit.done).length /
                res.data.length) * 100
            )
        })
        promise.catch(alert('Erro ao carregar lista!'))

    }

    function toggle(id) {
        habitsList.find((habit) => habit.id === id).done
            ? uncheckHabit(id)
            : checkHabit(id)
    }

    const checkHabit = (id) =>  {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, null, config);
        promise.then(listTodayHabits);
        promise.catch(alert('Algo deu errado!'))
    }

    const uncheckHabit = (id) =>  {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, null, config);
        promise.then(listTodayHabits);
        promise.catch(alert('Algo deu errado!'))
    }

    useEffect(() => {
        if (localStorage.getItem('userdata')) {
            listTodayHabits();
        }
    }, []);

    return (
        <>
        <Container>
            <Header />
            <h2>{date}</h2>
            {
                habitsList ? (
                    progress > 0 ? (
                        <Subtitle>{progress.toFixed()}% dos hábitos concluídos</Subtitle>
                    ) : (
                        <Subtitle>Nenhum hábito concluído ainda</Subtitle>
                    )
                ) : (
                    <></>
                )
            }
            <Habits>
                {
                    habitsList ? (
                    habitsList.map((value, index) => <TodayHabit key={index} value={value} handleClick={() => toggle(value.id)} /> ))
                    :
                    <p>Você não tem hábitos para hoje.</p>
                }
            </Habits>
        </Container>
        <Footer />
        </>
    )

}

const Container=styled.div`
    margin-top: 200px;
    display: flex;
    align-items: center;
    flex-direction: column;

    h2 {
        font-size: 24px;
        color: #126BA5;
        text-transform: capitalize;
    }
`

const Subtitle=styled.p`
    font-size: 18px;
    color: ${props => props.done ? '#8FC549' : '#bababa'}
    margin-top: 10px;
    margin-bottom: 30px;
`

const Habits=styled.div`
    p {
        color: #bababa;
        font-size: 18px;
        margin-left: 20px;
    }
`