import React, {useEffect, useState} from "react"
import times from "lodash.times"

import Modal from "../components/Modal"

import styles from "../config/Styles"
const { Circle: CircleStyle } = styles

const categories = 10
const startRadius = 72
const colors = ["#f33e7b","#f85a56","#ee8649","#FFC825","#5ABD5D","#3926c6","#2a45e3","#2e8bf8","#29bbff","#5cddb8"]
const names = ["Arts", "Crafts and:Home", "Cooking", "Help with:School", "Music and:Movies", "Language:Learning", "Fitness", "Mindfulness", "Just for:Fun", "Technology"]
const codes = ["A","C","K","S","M","L","F","Mf","J","T"]

const Circle = ({i, active, selected, color, radius, name, setActive, setSelected}) => {
    /*const calculatePos = (elapsedTime) => {
        // Position as a function of time, using the vertex form
        // of the quadratic formula:  f(x) = a(x - h)^2 + k,
        // (where [h, k] is the vertex).
        const a = (4 * k) / Math.pow(h * 2, 2)
        return a * Math.pow((((elapsedTime + h) % (h * 2)) - h), 2)
        return Math.floor( 100 * Math.sin((elapsedTime / 400)))
    }

    useEffect(() => {
        setBegin(Date.now())
    },[])

    useEffect(() => {
        if (!time) {
            setTime(setTimeout(() => {
                const time = Date.now() - begin
                const value = start + calculatePos(time)//, duration / 2, finish - start)
                setPosY(value)
                setPosX(value)
                setTime(null)
            }, 100))
            return (
                clearTimeout(time)
            )
        }
    }, [time, begin])*/

    const handleMouse = (over) => {
        if (over)
            setActive(new Array(categories).fill(false).map((n, ind) => (ind === i) ? true : n))
        if (!over)
            setActive(new Array(categories).fill(false))
    }

    const handleClick = () => {
        setSelected(selected.map((n, ind) => (ind === i) ? !selected[i] : n))
    }

    let l1; let l2
    if (name)
        [l1,l2] = name.split(":")

    return (
        <div style={{margin: "8px 8px"}}>
            <CircleStyle style={{margin: `${8 - (radius - startRadius)}px`, whiteSpace: "nowrap"}} color={color} active={active || selected[i]} radius={radius}
                         onMouseOver={() => handleMouse(true)}
                         onMouseOut={() => handleMouse(false)}
                         onClick={() => handleClick()}>
                <h2 style={{color: "white"}}>{l1}{l2 ? <br/> : ""}{l2}</h2>
            </CircleStyle>
        </div>
    )
}

const CompleteProfile = () => {
    const [radius, setRadius] = useState(new Array(categories).fill(startRadius))
    const [active, setActive] = useState(new Array(categories).fill(false))
    const [selected, setSelected] = useState(new Array(categories).fill(false))

    useEffect(() => {
        if (active.every(x => x === false)) {
            setRadius(new Array(categories).fill(startRadius))
        } else {
            setRadius(new Array(categories).fill(startRadius).map((n, i) => {
                let value = startRadius - 12
                if (active[i]) {
                    value = startRadius + 8
                }
                if (i > 0 && i !== categories / 2) {
                    if (active[i - 1])
                        value = startRadius
                }
                if (i < categories && i !== (categories / 2) - 1) {
                    if (active[i + 1])
                        value = startRadius
                }
                if (i >= categories / 2) {
                    if (active[i - categories / 2])
                        value = startRadius
                } else {
                    if (active[i + categories / 2])
                        value = startRadius
                }
                return value
            }))
        }
    }, [active])

    const handleButton = () => {
        const cat = codes.filter((a, i) => selected[i])
        console.log(cat)
    }

    return (
        <Modal setVisible={() => {}} width="900px">
            <div style={{maxHeight: "90vh", overflow: "scroll"}}>
                <h1 style={{marginBottom: "8px"}}>What do you need from MOOSE?</h1>
                <p style={{marginTop: "0"}}>Please select from 3 to 5 categories so we can recommend you profiles you will love.</p>
                <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", marginBottom: "8px"}}>
                    {times(categories, i => <Circle key={i} i={i} color={colors[i]} radius={radius[i]} name={names[i]} active={active[i]} selected={selected} setActive={setActive} setSelected={setSelected}/>)}
                </div>
                <p style={{marginTop: "0"}}>Don't worry, you can change it at any time from your profile.</p>
                <button onClick={() => handleButton()}>Continue</button>
            </div>
        </Modal>
    )
}

export default CompleteProfile