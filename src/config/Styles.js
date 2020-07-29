import styled from "styled-components"

export const lightTheme = {
    specialText: '#4960F9',
    text: '#09183e',
    background: '#f8f8f8',
    placeholder: '#FAC172',
    buttonPressed: '#4960F9',
    buttonPressedRim: '#2d2d58',
    buttonPressedText: '#f3f4f8',
}

export const darkTheme = {
    specialText: '#FAC172',
    text: '#FAFAFA',
    background: '#09183e',
    placeholder: '#c7c7d9',
    buttonPressed: '#4960F9',
    buttonPressedRim: '#2d2d58',
    buttonPressedText: '#f3f4f8',
}

export const mooseTheme = {
    specialText: '#FAC172',
    text: '#FAFAFA',
    background: '#4960F9',
    placeholder: '#c7c7d9',
    buttonPressed: '#FAC172',
    buttonPressedRim: '#09183e',
    buttonPressedText: '#09183e',
}

const Background = styled.div`
  text-align: left;
  padding-left: 10vw;
  padding-right: 10vw;
  transition: 0.2s;
  background: ${props => props.theme.background};
  min-height: 100vh;
`

const LoginBackground = styled(Background)`
  text-align: center;
`

const ToggleTheme = styled.button`
  background: none;
  border: none;
  padding:12px 12px;
  transition: 0.3s;
  margin-top: 20px;
  float: right;
  border-radius: 24px;
  box-shadow: none;
  transform: translateY(0px);
  
  &:hover {
    background-color: rgba(73,96,249,0.4);
    box-shadow: none;
    transform: translateY(0px);
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
  padding-top: 15vh;
`

const Subtitle = styled.h1`
  color: ${props => props.theme.specialText};
  padding-bottom: 20px;
`

const Text = styled.p`
  font-size: 20px;
`

const Warning = styled.p`
  font-weight: bold;
  background: #FAC172;
  color: #2a2a2a;
  padding: 10px 10px;
  margin: 0;
`


export default {lightTheme, darkTheme, mooseTheme, FormSubtext, MOOSE, Subtitle, Text, Warning, Background, LoginBackground, ToggleTheme}