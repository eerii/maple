import React, {useState, useEffect} from "react"

import Modal from "../components/Modal"

import styles from "../config/Styles"
const { Circle: CircleStyle } = styles

const start = 0
const finish = 200
const duration = 1000

const Circle = () => {
    const [begin, setBegin] = useState(null)
    const [posY, setPosY] = useState(0)
    const [time, setTime] = useState(null)

    const calculatePos = (elapsedTime, h, k) => {
        const a = (4 * k) / Math.pow(h * 2, 2)

        // Position as a function of time, using the vertex form
        // of the quadratic formula:  f(x) = a(x - h)^2 + k,
        // (where [h, k] is the vertex).
        return a * Math.pow((((elapsedTime + h) % (h * 2)) - h), 2)
    }

    useEffect(() => {
        setBegin(Date.now())
    },[])

    useEffect(() => {
        if (!time) {
            setTime(setTimeout(() => {
                const time = Date.now() - begin
                const value = start + calculatePos(time, duration / 2, finish - start)
                setPosY(value)
                setTime(null)
            }, 25))
            return (
                clearTimeout(time)
            )
        }
    }, [time, begin])

    return (
        <div>
            <CircleStyle style={{top: posY}}/>
        </div>
    )
}

const CompleteProfile = () => {
    return (
        <Modal setVisible={() => {}} width="800px">
            <h1>Category</h1>
            <Circle/>
        </Modal>
    )
}

export default CompleteProfile