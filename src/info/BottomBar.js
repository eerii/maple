import React from "react"

import styles from "../config/Styles"
import {Link} from "react-router-dom";

const { BottomBar: BBStyle } = styles

const BottomBar = () => {
    return (
        <BBStyle style={{textAlign: "center"}}>
            <p style={{fontSize: "14px", margin: "0"}}>MOOSE ⓒ 2020 ~ All Rights Reserved ~ <Link push to="/faq">FAQs</Link></p>
        </BBStyle>
    )
}

export default BottomBar