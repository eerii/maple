import React, {useState} from "react"
import {ComposableMap, Geographies, Geography} from "react-simple-maps"
import ReactTooltip from "react-tooltip"

import geoURL from "./geo.json"

const MapSelector = ({ setCountry, setCountryName }) => {
    const [scale, setScale] = useState(230);
    const [center, setCenter] = useState([10, 0])

    const [zoomed, setZoomed] = useState(null)

    const [highlighted, setHighlighted] = useState(null)
    const [hover, setHover] = useState(false)

    const [tooltipContent, setTooltipContent] = useState("")

    const handleEnter = (geo) => {
        if (zoomed)
            setTooltipContent(geo.properties.NAME)
        if (hover === geo.properties.NAME)
            return
        setHover(geo.properties.NAME)
        setHighlighted(geo.properties.CONTINENT)
    }

    const handleLeave = () => {
        setHover(false)
        setTooltipContent("")
        if (!zoomed)
            setHighlighted(null)
    }

    const goBack = () => {
        setCenter([10,0])
        setScale(230)
        setZoomed(null)
        setHighlighted(null)
    }

    const handleClick = (geo, proj, path) => {
        if (zoomed) {
            setCountry(geo.properties.ISO_A2)
            setCountryName(geo.properties.NAME)
        } else {
            const centroid = proj.invert(path.centroid(geo))
            setCenter(centroid)
            setScale(500)
            setZoomed(geo.properties.NAME)
        }
    }

    return (
        <div>
            <button onClick={() => goBack()} style={{position: "fixed", bottom: "42px", left: "42px", display: `${zoomed === null ? "none" : "block"}`}}>Back</button>

            <div style={{display: "flex", justifyContent: "center"}}>
                <div style={{position: "fixed", bottom: "48px", background: "rgba(9,24,62,0.8)", borderRadius: "16px"}}>
                    <p style={{margin: "4px 10px"}}>{zoomed ? "Click to select" : "Click to zoom"}</p>
                </div>

                <ComposableMap
                    projection="geoEqualEarth"
                    data-tip=""
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
                                    data-tip={geo.properties.NAME}
                                    onMouseEnter={() => handleEnter(geo)}
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
                </ComposableMap>
            </div>

            <ReactTooltip>{tooltipContent}</ReactTooltip>
        </div>
    )
}

export default MapSelector