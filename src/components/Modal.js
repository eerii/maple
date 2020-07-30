import React, { useRef, useEffect } from "react"

import styles from "../config/Styles"
const { Modal: ModalStyle, ModalContent } = styles

const Modal = ({children, setVisible}) => {
    const modalRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setVisible(false)
            }
        }

        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, [setVisible])

    return (
        <ModalStyle>
            <ModalContent ref={modalRef}>
                {children}
            </ModalContent>
        </ModalStyle>
    )
}

export default Modal