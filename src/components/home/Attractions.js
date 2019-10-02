import React from "react"
import Attraction from "./Attraction"
import "./Attractions.css"

const Attractions = props => {
   console.log( props.attractions)
    return (
        <>
            <article className="explorerList">
                {
                    props.attractions.map(ride =>
                        <Attraction key={ride.id} ride={ride} {...props} />)
                }
            </article>
        </>
    )
}

export default Attractions