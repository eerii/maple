import React, {useState} from "react"
import { useForm } from "react-hook-form"

import Modal from "../components/Modal"
import CircleSelector from "../components/CircleSelector"

const categories = 10
const startRadius = 72
const colors = ["#f33e7b","#f85a56","#ee8649","#FFC825","#5ABD5D","#3926c6","#2a45e3","#2e8bf8","#29bbff","#5cddb8"]
const names = ["Arts", "Crafts and:Home", "Cooking", "Help with:School", "Music and:Movies", "Language:Learning", "Fitness", "Mindfulness", "Just for:Fun", "Technology"]
const codes = ["A","C","K","S","M","L","F","Mf","J","T"]

//STAGE 0
const WhatINeed = ({ selected, setSelected, handleButton, setWarning }) => {
    return (
        <div style={{maxHeight: "90vh", overflow: "scroll"}}>
            <h1 style={{marginBottom: "8px"}}>What do you need from MOOSE?</h1>
            <p style={{marginTop: "0"}}>Please select from 3 to 5 categories so we can recommend you profiles you will love.</p>

            <CircleSelector startRadius={startRadius} selected={selected} setSelected={setSelected} number={categories} colors={colors} names={names} setMaxError={() => setWarning("high")}/>

            <p style={{marginTop: "0"}}>Don't worry, you can change these at any time from your profile.</p>
            <button onClick={() => handleButton()}>Continue</button>
        </div>
    )
}

//STAGE 1
const WhatIOffer = ({ selected, setSelected, handleButton, setWarning }) => {
    return (
        <div style={{maxHeight: "90vh", overflow: "scroll"}}>
            <h1 style={{marginBottom: "8px"}}>What can you offer MOOSE?</h1>
            <p style={{marginTop: "0"}}>We encourage all our users to share their talents and passions. We are sure you have some!</p>

            <CircleSelector startRadius={startRadius} selected={selected} setSelected={setSelected} number={categories} colors={colors} names={names} setMaxError={() => setWarning("high")}/>

            <p style={{marginTop: "0"}}>Don't worry, you can change these at any time from your profile.</p>
            <button onClick={() => handleButton()}>Continue</button>
        </div>
    )
}

//STAGE 2
const Birthdate = ({ stage, setStage }) => {
    const { register, handleSubmit, errors, setError, clearErrors, reset } = useForm({ mode: "onBlur" })

    const handleNext = (data) => {
        let dateStr = `${data.Year}-${data.Month.length === 1 ? "0" : ""}${data.Month}-${data.Day ? (data.Day.length === 1 ? "0" : "")+data.Day : "01"}`
        const date = new Date(dateStr).getTime()
        const age = Math.abs(new Date(Date.now() - date).getUTCFullYear() - 1970)

        if (age < 16) {
            setError("Year",{
                type: "max",
                message: "You need to be at least 16 years old to use MOOSE."
            })
            setError("Month",{
                type: "max",
                message: "You need to be at least 16 years old to use MOOSE."
            })
        } else {
            if (!data.Day)
                dateStr = dateStr.replace(/.$/,"0")
            sessionStorage.setItem("ProfileCompletion" + stage, dateStr)
            reset()
            setStage(stage + 1)
        }
    }

    return (
        <div>
            <h1 style={{marginBottom: "8px"}}>How old are you?</h1>

            <form onSubmit={handleSubmit(handleNext)}>
                <div style={{display: "flex", alignItems: "flex-end", justifyContent: "center"}}>
                    <div style={{margin: "0 4px"}}>
                        <h4 style={{marginBottom: "4px"}}>Day</h4>
                        <input
                            type="number"
                            name="Day"
                            placeholder="01"
                            onChange={() => clearErrors()}
                            min="1" max="31"
                            ref={register({
                                min: 1,
                                max : 31
                            })}
                            style={{borderColor: errors.Day && "#FA6B80", width: "48px"}}
                        />
                    </div>
                    <div style={{margin: "0 4px"}}>
                        <h4 style={{marginBottom: "4px"}}>Month*</h4>
                        <input
                            type="number"
                            name="Month"
                            placeholder="01"
                            onChange={() => clearErrors()}
                            min="1" max="12"
                            ref={register({
                                required: true,
                                min: 1,
                                max : 12
                            })}
                            style={{borderColor: errors.Month && "#FA6B80", width: "48px"}}
                        />
                    </div>
                    <div style={{margin: "0 4px"}}>
                        <h4 style={{marginBottom: "4px"}}>Year*</h4>
                        <input
                            type="number"
                            name="Year"
                            placeholder="2000"
                            onChange={() => clearErrors()}
                            min="1900" max={new Date().getFullYear() - 16}
                            ref={register({
                                required: true,
                                min: 1900,
                                max : new Date().getFullYear() - 16
                            })}
                            style={{borderColor: errors.Year && "#FA6B80", width: "72px"}}
                        />
                    </div>
                    <button style={{marginLeft: "16px", marginBottom: "4px"}} type="submit">Next</button>
                </div>
            </form>
        </div>
    )
}

//STAGE 3
const ExtraInformation = () => {
    return (
        <div>
            <h1 style={{marginBottom: "8px"}}>You're almost there!</h1>
            <p style={{marginTop: "0"}}>This is just optional information to complete your profile. Feel free to skip this section.</p>
        </div>
    )
}

const Warning = ({ warning, setVisible }) => {
    return (
        <Modal setVisible={() => setVisible(null)} width="400px">
            {warning === "low" ?
                <h2>Please, select at least 3 categories</h2> :
                <div>
                    <h2>We love to see that you are eager to test MOOSE!</h2>
                    <p>However, please try to choose your 5 favourite categories. This way, we can better recommend you profiles you will love. Don't worry, you can change this at any time and you can still browse every category.</p>
                </div>
            }
            <button onClick={() => setVisible(null)}>Try Again</button>
        </Modal>
    )
}

const CompleteProfile = () => {
    const [stage, setStage] = useState(3)
    const [warning, setWarning] = useState(null)

    const [selectedNeed, setSelectedNeed] = useState(new Array(categories).fill(false))
    const [selectedOffer, setSelectedOffer] = useState(new Array(categories).fill(false))

    const checkValid = (cat) => {
        if (cat.length < 3)
            return "low"
        if (cat.length > 5)
            return "high"
        return null
    }

    const handleButton = () => {
        const cat = codes.filter((a, i) => stage === 0 ? selectedNeed[i] : selectedOffer[i])
        const notValid = checkValid(cat)
        if (notValid) {
            setWarning(notValid)
        } else {
            sessionStorage.setItem("ProfileCompletion" + stage, JSON.stringify(cat))
            setStage(stage + 1)
        }
        console.log("Selected this codes: ", cat)
    }

    return (
        <div>
            <Modal setVisible={() => {}} width="900px">
                {stage === 0 && <WhatINeed selected={selectedNeed} setSelected={setSelectedNeed} handleButton={handleButton} setWarning={setWarning}/>}
                {stage === 1 && <WhatIOffer selected={selectedOffer} setSelected={setSelectedOffer} handleButton={handleButton} setWarning={setWarning}/>}
                {stage === 2 && <Birthdate stage={stage} setStage={setStage}/>}
                {stage === 3 && <ExtraInformation/>}
            </Modal>
            {warning && <Warning warning={warning} setVisible={setWarning}/>}
        </div>
    )
}

export default CompleteProfile