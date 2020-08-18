import React, {useEffect, useState} from "react"
import axios from "axios"

import Modal from "../components/Modal"

import {getCategories} from "../config/Categories"
const [codes, names, colors] = getCategories()

const Category = ({ name, color }) => {
    return (
        <div style={{background: color, borderRadius: "32px", whiteSpace: "nowrap", padding: "8px 16px", margin: "4px"}}>
            <p style={{margin: "0"}}>{name}</p>
        </div>
    )
}

const Profile = ({ username, name, setShowProfile, setLogout }) => {
    const [tokens, setTokens] = useState(null)
    const [need, setNeed] = useState(null)
    const [offer, setOffer] = useState(null)
    const [birthdate, setBirthdate] = useState(null)
    const [funfact, setFunfact] = useState(null)
    const [bio, setBio] = useState(null)
    const [country, setCountry] = useState(null)

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem("Token")
            if (token === null)
                console.log("ERROR: NOT AUTHORIZED")
            const headers = { 'Authorization': `Bearer ${token}` }

            try {
                const get = await axios.get(process.env.REACT_APP_URL + "/api/me", { headers: headers })

                console.log(get.data)

                setTokens(get.data.tokens)
                setNeed(get.data.need)
                setOffer(get.data.offer)
                setBirthdate(get.data.birthdate)
                setFunfact(get.data.funfact)
                setBio(get.data.bio)
                setCountry(get.data.country)
            } catch (e) {
                console.log("ERROR: " + e.message)
            }
        })()
    }, [])

    return (
        <Modal setVisible={setShowProfile}>
            <h2 style={{marginBottom: "4px"}}>{name} (@{username})</h2>
            <h4 style={{marginTop: "0"}}>{tokens} Time Tokens</h4>

            <hr/>

            {tokens === null ? <p>Loading...</p> :
            <div style={{textAlign: "left"}}>
                <h4 style={{marginBottom: "4px"}}>Bio:</h4>
                <p style={{margin: "0"}}>{bio}</p>

                <h4 style={{marginBottom: "4px"}}>Fun Fact:</h4>
                <p style={{margin: "0", fontStyle: "italic"}}>{funfact}</p>

                <div style={{display: "flex"}}>
                    <div style={{width: "50%"}}>
                        <h4 style={{marginBottom: "4px"}}>Country:</h4>
                        <p style={{marginTop: "0"}}>{country}</p> {/*TODO: CHANGE CODE TO COUNTRY*/}
                    </div>
                    <div style={{width: "50%"}}>
                        <h4 style={{marginBottom: "4px"}}>Birthday:</h4>
                        <p style={{marginTop: "0"}}>{birthdate}</p>
                    </div>
                </div>

                <hr/>

                <h4 style={{marginBottom: "4px"}}>What you need from MOOSE:</h4>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {names.map((n, i) => {
                        if (need && need.includes(codes[i]))
                            return <Category key={"N" + codes[i]} name={names[i].replace(":", " ")} color={colors[i]}/>
                        return null
                    })}
                </div>

                <h4 style={{marginBottom: "4px"}}>What you can offer MOOSE:</h4>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {names.map((n, i) => {
                        if (offer && offer.includes(codes[i]))
                            return <Category key={"N" + codes[i]} name={names[i].replace(":", " ")} color={colors[i]}/>
                        return null
                    })}
                </div>

                <hr/>
            </div>}

            <button onClick={() => {
                setLogout(true)
                setShowProfile(false)
            }}>Log Out</button>
        </Modal>
    )
}

export default Profile