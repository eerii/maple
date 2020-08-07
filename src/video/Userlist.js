import React from "react"

import styles from "../config/Styles"
const { SpecialText } = styles

const User = ({ id, username, name, startCall }) => {
    return (
        <div style={{color: "white", display: "flex", marginBottom: "10px"}}>
            <span style={{}}>
                <h4 style={{margin: "0"}}> {(!name || name === "no name") ? "No Name" : name} </h4>
                <SpecialText style={{margin: "0"}}>@{username}</SpecialText>
                <p style={{margin: "0", fontStyle: "italic", fontSize: "10px"}}>ID: {id}</p>
            </span>
            <button style={{fontSize: "14px", padding: "4px 10px", margin: "6px 0 6px 16px"}} key={"button" + id}
                    onClick={() => { startCall(id, username) }}>Connect</button>
        </div>
    )
}

const Userlist = ({ userlist, startCall }) => {
    return (
        <div>
            <h2>Userlist</h2>
            <div>
                {!userlist && <p>Loading...</p>}
                {userlist && userlist.map(({connectionID, username, name}) => <User key={connectionID} id={connectionID} username={username} name={name} startCall={startCall}/>)}

                {/*<User key={"1"} id={"@=)u8034809"} username={"goddess"} name={"Marie Curie"} startCall={startCall}/>
                <User key={"2"} id={"@=)uFADF00d"} username={"lightspeed"} name={"Albert Einstein"} startCall={startCall}/>
                <User key={"3"} id={"@=)u504823r"} username={"aliveordead"} name={"Schrödinger"} startCall={startCall}/>*/}
            </div>
        </div>
    )
}

export default Userlist