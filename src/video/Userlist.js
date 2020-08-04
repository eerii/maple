import React from "react"

const User = ({ id, username, startCall }) => {

    return (
        <div style={{color: "white"}}>
            User {username} @ {id}
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
                {userlist && userlist.map(({connectionID, username}) => <User key={connectionID} id={connectionID} username={username} startCall={startCall}/>)}
            </div>
        </div>
    )
}

export default Userlist