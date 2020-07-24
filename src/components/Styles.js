import styled from "styled-components"

export const lightTheme = {
    specialText: '#4960F9',
    text: '#09183e',
    background: '#f8f8f8',
    placeholder: '#FAC172',
}
export const darkTheme = {
    specialText: '#FAC172',
    text: '#FAFAFA',
    background: '#09183e',
    placeholder: '#c7c7d9',
}

const HeaderStyle = styled.div`
  text-align: left;
  margin-top: 0;
  padding-left: 10vw;
  padding-right: 10vw;
  background: ${props => props.theme.background};
  min-height: 100vh;
  transition: 0.2s;
`

const Button = styled.button`
  background: #f3f4f8;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #09183e;
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
    background: #4960F9;
    box-shadow: 0 2px #2d2d58;
    transform: translateY(0px);
    color: #f3f4f8;
  }
`

const ToggleTheme = styled.button`
  background: none;
  border: none;
  font-size:20px;
  padding:12px 12px;
  transition: 0.3s;
  margin-top: 20px;
  float: right;
  border-radius: 24px;
  
  &:hover {
    background-color: rgba(73,96,249,0.4);
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
    color: ${props => props.theme.placeholder};
    opacity: 1;
  }
`

const FormSubtext = styled.p`
  color: #c7c7d9;
  opacity: ${props => props.theme.opacity};
  transition: 0.3s;
`

const MOOSE = styled.h1`
  font-weight: bold;
  font-size: 60px;
  color: ${props => props.theme.text};
  padding-top: 15vh;
  margin-top: 0;
`

const Subtitle = styled.h1`
  color: ${props => props.theme.specialText};
  font-size: 50px;
  padding-bottom: 20px;
`

const Text = styled.p`
  color: ${props => props.theme.text};
  font-size: 20px;
`

const Link = styled.a`
  color: ${props => props.theme.specialText};
`

const Warning = styled.p`
  font-weight: bold;
  background: #FAC172;
  color: #2a2a2a;
  padding: 10px 10px;
  margin: 0;
`


export default {lightTheme, darkTheme, Button, Input, FormSubtext, MOOSE, Subtitle, Text, Warning, HeaderStyle, Link, ToggleTheme}