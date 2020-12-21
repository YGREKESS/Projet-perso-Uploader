import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function UploadBar() {

    const form = useSelector(state => state.form)
    const { form : { files } } = form

    const uploadStats = useSelector(state => state.uploadStats)
    const { bytes, progress } = uploadStats;

    useEffect(() => {
        return () => {
        }
    }, [bytes, progress])

    return (
        <div>
            {
                progress > 0 ? 
                <div className="progress-bar-div">
                    <div className={"progress-bar-description"}>
                        <span>{files.length} fichier{files.length > 1 ? "s" : null}</span>
                        <span>{bytes}</span>
                    </div>
                    <div style={{ width: `${progress}%` }} className="progress-bar-span"></div>
                </div>
                :
                null
            }
        </div>
    )
}
