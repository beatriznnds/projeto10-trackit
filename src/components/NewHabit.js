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
    const [selected, setSelected] = useState(false);

    function sendHabit (event) {
        event.preventDefault();
        if (newHabit.days.length > 0) {
            setLoading(true)
        } else {
            alert('Problemas ao mandar seu hábito! Tente novamente!')
        }

        const body = { ...newHabit};
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config, body);
        promise.then((res) => {
            getListHabits();
            setFormDisplayHidden(false);
            setLoading(false);
            setNewHabit({ name: "", days: [] });
        })
        promise.catch(setLoading(false));
    }

    function selectDay (day) {
        setSelected(!selected);
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
            {
                weekdays.map((day, index) => {
                    <div onClick={() => selectDay(index)}>
                        <p>{day}</p>
                    </div>
                })
            }
            <div onClick={() => setFormDisplayHidden(false)}>
                <p>Cancelar</p>
            </div>
            <Button type="submit">
                {
                    loading ?  <ThreeDots color="#ffffff" height={15} width={15}/> 
                    : "Salvar"
                }
            </Button>
        </Form>
    ) : (
        <></>
    )
}

const Form=styled.div`
`

const Button=styled.button`
`