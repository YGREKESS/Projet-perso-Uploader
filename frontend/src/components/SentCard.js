import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPostUpl, resetStats } from '../actions/uploadActions';
import { RiMailSendLine } from 'react-icons/ri'
import { resetForm } from '../actions/formActions';
import { recupPostInfos, resetPostDl } from '../actions/downloadActions';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { formatBytes } from '../helpers/formatBytes';

export default function SentCard({ id }) {

    const [size, setSize] = useState(0);
    
    const dispatch = useDispatch()

    const myDownload = useSelector(state => state.download)
    const { loading, post } = myDownload;

    const uploadStats = useSelector(state => state.uploadStats)
    const { bytes, time } = uploadStats;

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
    }, [dispatch, loading])

    const sizePost = () => {
        const file = post.files;
        return file.reduce((total, file) => {
            return total + (1 * file.size)
        }, 0)
    }

    return ( loading ? <span className={"app-icon-loading send"}> <AiOutlineLoading3Quarters size={60}/> </span> :
        <div>
            <div className={"app-card"}>
                <div className={"app-card-header"}>
                    <div className={"app-card-header-inner"}>
                        <div className={"app-card-header-send"}>
                            <span className={"app-icon"}><RiMailSendLine size={60} /></span>
                            <span className={"app-description"}>Un lien de téléchargement vient d'être envoyé au destinataire.</span>
                        </div>
                    </div>
                </div>
                <div className={"app-card-content"}>
                    <div className={"app-card-content-text"}>
                        <div className={"app-card-content-file-detail-send"}>
                            {post.files.map((file, i) => (
                                <div key={i}>Fichier n°{i + 1} : <span>{file.originalname}</span></div>
                            ))}
                        </div>
                        <div>Nombre de fichier{post.files.length > 1 ? "s" : null} : <span>{post.files.length}</span></div>
                        <div>Taille : <span>{size}</span></div>
                        <div>Envoyé{post.files.length > 1 ? "s" : null} le : <span>{post.created_at.split('T')[0]}</span></div>
                        <div>Vers : <span>{post.to}</span></div>
                    </div>
                    <div className={"app-card-content-inner"}>
                        <div className={"app-form-actions"}>
                            <Link to={"/download/" + id} className={"app-button primary"}>Voir mes fichiers</Link>
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
