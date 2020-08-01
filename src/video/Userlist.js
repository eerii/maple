import React from "react"

const User = ({ id, username, startCall }) => {

    return (
        <div style={{color: "white"}}>
            User {username} @ {id}
            <button style={{fontSize: "14px", padding: "4px 10px", marginLeft: "16px"}} key={"button" + id}
                    onClick={() => { startCall(id) }}>Connect</button>
        </div>
    )
}

const Userlist = ({ userlist, startCall }) => {

    return (
        <div>
            <h2>Userlist</h2>
            <div>
                <User key={"test"} id={"test"} username={"test"} startCall={startCall}/>
                {userlist.map(({connectionID, username}) => <User key={connectionID} id={connectionID} username={username} startCall={startCall}/>)}
            </div>
        </div>
    )
}

export default Userlist