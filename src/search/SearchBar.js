import React, {useEffect, useRef, useState} from "react"
import CreatableSelect from 'react-select/creatable'
import {Controller, useForm} from "react-hook-form"
import chroma from 'chroma-js'

import {getCategories} from "../config/Categories"

import styles from "../config/Styles"
import axios from "axios";
const { Modal: ModalStyle, ModalContent } = styles

const [codes, names, colors] = getCategories()

const SearchBar = ({ setShowSearch }) => {
    const { handleSubmit, clearErrors, control } = useForm({ mode: "onBlur" })

    const [list, setList] = useState(names.map((n, i) => {
        return {value: codes[i],
                label: "Category: " + n.replace(":", " "),
                color: colors[i]}
    }))

    const modalRef = useRef(null)

    const handleNext = (e) => {
        console.log(e)
    }

    const filterOptions = (input, list) => {
        return list.filter(i =>
            i.label.toLowerCase().includes(input.toLowerCase())
        )
    }

    const searchDatabase = async (input, categories=null, language=null) => {
        try {
            const token = localStorage.getItem("Token")
            if (token === null)
                console.log("ERROR: NOT AUTHORIZED")

            const headers = {
                'Authorization': `Bearer ${token}`
            }

            const post = await axios.post(
                process.env.REACT_APP_URL + "/api/searchUsers", {
                    search: input,
                    categories,
                    language
                }, { headers: headers })

            const result = post.data.rows.map((n) => {
                categories = JSON.parse(n.offer)
                const r = Math.floor(Math.random() * categories.length)

                return {value: n.username,
                        label: `${n.name} (${n.username})`,
                        color: colors.filter((c, i) => codes[i] === categories[r])[0]}
            })

            setList(result)
        } catch (e) {
            console.log(e)
        }
    }

    const handleCreate = async (input) => {
        console.log("Searching for: " + input)
        await searchDatabase(input)
    }

    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    })

    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color || "#4a4a4a")
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : null,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                },
            };
        },
        input: styles => ({ ...styles, ...dot() }),
        placeholder: styles => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!(event.target.id && event.target.id.startsWith("react-select"))) {
                console.log(event.target)
                if (modalRef.current && !modalRef.current.contains(event.target)) {
                    setShowSearch(false)
                }
            }
        }

        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, [setShowSearch])

    return (
        <ModalStyle>
            <ModalContent style={{width: "400px"}} ref={modalRef}>
                <h1>Search</h1>
                <form onSubmit={handleSubmit(handleNext)}>
                    <Controller
                        name="Search"
                        defaultValue=""
                        isClearable={true}

                        isMulti
                        options={list}

                        onChange={(n, a) => console.log("change", n, a)}
                        //onInputChange={() => console.log("input change")}
                        onCreateOption={async (i) => await handleCreate(i)}

                        styles={colourStyles}

                        as={CreatableSelect}
                        control={control}
                    />
                </form>
            </ModalContent>
        </ModalStyle>
    )
}

export default SearchBar