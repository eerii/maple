import React from "react"

import styles from "../config/Styles"

const { Background, Subtitle } = styles

const Question = ({ children, title, number }) => {
    return (
        <div style={{display: "flex", alignItems: "flex-start"}}>
            <p style={{fontSize: "52px", fontWeight: "bold", margin: "0", marginRight: "20px"}}>{number}.</p>
            <div style={{marginTop: "4px", marginBottom: "28px"}}>
                <Subtitle style={{fontSize: "28px", paddingBottom: "0", marginBottom: "6px"}}>{title}</Subtitle>
                <p style={{margin: "0"}}>{children}</p>
            </div>
        </div>
    )
}

const FAQ = () => {
    return (
        <Background style={{paddingTop: "15vh", paddingBottom: "15vh"}}>
            <h1>Frequent Asked Questions</h1>

            <Question title={"What is MOOSE?"} number={1}>
                MOOSE is a global community of people who share their <b>skills</b> (in the form of knowledge, experience or an act of service) in exchange for <b>Time Tokens</b>. MOOSE users may then use Time Tokens to redeem the skills and services they need in return.
            </Question>
            <Question title={"What counts as a skill?"} number={2}>
                At MOOSE, a skill can be anything from knowledge to experience, an act of service, a talent, or perhaps your favourite hobby. We firmly believe that <b>everyone has something to share</b>. What seems small or inconsequential to you may be a great help to someone else, and vice versa!
            </Question>
            <Question title={"What is a Time Token?"} number={3}>
                MOOSE believes everyone who gives should get <b>something in return</b>. For every transaction that takes place between MOOSE users, you’ll be able to bank the time spent in service to others. Please note that everyone’s time will be valued <b>equally</b>.
            </Question>
            <Question title={"How does the exchange take place?"} number={4}>
                We created a brand new video calling system that is secure and private by design, engineered specifically for MOOSE users. We made it so everyone can easily use it, built with vulnerable populations in mind, and packed it with powerful features that take care of Time-Exchange for you.
            </Question>
            <Question title={"What browsers does MOOSE support?"} number={5}>
                We don't want to bother you with technicalities, so we will get right to the point. You most likely already have support for MOOSE video calling system in your browser. We recommend the latest version of the following browsers:
                <ul>- For Desktop: Firefox, Chrome (and Chromium based browsers), Safari and Edge. The legacy version of Internet Explorer won't work as it doesn't have the modern technologies needed for browser-based video calling.</ul>
                <ul>- For Android: Chrome and Firefox work, but we haven't tried all of the Android browsers yet. If you want to help us, please join MOOSE beta!</ul>
                <ul>- For iOS: Only Safari will work in iOS due to restrictions on Apple side.</ul>
                For a more precise information, you need a browser that supports WebRTC connections, because that is the open framework in which MOOSE video is built. For the general website, Javascript is also recommended.
            </Question>
            <Question title={"Is MOOSE video secure?"} number={6}>
                Absolutely! We take security very seriously, as our users are the most important part of the platform. We take every step in order to ensure a secure environment for skill exchange, specially around sensitive video calling. <br/><br/>
                What happens when you video call someone? Your browsers exchange signals between them, and once they agree on a connection, they start streaming video to one another. They do so in a way that your video never crosses a server we own, it only streams directly to the other member of the call.
            </Question>
            <Question title={"Is MOOSE privacy friendly?"} number={7}>
                Your privacy is fundamental to us. That is why we don't collect any hidden personal data such as your IP or your location. We don't use or have affiliation with any Google or Facebook product, including Google Analytics, because we believe they don't make a fair use of users' data. <br/><br/>
                As for the information we collect, it is the one we believe necessary for your profile, and we give you every option from hiding to deleting it at any moment. Additionally, we don't know your password and we don't store it in a database. We use a mathematical formula that can check if it is right, but will give no clue as to what it is. MOOSE staff will NEVER ask for your password. If someone does, they are probably impersonating us and are scammers, so please report them back to us inmediately and we will take action. <br/><br/>
                The video system doesn't log any personal information, just the time you spend calling for keeping track of Time Tokens. <br/><br/>
                We believe transparency is fundamental in a fair data handling, so we are available at any time for you to contact us about any concern or doubt regarding data. <br/><br/>
                As per GPDR and other privacy regulation standards, that we extend to everyone using the site, we also give you the option to exercise your rights of access, rectification, erasure, restriction, portability and objection. <br/><br/>
                If it wasn't clear enough, we won't sell your data to any advertiser, in fact, we don't even collect personal data that could interest them. MOOSE service will not be built on ads or data collection, but in protecting users rights.
            </Question>
        </Background>
    )
}

export default FAQ