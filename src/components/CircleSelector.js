import React, {useEffect, useState} from "react"
import times from "lodash.times"

import styles from "../config/Styles"
const { Circle: CircleStyle } = styles

const Circle = ({i, active, selected, color, radius, startRadius, number, name, setActive, setSelected, max, setMaxError}) => {
    const handleMouse = (over) => {
        if (over)
            setActive(new Array(number).fill(false).map((n, ind) => (ind === i) ? true : n))
        if (!over)
            setActive(new Array(number).fill(false))
    }

    const handleClick = () => {
        let len = selected.filter(v => v).length
        if (!selected[i]) {
            len += 1
        }
        if (len > max) {
            setMaxError()
        } else {
            setSelected(selected.map((n, ind) => (ind === i) ? !selected[i] : n))
        }
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

const CircleSelector = ({ startRadius, number, colors, names, selected, setSelected, max, setMaxError }) => {
    const [radius, setRadius] = useState(new Array(number).fill(startRadius))
    const [active, setActive] = useState(new Array(number).fill(false))

    /*useEffect(() => {
        console.log(selected)
    }, [selected])*/

    useEffect(() => {
        if (active.every(x => x === false)) {
            setRadius(new Array(number).fill(startRadius))
        } else {
            setRadius(new Array(number).fill(startRadius).map((n, i) => {
                let value = startRadius - 12
                if (active[i]) {
                    value = startRadius + 8
                }
                if (i > 0 && i !== number / 2) {
                    if (active[i - 1])
                        value = startRadius
                }
                if (i < number && i !== (number / 2) - 1) {
                    if (active[i + 1])
                        value = startRadius
                }
                if (i >= number / 2) {
                    if (active[i - number / 2])
                        value = startRadius
                } else {
                    if (active[i + number / 2])
                        value = startRadius
                }
                return value
            }))
        }
    }, [active, number, startRadius])

    return (
        <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", marginBottom: "8px"}}>
            {times(number, i => <Circle key={i} i={i} color={colors[i]} radius={radius[i]} name={names[i]} active={active[i]} selected={selected} setActive={setActive} setSelected={setSelected} startRadius={startRadius} number={number} max={max} setMaxError={setMaxError}/>)}
        </div>
    )
}

export default CircleSelector