import logo from '../assets/logo.png'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThreeDots } from "react-loader-spinner";
import styled from 'styled-components'


export default function SignUp () {
    const [data, setData] = useState({email: "", name: "", image: "", password: ""})
    const navigate = useNavigate();
    const [dataLoading, setDataLoading] = useState({loading: false, classNameLoading: ""})

    function sendData (event) {
        event.preventDefault();
        setDataLoading({...dataLoading, loading: true, classNameLoading: "input-disabled"})

        const promise = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', {
            email: data.email,
            name: data.name,
            image: data.image,
            password: data.password
        });
        promise.then((res) => {
            navigate('/')
        }) 
        promise.catch((err) => {
            alert('Houve um erro no Cadastro! Verifique os dados.')
        })       
    }

    return (
        <Container>
            <img src={logo} />
            <Form onSubmit={sendData}>
                <input
                    value={data.email}
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setData({...data, email: e.target.value})}
                    required
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                />
                <input
                    value={data.password}
                    type="password"
                    name="password"
                    placeholder="senha"
                    onChange={(e) => setData({...data, password: e.target.value})}
                    required
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                />
                <input
                    value={data.name}
                    type="name"
                    name="name"
                    placeholder="nome"
                    onChange={(e) => setData({...data, name: e.target.value})}
                    required
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                />
                <input
                    value={data.image}
                    type="text"
                    name="name"
                    placeholder="foto de perfil"
                    onChange={(e) => setData({...data, image: e.target.value})}
                    required
                    disabled={dataLoading.loading}
                    className={dataLoading.classNameLoading}
                />                
            </Form>
            <Button disabled={dataLoading}>
                {dataLoading.loading ? (
                    <ThreeDots
                        color="#FFFFFF"
                        height={15}
                        width={50}

                    />
                ) : (
                    "Cadastrar"
                )}
            </Button>
            <Link to='/'>
                <p>Já tem uma conta? Faça login!</p>
            </Link>
        </Container>
    )
}

const Container=styled.div`
    width: 100%;
    height: 100vh
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: 75px;

    p {
        font-size: 15px;
        color: #52b6ff;
        text-decoration: underline;
        margin-bottom: 100px;
    }

    img {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
`
const Form=styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

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

`