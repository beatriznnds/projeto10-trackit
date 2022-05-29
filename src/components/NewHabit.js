import styled from 'styled-components'
import axios from 'axios'
import { useContext, useState} from 'react'
import UserContext from '../contexts/UserContext'
import { ThreeDots } from 'react-loader-spinner'

export default function NewHabit ({ getListHabits, formDisplayHidden, setFormDisplayHidden }) {

    const { user } = useContext(UserContext)
    const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    const [newHabit, setNewHabit] = useState({ name: "", days: [] });
    const [loading, setLoading] = useState(false);

    function sendHabit (event) {
        event.preventDefault();
        console.log(sendHabit)
        if (newHabit.days.length > 0) {
            setLoading(true)
        } else {
            alert('Problemas ao mandar seu hábito! Tente novamente!')
        }

        const body = { ...newHabit};
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', body, config);
        promise.then((res) => {
            getListHabits();
            setFormDisplayHidden(false);
            setLoading(false);
            setNewHabit({ name: "", days: [] });
        })
        promise.catch(setLoading(false));
    }

    function selectDay (day) {
        if (newHabit.days.includes(day)) {
            setNewHabit({ ...newHabit, days: newHabit.days.filter((d) => d !== day) });
        } else {
            setNewHabit({ ...newHabit, days: [...newHabit.days, day] });
        }
    }

    return formDisplayHidden ? (
        <Form onSubmit={sendHabit}>
            <input
                type="text"
                placeholder="nome do hábito"
                value={newHabit.name}
                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}>       
            </input>
            <Days>
            {   
                
                weekdays.map((day, index) => (
                    <div className="weekday" onClick={() => selectDay(index)}>
                       <Day done={newHabit.days.includes(index)}>{day}</Day>
                    </div>
                ))
                
            }
            </Days>
            <Settings>
                <div onClick={() => setFormDisplayHidden(false)}>
                    <p>Cancelar</p>
                </div>
                <Button type="submit">
                    {
                        loading ?  <ThreeDots color="#ffffff" height={15} width={15}/> 
                        : "Salvar"
                    }
                </Button>
            </Settings>
        </Form>
    ) : (
        <></>
    )
}

const Form=styled.form`
    width: 340px;
    height: 180px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 20px;

    input {
        width: 300px;
        height: 45px;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
    }

    &&:placeholder {
        font-size: 20px;
        color: #dbdbdb;
        padding-left: 5px;
    }

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

const Button=styled.button`
    width: 85px;
    height: 35px;
    border-radius: 5px;
    background-color: #52B6FF;
    color: #ffffff;
    font-size: 16px;
    border: none;

`

const Settings=styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`