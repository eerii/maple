import React from "react"

import styles from "../config/Styles"
import {Link} from "react-router-dom";

const { BottomBar: BBStyle } = styles

const BottomBar = () => {
    return (
        <BBStyle style={{textAlign: "center"}}>
            <span style={{fontSize: "14px", margin: "0"}}>MOOSE ⓒ 2020 ~ All Rights Reserved ~ <Link push="true" to="/faq">FAQs</Link></span>
        </BBStyle>
    )
}

export default BottomBar