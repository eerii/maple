import React, {useEffect, useState} from "react"
import { useForm } from "react-hook-form"
import axios from "axios"

import Modal from "../components/Modal"
import CircleSelector from "../components/CircleSelector"

import MapSelector from "../components/MapSelector.js"

import {getCategories} from "../config/Categories"
const [codes, names, colors] = getCategories()

const categories = 10
const startRadius = 72

//STAGE 0
const WhatINeed = ({ selected, setSelected, handleButton, setWarning }) => {
    return (
        <div>
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
        <div>
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
const Locale = ({ stage, setStage }) => {

    /*const handleNext = (data) => {
        sessionStorage.setItem("ProfileCompletion" + stage, JSON.stringify(data))
        setStage(stage + 1)
    }*/

    return (
        <div>
            <h1 style={{marginBottom: "8px"}}>Country and Languages</h1>
            <p style={{marginTop: "0"}}>This is just optional information to complete your profile. Feel free to skip this section.</p>

            {/*<form style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}} onSubmit={handleSubmit(handleNext)}>
                <div style={{width: "600px", textAlign: "left"}}>
                    <h4 style={{margin: "4px 0"}}>First Language</h4>
                    <select
                        name="Language"
                        defaultValue=""
                        onChange={() => clearErrors()}
                        ref={register()}
                        style={{borderColor: errors.Language && "#FA6B80", width: "calc(100%)", marginBottom: "16px"}}
                    >
                        <option value="">Select one...</option>
                        <LanguageSelector/>
                    </select>

                    <h4 style={{margin: "4px 0"}}>Other Languages</h4>
                    <select
                        name="OtherLanguages"
                        defaultValue=""
                        onChange={() => clearErrors()}
                        ref={register()}
                        style={{borderColor: errors.OtherLanguages && "#FA6B80", width: "calc(100%)", marginBottom: "16px"}}
                    >
                        <option value="">Select one...</option>
                        <LanguageSelector/>
                    </select>
                </div>
                <div style={{width: "100%", marginBottom: "4px"}}>
                    <button type="submit">Next</button>
                </div>
            </form>*/}

            <MapSelector/>
        </div>
    )
}

//STAGE 4
const ExtraInformation = ({ stage, setStage }) => {
    const { register, handleSubmit, errors, clearErrors } = useForm({ mode: "onBlur" })

    const handleNext = (data) => {
        sessionStorage.setItem("ProfileCompletion" + stage, JSON.stringify(data))
        setStage(stage + 1)
    }

    return (
        <div>
            <h1 style={{marginBottom: "8px"}}>You're almost there!</h1>
            <p style={{marginTop: "0"}}>This is just optional information to complete your profile. Feel free to skip this section.</p>

            <form style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}} onSubmit={handleSubmit(handleNext)}>
                <div style={{width: "600px", textAlign: "left"}}>
                    <h4 style={{margin: "4px 0"}}>Fun fact about you</h4>
                    <input
                        type="text"
                        name="FunFact"
                        placeholder="I love koalas <3"
                        onChange={() => clearErrors()}
                        ref={register()}
                        style={{borderColor: errors.FunFact && "#FA6B80", width: "calc(100% - 44px)", marginBottom: "16px"}}
                        maxLength="128"
                    />
                    <h4 style={{margin: "4px 0"}}>Bio</h4>
                    <textarea
                        name="Bio"
                        placeholder="My experience in cooking is..."
                        rows="5"
                        onChange={() => clearErrors()}
                        ref={register()}
                        style={{borderColor: errors.Bio && "#FA6B80", width: "calc(100% - 44px)", size: "4", marginBottom: "16px", resize: "vertical", maxHeight: "400px"}}
                        maxLength="2048"
                    />
                </div>
                <div style={{width: "100%", marginBottom: "4px"}}>
                    <button type="submit">Next</button>
                </div>
            </form>
        </div>
    )
}

//STAGE 5
const SendToServer = ({ setUserStatus }) => {
    useEffect(() => {
        (async () => {
            console.log("Updating User...")

            //Get data from session
            const need = sessionStorage.getItem("ProfileCompletion0")
            const offer = sessionStorage.getItem("ProfileCompletion1")
            const birthdate = sessionStorage.getItem("ProfileCompletion2")
            const locale = JSON.parse(sessionStorage.getItem("ProfileCompletion3"))
            const extra = JSON.parse(sessionStorage.getItem("ProfileCompletion4"))
            let country, language, otherLanguages
            if (locale){
                country = locale.Country
                language = locale.Language
                otherLanguages = locale.OtherLanguages
            }
            let funfact, bio
            if (extra){
                funfact = extra.FunFact
                bio = extra.Bio
            }

            if (need && offer && birthdate) {
                const token = localStorage.getItem("Token")
                if (token === null)
                    console.log("ERROR: NOT AUTHORIZED")

                const headers = {
                    'Authorization': `Bearer ${token}`
                }

                try {
                    const post = await axios.post(
                        process.env.REACT_APP_URL + "/api/modifyUser", {
                            need,
                            offer,
                            birthdate,
                            funfact,
                            bio,
                            country,
                            language,
                            otherLanguages,
                            status: 2
                        }, { headers: headers })

                    localStorage.setItem("Token", post.data.token)

                    sessionStorage.removeItem("ProfileCompletion0")
                    sessionStorage.removeItem("ProfileCompletion1")
                    sessionStorage.removeItem("ProfileCompletion2")
                    sessionStorage.removeItem("ProfileCompletion3")

                    setUserStatus(2)

                    console.log("Done!")
                } catch (e) {
                    console.log("ERROR: " + e.message)
                }
            } else {
                console.log("ERROR: Required data not found")
            }
        })()
    }, [setUserStatus])

    return (
        <div>
            <h1>Saving...</h1>
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

const CompleteProfile = ({ setUserStatus }) => {
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
                <div style={{maxHeight: "90vh", overflow: "scroll"}}>
                    {stage === 0 && <WhatINeed selected={selectedNeed} setSelected={setSelectedNeed} handleButton={handleButton} setWarning={setWarning}/>}
                    {stage === 1 && <WhatIOffer selected={selectedOffer} setSelected={setSelectedOffer} handleButton={handleButton} setWarning={setWarning}/>}
                    {stage === 2 && <Birthdate stage={stage} setStage={setStage}/>}
                    {stage === 3 && <Locale stage={stage} setStage={setStage}/>}
                    {stage === 4 && <ExtraInformation stage={stage} setStage={setStage}/>}
                    {stage === 5 && <SendToServer setUserStatus={setUserStatus}/>}
                </div>
            </Modal>
            {warning && <Warning warning={warning} setVisible={setWarning}/>}
        </div>
    )
}

export default CompleteProfile