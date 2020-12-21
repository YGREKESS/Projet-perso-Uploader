import React, { useEffect } from 'react'
import Header from './Header'
import '../css/app.css'
import FormCard from './FormCard'
import { useSelector } from 'react-redux'

export default function LayoutUpload(props) {

/*     const myUpload = useSelector(state => state.upload)
    const { post } = myUpload;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            if (Object.keys(post).length !== 0) {
                props.history.push("/sent/" + post._id)
            }
        }
        return () => {
            mounted = false;
        }
    }, []) */
    
    return (
        <div className={"app-layout"}>
            <div className={"app-container"}>
                <Header/>
                <div className={"app-content"}>
                    <FormCard props={props}/>
                </div>
            </div>
        </div>
    )
}
