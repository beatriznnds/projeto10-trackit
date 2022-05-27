import styled from "styled-components";


export default function TodayHabit({habit, handleClick}) {
    const { name, currentSequence, highestSequence, done } = habit;
    return (
        <Container done={done} currentSequence={currentSequence} highestSequence={highestSequence} >
            <h1>{name}</h1>
            <p>Sequência atual: <span>{currentSequence} dias</span></p>
            <p>Seu recorde: <span>{highestSequence} dias</span></p>
            <Icon name="checkmark-outline" onClick={handleClick}></Icon>
        </Container>   
    )
}

const Container=styled.div`
    width: 340px;
    height: 95px;
    background-color:#f7f7f7;
    border-radius: 5px;
    margin-bottom: 10px;

    h1 {
        font-size: 20px;
        color: #666666;
    }

    p {
        font-size: 15px;
        color: #666666;
    }
`

const Icon=styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    background-color: ${props => props.done ? '#8FC549' :  '#EBEBEB'};
    color: #ffffff;
    cursor:pointer;
    ion-icon{
      font-size: 40px;
      --ionicon-stroke-width: 75px;
    }

`