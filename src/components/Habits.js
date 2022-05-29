import styled from 'styled-components'
import axios from 'axios'
import { useContext, useState, useEffect } from 'react'
import UserContext from '../contexts/UserContext'
import Header from './Header'
import Footer from './Footer'
import NewHabit from './NewHabit'

export default function Habits () {

    const { user } = useContext(UserContext);
    const [habitsList, setHabitsList] = useState([]);
    const [formDisplayHidden, setFormDisplayHidden] = useState(false);
    const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S' ];

    function getListHabits () {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const promise = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);
        promise.then((res) => {
            setHabitsList(res.data)
        })
        promise.catch((err) => {
            console.log(err)
            alert('Problemas ao carregar sua lista de hábitos!')
        })
    }


    useEffect(() => {
        getListHabits();
    }, []);

    function deleteHabit (id) {
        if (window.confirm('Você quer deletar esse hábito?')) {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
            promise.then(getListHabits);
            promise.catch(alert('Problemas ao carregar sua lista de hábitos!'))
        }
    }

    

    return (
        <>
            <Header />
            <Container>
                <HabitsHeader>
                    <h1>Meus hábitos</h1>
                    <Add onClick={()=>setFormDisplayHidden(!formDisplayHidden)}>+</Add>
                </HabitsHeader>
                <NewHabit formDisplayHidden={formDisplayHidden} setFormDisplayHidden={setFormDisplayHidden} getListHabits={() => getListHabits()}/>
                {
                    habitsList.length > 0 ?
                    habitsList.map(({id, name, days}) => (
                        <Habit>
                            <HabitDiv>
                                <p>{name}</p>
                                <ion-icon name="trash-outline"  onClick={() => deleteHabit(id)}></ion-icon>
                            </HabitDiv> 
                            <Days>
                                
                                {weekdays.map((day, index) =>{
                                   console.log(days.includes(index))
                                   return <Day done={days.includes(index)}>{day}</Day>
                                   
                            })}
                            </Days>                       
                         
                        </Habit>
                    ))
                    : <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
                }
            </Container>
            <Footer />
        </>
    )
}

const Container=styled.div`
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-top: 100px;
    padding: 20px;

    h1 {
        color: #126BA5;
        font-size: 24px;
    }

    p {
        color: #666666;
        font-size: 20px;
    }

    ion-icon {
        font-size: 15px;
    }
`
const HabitsHeader=styled.div`
    width: 100%;
    display:flex;
    justify-content: space-between;
`

const Add=styled.div`
    width: 40px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    background-color: #52B6FF;
    border-radius: 5px;

`

const HabitDiv=styled.div`
    display: flex;
    justify-content: space-between;
`

const Habit=styled.div`
    width: 340px;
    height: 90px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
`
const Days=styled.div`
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
`

const Day=styled.p`
    width: 30px;
    height: 30px;
    border: 1px #D4D4D4 solid;
    background-color: ${ props => props.done ? '#CFCFCF' : '#FFFFFF'} ;
    color: ${ props => props.done ? '#FFFFFF' : '#DBDBDB'} ;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    margin-right: 5px;
    border-radius: 5px;
`

