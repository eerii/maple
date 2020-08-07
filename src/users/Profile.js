import React from "react"
import Modal from "../components/Modal"

const Profile = ({ username, name, tokens, setShowProfile, setLogout }) => {
    return (
        <Modal setVisible={setShowProfile}>
            <h2>{name} (@{username})</h2>
            <h4>Time Tokens: {tokens}</h4>
            <button onClick={() => {
                setLogout(true)
                setShowProfile(false)
            }}>Log Out</button>
        </Modal>
    )
}

export default Profile