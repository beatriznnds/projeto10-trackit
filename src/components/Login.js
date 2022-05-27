import axios from 'axios'
import styled from 'styled-components'
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import UserContext from  "../contexts/UserContext"
import logo from '../assets/logo.png'


export default function Login () {

    const navigate = useNavigate();
    const [data, setData] = useState({email: "", password: ""});
    const [disable, setDisable] = useState(false);
    const [buttonText, setButtonText] = useState('Entrar');
    const { user, setUser } = useContext(UserContext);

    function Login (event) {
        event.preventDefault();
        setDisable(true)
        setButtonText( <ThreeDots color="#FFFFFF" height={15} width={50} /> )

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', {
            email: data.email,
            password: data.password
        });
        promise.then((res) => {
            localStorage.setItem("userdata", ({
                name: res.data.name, 
                email: res.data.email,
                image: res.data.image, 
                token: res.data.token 
            }));
            const { user } = res.data
            navigate('/hoje');
            setUser({...user, name: user.name, image: user.image, email: user.email, token: user.token});
        })
        promise.catch((err) =>{
            alert('Houve um erro no Cadastro! Verifique os dados.')
            setDisable(false);
            setButtonText('Entrar')
        })
    }

    return (
        <Container>
            <img src={logo} />
            <Form onSubmit={Login}>
                <input
                    type="email"
                    placeholder="email"
                    value={data.email}
                    required
                    disabled={disable}
                    onChange={(e) => setData({...data, email: e.target.value})} 
                />
                <input
                    type="password"
                    placeholder="senha"
                    value={data.password}
                    required
                    disabled={disable}
                    onChange={(e) => setData({...data, password: e.target.value})} 
                />
                <Button disabled={disable} type="submit">
                    {buttonText}
                </Button>
                {
                    disable ?
                    <p>Não tem uma conta? Cadastre-se!</p> :
                    <Link to='/cadastro'>
                        <p>Não tem uma conta? Cadastre-se!</p>
                    </Link>

                }
            </Form>

        </Container>

    )
}

const Container=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 75px;

    p {
        font-size: 15px;
        color: #52b6ff;
        text-decoration: underline;
        margin-bottom: 100px;
        margin-top: 10px;
    }


    a {
        text-decoration: none;
    }
`

const Form=styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;

    input {
        width: 300px;
        height: 45px;
        border-radius: 5px;
        font-size: 16px;
        border: 1px solid #d5d5d5;
        margin-bottom: 5px;
        padding-left: 10px;
        background-color: #ffffff;
    }

    &::placeholder {
        font-size: 20px;
        color: #dbdbdb;
    }
`

const Button=styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 45px;
    background-color: #52b6ff;
    border-radius: 5px;
    font-size: 20px;
    color: #ffffff;
    margin-top: 25px;

`