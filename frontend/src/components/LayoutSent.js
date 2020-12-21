import React, { useEffect } from 'react'
import Header from './Header'
import '../css/app.css'
import SentCard from './SentCard'

export default function LayoutSent(props) {

    return (
        <div className={"app-layout"}>
            <div className={"app-container"}>
                <Header />
                <div className={"app-content"}>
                    <SentCard id={props.match.params.id}/>
                </div>
            </div>
        </div>
    )
}
