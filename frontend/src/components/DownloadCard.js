import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from "axios";
import { AiOutlineDownload } from 'react-icons/ai';
import qs from 'qs';
import {formatBytes} from '../helpers/formatBytes'
import { recupPostInfos, resetPostDl } from '../actions/downloadActions';
import { Link } from 'react-router-dom';
import { resetPostUpl, resetStats } from '../actions/uploadActions';
import { resetForm } from '../actions/formActions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { SiGooglemessages } from 'react-icons/si'

export default function DownloadCard({id}) {

    const [filesDownloaded, setFilesDownloaded] = useState(0);
    const [bytes, setbytes] = useState(0);
    const [progress, setProgress] = useState(0);
    const [size, setSize] = useState(0);

    const downloadPost = useSelector(state => state.download);
    const { loading, post, error } = downloadPost;


    const dispatch = useDispatch();

    const resetState = () => {
        dispatch(resetPostUpl());
        dispatch(resetPostDl());
        dispatch(resetForm());
        dispatch(resetStats());
    }

    useEffect(() => {
        if (Object.keys(post).length === 0) {
            dispatch(recupPostInfos(id))
        }
        if (Object.keys(post).length !== 0) {
            console.log("plus vide")
            setSize(formatBytes(sizePost()))
        }
        return () => {  
        }
    }, [dispatch, loading, filesDownloaded, bytes, progress])
    
    const sizePost = () => {
        const file = post.files;
        return file.reduce((total, file) => {
            return total + (1 * file.size)
        }, 0)
    }

    const downloadFiles = async (files) => {
        console.log(files)
        let array = [];
        if (Array.isArray(files)) {
            setFilesDownloaded(files.length)
            for (let i = 0; i < files.length; i++) {
                array.push(files[i]._id)
            }
        } else {
            setFilesDownloaded(1)
            array.push(files._id)
        }
        const params = { id: array };
        const url = qs.stringify(params)
        try {
            const res = await Axios.get(`http://localhost:5001/api/download/${url}`, {
                    onDownloadProgress: progressEvent => {
                    setbytes(formatBytes(progressEvent.loaded))
                    setProgress(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                    setTimeout(() => setProgress(0), 2000)
                    }
            })
            if (res) {
                window.open(`http://localhost:5001/api/download/${url}`);
            }            
        } catch (error) {
            console.log(error)
        }
    }

    return ( loading ?
            <span className={"app-icon-loading send"}> <AiOutlineLoading3Quarters size={60}/> </span>
            :
            <div>
                <div className={"app-card"}>
                    <div className={"app-card-header"}>
                        <div className={"app-card-header-inner"}>
                            <div className={"app-file-select-zone"}>
                                {
                                post.files.length > 0 ?
                                    post.files.map((x, index) => (
                                        <div key={index} className={"app-file-select"}>
                                            <span className={"app-file-name"}>{x.originalname}</span>
                                            <span className={"app-file-delete"} onClick={() => downloadFiles(x)}><AiOutlineDownload /></span>
                                        </div>
                                    ))
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"app-card-content"}>
                        {
                            progress > 0 ?
                            <div className="progress-bar-div">
                                <div className={"progress-bar-description"}>
                                    <span>{filesDownloaded} fichier{filesDownloaded > 1 ? "s" : null}</span>
                                    <span>{bytes}</span>
                                </div>
                                <div style={{ width: `${progress}%` }} className="progress-bar-span"></div>
                            </div>
                            :
                            null
                        }
                        <div className={"app-card-content-text"}>
                            <div>Nombre de fichier{post.files.length > 1 ? "s" : null} : <span>{post.files.length}</span></div>
                            <div>Taille : <span>{size}</span></div>
                            <div>Envoyé{post.files.length > 1 ? "s" : null} le : <span>{post.created_at.split('T')[0]}</span></div>
                            <div>Par : <span>{post.from}</span></div>
                            {
                                post.message ?
                                <div className={"div-download-message"}>
                                    <SiGooglemessages size={25}/>
                                    <div>{post.message}</div>
                                </div>
                                :
                                null
                            }
                        </div>
                        <div className={"app-card-content-inner"}>
                            <div className={"app-form-actions"}>
                                <Link to={"#"} className={"app-button primary"} onClick={() => downloadFiles(post.files)}>Télécharger tout <span><AiOutlineDownload size={20} /></span></Link>
                            </div>
                            <div className={"app-form-actions"}>
                                <Link to={"/"} className={"app-button"} onClick={resetState}>Envoyer d'autres fichiers</Link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
