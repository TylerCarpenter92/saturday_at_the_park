import React, { useEffect, useState, useRef } from "react"
import ItineraryItem from "./itineraryItem"

const MyItinerary = props => {
    //  create a state variable for itinerary items - useState()
    const [itineraryList, setItineraryList] = useState([])


    // fetch the data from localhost:8000/itineraryitems
    // convert to json
    // store in state
    useEffect(() => {
        fetch("http://localhost:8000/itineraryitems", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
        .then(response => response.json())

        .then(  setItineraryList)
    }, [])



    const deleteItem = (id) => {
        if(window.confirm(`are you sure you want to delete that?`)){
        fetch(`http://localhost:8000/itineraryitems/${id}`, {
            "method": "DELETE",
            "headers": {
                "Accept": "application/json",
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
        .then(() => {
            fetch("http://localhost:8000/itineraryitems", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
        .then(response => response.json())
        .then(setItineraryList)
        })
    }
    }

    const updateItinerary = (id, value) => {
        fetch(`http://localhost:8000/itineraryitems/${id}`, {
            "method": "PUT",
            "headers": {
                "Accept": "application/json",
                "Content-Type":"application/json",
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            },
            "body": JSON.stringify({
                "starttime": value
            })
        })
            .then(() => {
                fetch("http://localhost:8000/itineraryitems", {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "authorization": `Token ${localStorage.getItem("kennywood_token")}`
                }
            })
            .then(response => response.json())
            .then(setItineraryList)
            })
    }


    return(
        <>
            <h2>what i want to do on saturday</h2>
            <ul>
                {

                    itineraryList.map((item) => {
                        return <ItineraryItem item={item} updateItinerary={updateItinerary} deleteItem={deleteItem} {...props} />

                    })
                }
            </ul>

        </>
    )

}

export default MyItinerary