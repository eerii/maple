import React, {useEffect, useState, useRef} from "react"
import axios from "axios"

import { useForm, Controller } from "react-hook-form"
import Select from 'react-select'

import Modal from "../components/Modal"
import CircleSelector from "../components/CircleSelector"
import MapSelector from "../components/MapSelector.js"

import {getLanguageList, countryList} from "../config/Locale"

import styles from "../config/Styles"
import {getCategories} from "../config/Categories"

const { LinkText, Modal: ModalStyle, ModalContent } = styles
const [codes, names, colors] = getCategories()

const categories = 10
const startRadius = 72

//STAGE 0
const WhatINeed = ({ selected, setSelected, handleButton, setWarning }) => {
    return (
        <div>
            <h1 style={{marginBottom: "8px", padding: "0 5vw"}}>What can MOOSE interest you in at the moment?</h1>

            <CircleSelector startRadius={startRadius} selected={selected} setSelected={setSelected} number={categories} colors={colors} names={names} max={5} setMaxError={() => setWarning("high")}/>

            <p style={{marginTop: "0"}}>Don't worry, you can change these at any time from your profile.</p>
            <button onClick={() => handleButton(3, 5)}>Continue</button>
        </div>
    )
}

//STAGE 1
const WhatIOffer = ({ selected, setSelected, handleButton, setWarning }) => {
    return (
        <div>
            <h1 style={{marginBottom: "8px"}}>What can you offer MOOSE?</h1>
            <p style={{marginTop: "0"}}>We encourage all our users to share their talents and passions. We are sure you have some!</p>

            <CircleSelector startRadius={startRadius} selected={selected} setSelected={setSelected} number={categories} colors={colors} names={names} max={5} setMaxError={() => setWarning("high")}/>

            <p style={{marginTop: "0"}}>Don't worry, you can change these at any time from your profile.</p>
            <button onClick={() => handleButton(0, 5)}>Continue</button>
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

const LanguageSelector = ({ clearErrors, errors, control, modalRef, country }) => {
    const [languageList, setLanguageList] = useState(null)

    useEffect(() => {
        setLanguageList(getLanguageList(country))
    }, [country])

    return (
        <>
            <h4 style={{margin: "4px 0"}}>First Language</h4>
            <Controller
                //rules={{ required: true }}
                name="Language"
                onChange={() => clearErrors()}
                defaultValue=""
                render={(props) => {
                    return (
                        <Select
                            style={{borderColor: errors.Language && "#FA6B80", width: "calc(100%)", marginBottom: "16px"}}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            options={languageList}
                            menuPortalTarget={modalRef.current}
                            menuPosition="fixed"
                            menuPlacement="auto"
                            {...props}
                        />
                    );
                }}
                control={control}
            />

            <h4 style={{margin: "4px 0"}}>Other Languages</h4>
            <Controller
                //rules={{ required: true }}
                name="OtherLanguages"
                onChange={() => clearErrors()}
                defaultValue=""
                render={(props) => {
                    return (
                        <Select
                            style={{borderColor: errors.Language && "#FA6B80", width: "calc(100%)", marginBottom: "16px"}}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            isMulti
                            options={languageList}
                            menuPortalTarget={modalRef.current}
                            menuPosition="fixed"
                            menuPlacement="auto"
                            {...props}
                        />
                    );
                }}
                control={control}
            />
        </>
    )
}

//STAGE 3
const Locale = ({ stage, setStage, modalRef }) => {
    const { register, handleSubmit, errors, clearErrors, control } = useForm({ mode: "onBlur" })

    const [selectionType, setSelectionType] = useState(0)

    const [country, setCountry] = useState("")
    const [countryName, setCountryName] = useState(null)

    const handleNext = (data) => {
        let jsonData = {Country: country, Language: (data.Language.value ? data.Language.value : ""), OtherLanguages: data.OtherLanguages.map((l) => l.value)}
        console.log(jsonData)
        sessionStorage.setItem("ProfileCompletion" + stage, JSON.stringify(jsonData))
        setStage(stage + 1)
    }

    return (
        <div>
            <h1 style={{marginBottom: "8px"}}>Country and Languages</h1>
            <p style={{marginTop: "0"}}>This is just optional information to complete your profile. Feel free to skip this section.</p>

            {selectionType === 0 && <div>
                <button style={{margin: "8px"}} onClick={() => setSelectionType(1)}>Interactive Map</button> <span>,</span>
                <button style={{margin: "8px"}} onClick={() => setSelectionType(3)}>List</button> <span>or</span>
                <LinkText style={{margin: "8px"}} onClick={() => handleNext({Country: "", Language: "", OtherLanguages: ""})}>Skip</LinkText>
            </div>}

            {selectionType === 1 && (!country ? <MapSelector setCountry={setCountry} setCountryName={setCountryName}/> :
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <div style={{marginRight: "16px"}}>
                        <h4 style={{marginBottom: "0"}}>You have selected:</h4>
                        <h2 style={{margin: "8px"}}>{`${countryName} (${country})`}</h2>
                        <p style={{marginTop: "0"}}>Is this correct?</p>
                    </div>
                    <div style={{marginLeft: "16px"}}>
                        <button onClick={() => setSelectionType(2)}>Continue</button> <br/>
                        <LinkText onClick={() => setCountry(null)}>or Go Back</LinkText>
                    </div>
                </div>)}

            {selectionType === 2 && <div>
                <form style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}} onSubmit={handleSubmit(handleNext)}>
                    <div style={{width: "600px", textAlign: "left"}}>
                        <LanguageSelector clearErrors={clearErrors} errors={errors} register={register} control={control} modalRef={modalRef} country={country}/>
                    </div>
                    <div style={{width: "100%", marginBottom: "4px"}}>
                        <button type="submit">Next</button>
                    </div>
                </form>
            </div>}

            {selectionType === 3 && <form style={{display: "flex", justifyContent: "center", flexWrap: "wrap"}} onSubmit={handleSubmit(handleNext)}>
                <div style={{width: "600px", textAlign: "left"}}>
                    <h4 style={{margin: "4px 0"}}>Country</h4>
                    <Controller
                        name="Country"
                        defaultValue={""}
                        render={(props) => {
                            return (
                                <Select
                                    style={{borderColor: errors.Language && "#FA6B80", width: "calc(100%)", marginBottom: "16px"}}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                    options={countryList}
                                    menuPortalTarget={modalRef.current}
                                    menuPosition="fixed"
                                    menuPlacement="auto"
                                    {...props}

                                    onChange={e => {
                                        props.onChange(e)
                                        setCountry(e.value)
                                    }}
                                />
                            );
                        }}
                        control={control}
                    />

                    <LanguageSelector clearErrors={clearErrors} errors={errors} register={register} control={control} modalRef={modalRef} country={country}/>
                </div>
                <div style={{width: "100%", marginBottom: "4px"}}>
                    <button type="submit">Next</button>
                </div>
            </form>}


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
            let country, language, otherlanguages
            if (locale){
                country = locale.Country
                language = locale.Language
                otherlanguages = locale.OtherLanguages
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
                            otherlanguages,
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
                    <h2>We love how eager you are to try all of MOOSE’s features!</h2>
                    <p>That said, to give you a truly personal experience, please only choose up to 5 categories. Don’t worry, you can edit your choices at any time via the link in your profile.</p>
                </div>
            }
            <button onClick={() => setVisible(null)}>Try Again</button>
        </Modal>
    )
}

const CompleteProfile = ({ setUserStatus }) => {
    const [stage, setStage] = useState(3) //TODO: CHANGEEEEE
    const [warning, setWarning] = useState(null)

    const [selectedNeed, setSelectedNeed] = useState(new Array(categories).fill(false))
    const [selectedOffer, setSelectedOffer] = useState(new Array(categories).fill(false))

    const modalRef = useRef(null)

    const checkValid = (cat, min, max) => {
        if (cat.length < min)
            return "low"
        if (cat.length > max)
            return "high"
        return null
    }

    const handleButton = (min, max) => {
        const cat = codes.filter((a, i) => stage === 0 ? selectedNeed[i] : selectedOffer[i])
        const notValid = checkValid(cat, min, max)
        if (notValid) {
            setWarning(notValid)
        } else {
            sessionStorage.setItem("ProfileCompletion" + stage, JSON.stringify(cat))
            setStage(stage + 1)
        }
        console.log("Selected this codes: ", cat)
    }

    return (
        <ModalStyle ref={modalRef}>
            <ModalContent style={{width: "900px"}}>
                <div style={{maxHeight: "90vh", overflow: "scroll"}}>
                    {stage === 0 && <WhatINeed selected={selectedNeed} setSelected={setSelectedNeed} handleButton={handleButton} setWarning={setWarning}/>}
                    {stage === 1 && <WhatIOffer selected={selectedOffer} setSelected={setSelectedOffer} handleButton={handleButton} setWarning={setWarning}/>}
                    {stage === 2 && <Birthdate stage={stage} setStage={setStage}/>}
                    {stage === 3 && <Locale stage={stage} setStage={setStage} modalRef={modalRef}/>}
                    {stage === 4 && <ExtraInformation stage={stage} setStage={setStage}/>}
                    {stage === 5 && <SendToServer setUserStatus={setUserStatus}/>}
                </div>
            </ModalContent>
            {warning && <Warning warning={warning} setVisible={setWarning}/>}
        </ModalStyle>
    )
}

export default CompleteProfile