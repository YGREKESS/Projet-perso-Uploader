import React from 'react'
import Header from './Header'
import '../css/app.css'
import DownloadCard from './DownloadCard'

export default function LayoutDownload(props) {
    return (
        <div className={"app-layout"}>
            <div className={"app-container"}>
                <Header />
                <div className={"app-content"}>
                    <DownloadCard id={props.match.params.id}/>
                </div>
            </div>
        </div>
    )
}
