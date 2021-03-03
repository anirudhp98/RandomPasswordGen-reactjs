import React, { useState } from 'react'
import {toast,  ToastContainer} from 'react-toastify'
import './App.css'
import {
  numbers, 
  upperCaseLetters, 
  lowerCaseLetters, 
  specialCharacters} from './characters'
import 'react-toastify/dist/ReactToastify.css'
import {COPY_SUCCESS} from './message'

function App() {
  const[password,setPassword] = useState('')
  const[passwordLength, setPasswordLength] = useState(20)
  const[includeUppercase, setIncludeUppercase] = useState(false)
  const[includeLowercase, setIncludeLowercase] = useState(false)
  const[includeNumbers, setIncludeNumbers] = useState(false)
  const[includeSymbols, setIncludeSymbols] = useState(false)

  const handleGeneratePassword = (e) => {

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols)
    notify('You must select atleast one option!',true)
    let characterList = ''
    if(includeLowercase){
      characterList = characterList + lowerCaseLetters
    }

    if(includeUppercase){
      characterList = characterList + upperCaseLetters
    }

    if(includeNumbers){
      characterList = characterList + numbers
    }

    if(includeSymbols){
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))

  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length

    for(let i=0;i< passwordLength;i++){
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()  
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify = (message, hasError = false) => {
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
      toast.info(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    
  }

  const handleCopyPassword = (e) => {
    if(password === ''){
      notify('Nothing to Copy!',true)
    }else{
      copyToClipboard()
    notify(COPY_SUCCESS)
    }
  }

  return (
    <div className="App">
      <div className = "container">
        <div className = "generator">
          <h2 className = "generator-header">
            Password generator
          </h2>
          <div className = "generator-password">
            <h3>{password}</h3>
            <button onClick = {handleCopyPassword} className = "copy-button">
              <i className = 'far fa-clipboard'></i>
            </button>
          </div>
          <div className = "form-group">
            <label htmlFor = "password-length">Password length</label>
            <input 
            defaultValue = {passwordLength}
            onChange = {(e) => setPasswordLength(e.target.value)}
              type = "number"
              id = "password-length"
              name = "password-length" 
              max = "20" 
              min = "8"/>
          </div>
          <div className = "form-group">
          <label htmlFor = "uppercase-letters">Include UPPERCASE letters</label>
            <input 
            checked = {includeUppercase}
            onChange = {(e) => setIncludeUppercase(e.target.checked)}
              type = "checkbox"
              id = "uppercase-letters"
              name = "uppercase-letters" 
              />
          </div>
          <div className = "form-group">
          <label htmlFor = "lowercase-letters">Include lowercase letters</label>
            <input 
            checked = {includeLowercase}
            onChange = {(e) => setIncludeLowercase(e.target.checked)}
              type = "checkbox"
              id = "lowercase-letters"
              name = "lowercase-letters" 
              />
          </div>
          <div className = "form-group">
          <label htmlFor = "numbers">Include numbers</label>
            <input 
            checked = {includeNumbers}
            onChange = {(e) => setIncludeNumbers(e.target.checked)}
              type = "checkbox"
              id = "numbers"
              name = "numbers" 
              />
          </div>
          <div className = "form-group">
          <label htmlFor = "symbols">Include Symbols</label>
            <input 
            checked = {includeSymbols}
            onChange = {(e) => setIncludeSymbols(e.target.checked)}
              type = "checkbox"
              id = "symbols"
              name = "symbols" 
              />
          </div>
          <div>
            <button onClick = {handleGeneratePassword} className = "generator-button">Generate Password</button>
          </div>
          <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover/>
        </div>
      </div>
    </div>
  );
}

export default App;
