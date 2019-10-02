import React, { useState, useEffect, useRef } from "react"

const Attraction = props => {
    let dialog = null
    const starttime = useRef()
    const [modalIsOpen, setIsOpen] = useState(false)

    const toggleDialog = () => {
        setIsOpen(!modalIsOpen)

        if (modalIsOpen) {
            dialog.removeAttribute("open")
        } else {
            dialog.setAttribute("open", true)
        }
    }

    const addToItinerary = (id) => {
        console.log(id)
        fetch('http://localhost:8000/itineraryitems', {
            "method": "POST",
            "headers": {
                "Accept": "application/json",
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            },
            "body": JSON.stringify({
                "ride_id": id,
                "starttime": starttime.current.value
            })
        })
            .then(response => response.json())
            .then(() => {
                console.log("Added")
                props.history.push("/myitinerary")
            })
    }

    useEffect(() => {
        dialog = document.getElementById(props.ride.id)

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

console.log(starttime)
    return (
        <>
            <dialog id={props.ride.id} className="dialog--time">
                <label htmlFor="starttime">When do you want to ride?</label>
                <input ref={starttime} type="text" name="starttime" autoFocus required />

                <button onClick={() => addToItinerary(props.ride.id)}>Add to Itinerary</button>

                <button style={{
                    position: "absolute",
                    top: "0.25em",
                    right: "0.25em"
                }}
                    id="closeBtn"
                    onClick={toggleDialog}>X</button>
            </dialog>

            <section className="ride">
                <button className="fakeLink ride__link"
                    onClick={() => toggleDialog()}>
                        {props.ride.id}
                    {props.ride.name}
                </button>
            </section>
        </>
    )
}

export default Attraction
