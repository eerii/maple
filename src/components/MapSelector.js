import React, {useState} from "react"
import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps"

import geoURL from "./geo.json"

const MapSelector = () => {
    const [scale, setScale] = useState(230);
    const [center, setCenter] = useState([10, 0])

    const [zoomed, setZoomed] = useState(null)

    const [highlighted, setHighlighted] = useState(null)
    const [hover, setHover] = useState(false)

    const [buttonCenter, setButtonCenter] = useState([0, 0])
    const [buttonText, setButtonText] = useState(null)
    const [buttonCode, setButtonCode] = useState(null)
    const [buttonHover, setButtonHover] = useState(false)

    const handleMove = (geo, proj, path, e) => {
        if (hover)
            return
        setHover(true)
        setHighlighted(geo.properties.CONTINENT)

        if (zoomed !== null) {
            const centroid = proj.invert(path.centroid(geo))
            setButtonCenter(centroid)
            setButtonText(geo.properties.NAME)
            setButtonCode(geo.properties.ISO_A2)
        }
    }

    const handleLeave = () => {
        setHover(false)
        if (!zoomed)
            setHighlighted(null)
    }

    const goBack = () => {
        setCenter([10,0])
        setScale(230)
        setZoomed(null)
        setButtonCenter([0,0])
        setButtonText(null)
        setButtonCode(null)
        setHighlighted(null)
    }

    const handleClick = (geo, proj, path) => {
        if (zoomed === geo.properties.NAME) {
            goBack()
        } else {
            const centroid = proj.invert(path.centroid(geo))
            setCenter(centroid)
            setScale(500)
            setZoomed(geo.properties.NAME)

            setButtonCenter(centroid)
            setButtonText(geo.properties.NAME)
            setButtonCode(geo.properties.ISO_A2)
        }
    }

    const handleButton = () => {
        console.log(buttonCode)
    }

    return (
        <div>
            <button onClick={() => goBack()} style={{position: "fixed", bottom: "42px", left: "42px", display: `${zoomed === null ? "none" : "block"}`}}>Back</button>

            <div style={{display: "flex", justifyContent: "center"}}>
                <ComposableMap
                    projection="geoEqualEarth"
                    projectionConfig={{ scale, center }}
                    style={{
                        width: "100%",
                        height: "35vw",
                        borderRadius: "16px",
                        background: "#faf7ee"
                    }}
                >
                    <Geographies geography={geoURL}>
                        {({geographies, projection, path}) =>
                            geographies.map((geo) =>
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    onMouseMove={(e) => handleMove(geo, projection, path, e)}
                                    onMouseLeave={() => handleLeave()}
                                    onClick={() => handleClick(geo, projection, path)}
                                    style={{
                                        default: {
                                            fill:
                                                geo.properties.CONTINENT ===
                                                highlighted
                                                    ? "#4960f9"
                                                    : "#FAC172",
                                            stroke:
                                                geo.properties.CONTINENT ===
                                                highlighted
                                                    ? "#ffffff"
                                                    : "#ffffff",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                            transition: "all 250ms"
                                        },
                                        hover: {
                                            fill: "#09183e",
                                            stroke: "#ffffff",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                            transition: "all 250ms"
                                        },
                                        pressed: {
                                            fill: "#FAC172",
                                            stroke: "#ffffff",
                                            strokeWidth: 0.75,
                                            outline: "none",
                                            transition: "all 250ms"
                                        }
                                    }}
                                />)
                        }
                    </Geographies>
                    <Marker key="marker" coordinates={buttonCenter} onMouseEnter={() => setButtonHover(true)} onMouseLeave={() => {setButtonHover(false)}} onMouseDown={() => handleButton()}>
                        <rect rx="16" height="48" width={zoomed === null ? "0" : "300"} x={-150} y={-32} stroke="#ffffff" strokeWidth={2} fill={buttonHover ? "#09183e" : "#FAC172"}/>
                        <text
                            textAnchor="middle"
                            style={{ fontSize: "24px", fontWeight: "bold", fill: `${buttonHover ? "#ffffff" : "#09183e"}`, display: `${zoomed === null ? "none" : "block"}` }}
                        >
                            {buttonText}
                        </text>
                    </Marker>
                </ComposableMap>
            </div>
        </div>
    )
}

export default MapSelector