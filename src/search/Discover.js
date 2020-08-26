import React, {useRef, useState} from "react"

import styles from "../config/Styles"
import {getCategories} from "../config/Categories"
import times from "lodash.times"

const { Background, CategoryStyle, CardStyle, CardSlider } = styles
const [codes, names, colors] = getCategories()

const localCategories = ["A", "K", "C", "J", "M"]
const startRadius = 10

const Card = ({name, username, language, otherLanguages, funfact, bio}) => {
    return (
        <CardStyle style={{margin: "8px"}}>
            <div style={{boxShadow: "0 3px rgba(199,199,217,0.5)", borderRadius: "16px", padding: "20px"}}>
                <h2 style={{margin: "0 0 4px 0"}}>{name}</h2>
                <h4 style={{margin: "0"}}>{`@${username}`}</h4>
            </div>

            <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", marginTop: "16px"}}>
                {times(localCategories.length, i => <div key={"circle" + i}>
                    <CategoryStyle style={{margin: "4px", cursor: "default"}}
                                   color={colors.filter((c, j) => codes[j] === localCategories[i])}
                                   active={true}
                                   radius={6}>
                        <p style={{margin: "0", color: "white", fontSize: "12px"}}>{names.filter((n, j) => codes[j] === localCategories[i])[0].replace(":", " ")}</p>
                    </CategoryStyle>
                </div>)}
            </div>

            <div style={{textAlign: "left", padding: "0 16px", marginBottom: "16px"}}>
                <p style={{margin: "4px", marginTop: "16px"}}><b>Language:</b> {language}</p>
                {otherLanguages && <p style={{margin: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}><b>Other Languages:</b> {otherLanguages.join(", ").split(0, -2)}</p>}
                <p style={{margin: "4px", marginTop: "16px"}}><b>Fun Fact:</b> {funfact}</p>
                <p style={{margin: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}><b>Bio:</b> {bio}</p>
            </div>
        </CardStyle>
    )
}

const Discover = () => {
    const [active, setActive] = useState(-1)
    const [selected, setSelected] = useState(-1)

    const handleMouse = (i, enter) => {
        setActive(enter ? i : -1)
    }

    const handleClick = (i) => {
        if (i !== localCategories.length)
            setSelected(selected === i ? -1 : i)
    }

    return (
        <Background style={{paddingTop: "15vh", paddingBottom: "15vh", minHeight: "65vh"}}>
            <h1 style={{marginLeft: "8px", marginBottom: "4px"}}>Discover</h1>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    {times(localCategories.length + 1, i => <div style={{marginRight: "8px"}} key={"circle" + i}>
                        <CategoryStyle style={{margin: `${4 - ((active === i && selected === -1) || selected === i ? 2 : 0)}px ${4 - ((active === i && selected === -1) || selected === i ? 4 : 0)}px`}}
                                       color={colors.filter((c, j) => codes[j] === localCategories[i])}
                                       active={i === localCategories.length ? false :
                                           (active === -1 && selected === -1 ? true : active === i || selected === i)}
                                       radius={startRadius + ((active === i && selected === -1) || selected === i ? 2 : 0)}
                                       onMouseOver={() => handleMouse(i, true)}
                                       onMouseOut={() => handleMouse(i, false)}
                                       onClick={() => handleClick(i)}>
                            <h4 style={{margin: "0", color: "white"}}>{i === localCategories.length ?
                                "+" :
                                names.filter((n, j) => codes[j] === localCategories[i])[0].replace(":", " ")}</h4>
                        </CategoryStyle>
                    </div>)}
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <div style={{marginRight: "8px"}} key={"lang"}>
                        <CategoryStyle style={{margin: `4px`}}
                                       active={false}
                                       radius={startRadius}
                                       //onMouseOver={() => handleMouse(i, true)}
                                       //onMouseOut={() => handleMouse(i, false)}
                                       /*onClick={() => handleClick(i)}*/>
                            <h4 style={{margin: "0", color: "white"}}>Language</h4>
                        </CategoryStyle>
                    </div>
                </div>
            </div>
            <div style={{overflow: "hidden", marginTop: "32px", position: "relative"}}>
                <CardSlider>
                    <Card name={"José"} username={"jose"}
                          language={"Spanish"} otherLanguages={["English", "Galician"]}
                          funfact={"I love koalas 🐨"} bio={"A work in progress..."}/>
                    <Card name={"José"} username={"jose"}
                          language={"Spanish"} otherLanguages={["English", "Galician"]}
                          funfact={"I love koalas 🐨"} bio={"A work in progress..."}/>
                    <Card name={"José"} username={"jose"}
                          language={"Spanish"} otherLanguages={["English", "Galician"]}
                          funfact={"I love koalas 🐨"} bio={"A work in progress..."}/>
                    <Card name={"José"} username={"jose"}
                          language={"Spanish"} otherLanguages={["English", "Galician"]}
                          funfact={"I love koalas 🐨"} bio={"A work in progress..."}/>
                    <Card name={"José"} username={"jose"}
                          language={"Spanish"} otherLanguages={["English", "Galician"]}
                          funfact={"I love koalas 🐨"} bio={"A work in progress..."}/>
                    <Card name={"José"} username={"jose"}
                          language={"Spanish"} otherLanguages={["English", "Galician"]}
                          funfact={"I love koalas 🐨"} bio={"A work in progress..."}/>
                </CardSlider>
            </div>
        </Background>
    )
}

export default Discover