import styled from "styled-components"

export const lightTheme = {
    specialText: '#4960F9',
    text: '#09183e',
    background: '#f8f8f8',
    altBackground: '#f8f8f8',
    togglesBackground: 'rgba(245,209,160,0.8)',
    placeholder: '#c7c7d9',
    buttonBackground: '#09183e',
    buttonText: '#f3f4f8',
    buttonPressed: '#4960F9',
    buttonPressedRim: '#2d2d58',
    buttonPressedText: '#f3f4f8',
    buttonAlpha: 'rgba(255, 255, 255, 0.5)',
    chatBubbleBorder: '2px solid #4960F9',
    bubbleBackground: '#09183e',
}

export const darkTheme = {
    specialText: '#FAC172',
    text: '#FAFAFA',
    background: '#09183e',
    altBackground: '#4960f9',
    togglesBackground: 'rgba(60,78,200,0.8)',
    placeholder: '#c7c7d9',
    buttonBackground: '#f3f4f8',
    buttonText: '#09183e',
    buttonPressed: '#4960F9',
    buttonPressedRim: '#2d2d58',
    buttonPressedText: '#f3f4f8',
    buttonAlpha: 'rgba(119,135,245,0.5)',
    chatBubbleBorder: 'none',
    bubbleBackground: '#4960F9',
}

export const mooseTheme = {
    specialText: '#FAC172',
    text: '#FAFAFA',
    background: '#4960F9',
    altBackground: '#09183e',
    togglesBackground: 'rgba(60,78,200,0.8)',
    placeholder: '#c7c7d9',
    buttonBackground: '#f3f4f8',
    buttonText: '#09183e',
    buttonPressed: '#fac172',
    buttonPressedRim: '#09183e',
    buttonPressedText: '#09183e',
    buttonAlpha: 'rgba(255, 255, 255, 0.3)',
    chatBubbleBorder: 'none',
    bubbleBackground: '#09183e',
}

const Background = styled.div`
  text-align: left;
  padding-left: 10vw;
  padding-right: 10vw;
  transition: 0.2s;
  background: ${props => props.theme.background};
`

const AltBackground = styled(Background)`
  background: ${props => props.theme.specialText};
`

const Modal = styled.div`
  text-align: center;
  position: fixed;
  background-color: rgba(0,0,0,0.4);
  top:0;
  right:0;
  bottom:0;
  left:0; 
  z-index: 999;
  transition: 0.3s;
`

const ModalContent = styled.div`
  width: 400px;
  max-width: 80vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2em;
  background: ${props => props.theme.background};
  border-radius: 16px;
`

const ModalVideo = styled(ModalContent)`
  width: 90vw;
  max-width: 90vw;
`

const ToggleDiv = styled.div`
  position: fixed;
  right: 10vw;
  top: 60px;
  z-index: 10;
  border-radius: 32px;
  padding: 4px;
  background: ${props => props.theme.togglesBackground};
`

const ToggleText = styled.span`
  color: ${props => props.theme.text};
`

const ToggleTheme = styled.button`
  background: none;
  border: none;
  padding:12px 12px;
  transition: 0.3s;
  border-radius: 24px;
  box-shadow: none;
  transform: translateY(0px);
  
  &:hover {
    background-color: ${props => props.theme.buttonAlpha};
    box-shadow: none;
    transform: translateY(0px);
  }
  
  &:active {
    transform: translateY(0px);
    box-shadow: none;
    background: ${props => props.theme.buttonAlpha};
  }
`

const FormSubtext = styled.p`
  color: #c7c7d9;
  opacity: ${props => props.theme.opacity};
  transition: 0.3s;
  margin-bottom: 0;
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

const SpecialText = styled.p`
  color: ${props => props.theme.specialText};
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

const BottomBar = styled(Warning)`
  background: ${props => props.theme.altBackground};
  color: ${props => props.theme.text};
`

const LocalVideo = styled.video`
  width: 20vw;
  transform: scale(-1, 1);
`

const RemoteVideo = styled.video`
  float: left;
  width: 100%;
  max-height: 90vh;
`

const VideoBox = styled.div`
  position: absolute;
  z-index: 2;
  float: left;
  margin: 10px;
`

const VideoAcceptButton = styled.button`
  background-color: #5CDB76;
  box-shadow: 0 4px #48ab5c;
  border-radius: 32px;
  fill: white;
  padding: 14px 16px 12px 16px;
  margin: 0 10px;
  
  &:hover {
    fill: #234a2b;
    box-shadow: 0 4px #234a2b;
  }
  
  &:active {
    transform: translateY(0px);
    box-shadow: 0 2px ${props => props.theme.buttonPressedRim};
    fill: ${props => props.theme.buttonPressedText};
  }
`

const VideoDeclineButton = styled(VideoAcceptButton)`
  background-color: #FA6B80;
  box-shadow: 0 4px #b84f5f;
  
  &:hover {
    fill: #622f37;
    box-shadow: 0 4px #622f37;
  }
  
  &:active {
    box-shadow: 0 2px ${props => props.theme.buttonPressedRim};
    fill: ${props => props.theme.buttonPressedText};
  }
`

const VideoOverlay = styled.div`
  position: fixed;
  width: 90vw;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 100;
  margin: 2em;
  border: 2px solid ${props => props.theme.specialText};
  border-radius: 12px;
`

const MessageBox = styled.div`
  background: ${props => props.theme.altBackground};
  border-radius: 16px;
  border: 2px solid ${props => props.theme.specialText};
  height: 350px;
  padding: 20px;
  margin-top: 20px;
  overflow: scroll;
  transition: 0.3s;
`

const Message = styled.div`
  display: inline-block;
  background: ${props => props.theme.background};
  border: ${props => props.theme.chatBubbleBorder};
  border-radius: 12px;
  min-width: 150px;
  max-width: 600px;
  padding: 8px 20px 8px 20px;
  margin-bottom: 10px;
  vertical-align: bottom;
  float: left;
  clear: both;
  transition: 0.3s;
`

const ReplyMessage = styled(Message)`
  text-align: right;
  float: right;
`

const FormError = styled.p`
  display: inline-block;
  width: 80%;
  font-size: 13px;
  text-align: left;
  margin-bottom: 0;
  margin-top: 4px;
`

const RegistrationInput = styled.input`
  display: inline-block;
  width: 80%;
`

const RegistrationTitles = styled.h4`
  display: inline-block;
  font-size: 18px;
  width: 80%;
  margin-bottom: 4px;
  margin-top: 16px;
  padding-top: 0;
  text-align: left;
  color: ${props => props.theme.text};
`

const VideoTag = styled.p`
  position: fixed;
  left: 45px;
  bottom: 30px;
  z-index: 500;
  border-radius: 8px;
  padding: 6px 20px;
  color: #f8f8f8;
  background: #4960F9;
`

const VideoTagAlt = styled(VideoTag)`
  color: #09183e;
  background: #FAC172;
`

const TimeTokenBar = styled.div`
  position: fixed;
  left: 45px;
  bottom: 68px;
  z-index: 500;
  margin-bottom: 16px;
`

const TimeToken = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  display: inline-block;
`

const TimeTokenFill = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #FAC172;
  width: ${({ percent }) => percent}%;
`

const TooltipHover = styled.div`

`

const Tooltip = styled.div`
  color: #fff;
  background-color: rgba(73, 96, 249, 0.5);
  padding: 6px 20px;
  border-radius: 8px;
  position: fixed;
  left: ${({ left }) => left}px;
  bottom: 46px;
  z-index: 900;
  opacity: 0;
  transition: all 0.3s;
`

const TooltipContainer = styled.div`
  & ${TooltipHover}:hover + ${Tooltip} {
    opacity: 100%;
  }
`

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({radius}) => radius * 2}px;
  height: ${({radius}) => radius * 2}px;
  border-radius: 50%;
  background-color: ${({color, active, theme}) => active ? color : theme.bubbleBackground};
  transition: all 0.4s;
  cursor: pointer;
`

const CategoryStyle = styled.div`
  background-color: ${({color, active, theme}) => active ? color : theme.bubbleBackground};
  border-radius: 32px;
  white-space: nowrap;
  transition: all 0.4s;
  padding: ${({radius}) => radius}px ${({radius}) => radius * 2}px;
  cursor: pointer;
`

const CardStyle = styled.div`
  background: #f3f4f8;
  border: none;
  border-radius: 16px;
  padding: 0;
  text-align: center;
  transition: 0.3s;
  box-shadow: 0 4px #c7c7d9;
  transform: translateY(-2px);
  width: 300px;
  height: 350px;
  
  scroll-snap-align: start;
  
  h2, p {
    color: #09183e;
  }
  h4 {
    color: #4960F9;
  }
`

const CardSlider = styled.div`
  display: flex;
  
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
      color: ${props => props.theme.togglesBackground};
      height: 0;
  }
  
  &::-webkit-scrollbar-thumb {
      background: ${props => props.theme.togglesBackground};
      border-radius: 10px;
  }
  
  &::-webkit-scrollbar-track {
      background: transparent;
  }
`

const LinkText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: ${props => props.theme.specialText};
`

export default {lightTheme, darkTheme, mooseTheme, FormSubtext, MOOSE, Subtitle, SpecialText, Text, Warning, Background, AltBackground, Modal, ModalContent, ModalVideo, ToggleTheme, ToggleDiv, ToggleText, LocalVideo, RemoteVideo, VideoBox, VideoAcceptButton, VideoDeclineButton, VideoOverlay, Message, ReplyMessage, MessageBox, FormError, RegistrationInput, RegistrationTitles, VideoTag, VideoTagAlt, TimeTokenBar, TimeToken, TimeTokenFill, Tooltip, TooltipHover, TooltipContainer, Circle, BottomBar, LinkText, CategoryStyle, CardStyle, CardSlider}