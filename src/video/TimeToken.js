import React, {useEffect, useState} from "react"
import times from "lodash.times"

import styles from "../config/Styles"
const { TimeTokenBar: TimeTokenBarStyle, TimeToken, TimeTokenFill } = styles

const interval = 5000 // Check each 5 seconds

const TimeTokenBar = ({ percent, setTokenPercent, number, setTokensSpent }) => {
    const [start, setStart] = useState(null)
    const [expected, setExpected] = useState(null)

    useEffect(() => {
        setStart(Date.now())
        setExpected(Date.now() + interval)
    }, [])

    useEffect(() => {
        if (expected) {
            const time = Math.floor((Date.now() - start) / 60000) // In minutes
            const dt = Date.now() - expected

            /*if (dt > interval) {
                // something really bad happened. Maybe the browser (tab) was inactive?
                // possibly special handling to avoid futile "catch up" run
            }*/

            const mod = time % 10
            setTokenPercent(mod * 10)
            setTokensSpent((time - mod) / 10)

            setTimeout(() => {setExpected(expected + interval)}, Math.max(0, interval - dt))
        }
    }, [expected, setTokensSpent, setTokenPercent, start])

    return (
        <TimeTokenBarStyle>
            {times(number, i => <TimeToken key={i}> <TimeTokenFill key={i} percent={100}/> </TimeToken>)}
            <TimeToken key={"actual"}> <TimeTokenFill key={"actual"} percent={percent}/> </TimeToken>
        </TimeTokenBarStyle>
    )
}

export default TimeTokenBar