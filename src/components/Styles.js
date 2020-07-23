import styled from "styled-components"

const Button = styled.button`
  background: #f3f4f8;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  text-align: center;
  transition: 0.3s;
  box-shadow: 0 4px #c7c7d9;
  transform: translateY(-2px);
  
  &:hover {
    box-shadow: 0 4px #8282bd;
    transform: translateY(-2px);
  }
  
  &:active {
    background: #5356f5;
    box-shadow: 0 2px #2d2d58;
    transform: translateY(0px);
    color: #f3f4f8;
  }
`

const Input = styled.input.attrs(props => ({type: "email"}))`
  border-radius: 8px;
  border: 2px solid #c7c7d9;
  background-color: #f3f4f8;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  margin-right: 20px;
  max-width: 30vw;
  min-width: 20vw;
  
  ::placeholder {
    color: #c7c7d9;
    opacity: 1;
  }
`

const FormSubtext = styled.p`
  color: #c7c7d9;
`

const MOOSE = styled.h1`
  font-weight: bold;
  font-size: 42px;
  color: #f3f4f8;
  padding-top: 3vh;
`

const H1 = styled.h1`
  color: #f3f4f8;
  font-size: 54px;
`

const Text = styled.p`
  color: #f3f4f8;
  font-size: 20px;
`

const Warning = styled.p`
  font-weight: bold;
  background: #f6c09c;
  color: #2a2a2a;
  padding: 10px 10px;
  margin: 0;
`


export default {Button, Input, FormSubtext, MOOSE, H1, Text, Warning}