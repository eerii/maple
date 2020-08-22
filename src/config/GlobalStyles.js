import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Lato, Open-Sans, Helvetica, Sans-Serif, sans-serif;
  }
  p {
    font-size: 16px;
    color: ${props => props.theme.text};
    line-height: 1.6;
  }
  span {
    color: ${props => props.theme.text};
  }
  h1 {
    color: ${props => props.theme.text};
    font-size: 50px;
    margin-top: 0;
  }
  h2 {
    color: ${props => props.theme.text};
  }
  h4 {
    color: ${props => props.theme.text};
  }
  a {
    color: ${props => props.theme.specialText};
  }
  button {
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
      background: ${props => props.theme.buttonPressed};
      box-shadow: 0 2px ${props => props.theme.buttonPressedRim};
      transform: translateY(0px);
      color: ${props => props.theme.buttonPressedText};
    }
    
    &:disabled {
      cursor: not-allowed;
      pointer-events: none;
      color: #c7c7d9
    }
  }
  input {
    border-radius: 8px;
    border: 2px solid #c7c7d9;
    background-color: #f3f4f8;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
  
    ::placeholder {
      color: ${props => props.theme.placeholder};
      opacity: 1;
    }
  }
  textarea {
    border-radius: 8px;
    border: 2px solid #c7c7d9;
    background-color: #f3f4f8;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
    font-family: Lato, Open-Sans, Helvetica, Sans-Serif, sans-serif;
  
    ::placeholder {
      color: ${props => props.theme.placeholder};
      opacity: 1;
    }
  }
  video {
    background: ${props => props.theme.altBackground};
    border: 2px solid ${props => props.theme.specialText};
    border-radius: 12px;
  }
  .wsdm-tooltip {
      display: none;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 3px;
      pointer-events: none;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      z-index: 8000;
      
      &:after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          top: 100%;
          left: 50%;
          margin-left: -0.5rem;
          border-left: 0.5rem solid transparent;
          border-right: 0.5rem solid transparent;
          border-top: 0.5rem solid rgba(255, 255, 255, 0.95);
      }
  }
`

export default GlobalStyle