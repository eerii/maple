import React from "react"

const User = ({ id, username, name, startCall }) => {
    return (
        <div style={{color: "white"}}>
            User {(!name || name === "no name") ? "No Name" : name} {username} @ {id}
            <button style={{fontSize: "14px", padding: "4px 10px", marginLeft: "16px"}} key={"button" + id}
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
            </div>
        </div>
    )
}

export default Userlist