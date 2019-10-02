import React, { useEffect, useState, useRef } from "react"

const ItineraryItem = props => {
    let dialog = null
    const [modalIsOpen, setIsOpen] = useState(false)
    const something = useRef()

    const toggleDialog = () => {
        setIsOpen(!modalIsOpen)

        if (modalIsOpen) {
            dialog.removeAttribute("open")
        } else {
            dialog.setAttribute("open", true)
        }
    }

    useEffect(() => {
        dialog = document.getElementById(props.item.id)

        const handler = e => {
            // Close all dialogs when ESC is pressed, and close search field
            if (e.keyCode === 27) {
                if (modalIsOpen) {
                    toggleDialog()
                }
            }
        }

        window.addEventListener("keyup", handler)
        return () => window.removeEventListener("keyup", handler)
    })

    return(
        <div key={props.item.id}>
            <dialog id={props.item.id} className="dialog--time">
                <label htmlFor="starttime">When do you want to ride?</label>
                <input ref={something} type="text" name="something" autoFocus required />

                <button onClick={() => {
                    toggleDialog()
                    props.updateItinerary(props.item.id, something.current.value)
                }}>Add to Itinerary</button>

                <button style={{
                    position: "absolute",
                    top: "0.25em",
                    right: "0.25em"
                }}
                    id="closeBtn"
                    onClick={toggleDialog}>X</button>
            </dialog>
            <li>{props.item.attraction.name} at {props.item.starttime}</li>
            <button className="delete-btn" onClick={() => props.deleteItem(props.item.id)}> Delete</button>
            <button className="fakeLink ride__link"
                onClick={() => toggleDialog()}>
                Update
            </button>
            </div>
    )
}

export default ItineraryItem