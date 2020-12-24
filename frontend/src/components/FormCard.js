import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { addFileAction, deleteFileAction, setFrom, setMessage, setTo, validationForm } from '../actions/formActions';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFiles } from '../actions/uploadActions';
import { AiOutlineFileAdd, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDropzone } from "react-dropzone";
import { Link } from 'react-router-dom';
import UploadBar from './UploadBar';

export default function FormCard({ props }) {
    
    const [importFile, setImportFile] = useState(false)

    const onDrop = useCallback((acceptedFiles) => {
        dispatch(addFileAction(acceptedFiles[0]))            
        setImportFile(false)
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop})

    const dispatch = useDispatch()

    const myForm = useSelector(state => state.form)
    const { form } = myForm;

    const myValidation = useSelector(state => state.validation)
    const { error, success } = myValidation;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            if (success) {
                dispatch(uploadFiles(form, props))
            }    
        }
        return () => {
            mounted = false;
        }
    }, [onDrop, importFile, form, error, success])

/*     const addFile = (e) => {
        console.log(e)
        if (e.target.files[0]) {
            dispatch(addFileAction(e.target.files[0]))
        }
        setImportFile(false)
    } */

    const deleteItem = (e, name) => {
        e.preventDefault();
        dispatch(deleteFileAction(name))
    }
    
    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(validationForm(form));
    }

    const clickImport = () => {
        setImportFile(true)
    }

    return (
        <div>
            <div className={"app-card"}>
                <form>
                    <div className={"app-card-header"}>
                        <div className={"app-card-header-inner"}>
                            <div className={"app-file-select-zone" + (error.files ? " error" : "")}>
                                {
                                form.files.length > 0 ?
                                    form.files.map((file, index) => (
                                        <div key={index} className={"app-file-select"}>
                                            <span className={"app-file-name"}>{file.name}</span>
                                            <span className={"app-file-delete"} onClick={(e) => deleteItem(e, file.name)}><IoMdClose /></span>
                                        </div>
                                    ))
                                    : null
                                }
                                <div className={"drop-zone"} {...getRootProps({
                                    onClick: () => clickImport(),
                                    onDrop: () => clickImport()
                                })} >
                                    <input type="file" {...getInputProps()} />
                                        <span className={"app-icon" + (importFile ? "-loading upl" : "")}> {importFile ? <AiOutlineLoading3Quarters size={60}/> : <AiOutlineFileAdd size={60}/>}</span>
                                        <span className={"app-description"}>Déposer vos fichiers ici.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"app-card-content"}>
                        <UploadBar/>
                        <div className={"app-card-content-inner"}>
                            <div className={"app-form-item" + (error.to ? " error" : "")}>
                                <label htmlFor={"to"}>Envoyer à</label>
                                <input name={"to"} placeholder={"destinataire@destinataire.com"} type={"text"} id={"to"} value={form.to} onChange={(e) => dispatch(setTo(e.target.value))} />
                                {error.to ? <span className="span-error">{error.to}</span> : null}
                            </div>
                            <div className={"app-form-item" + (error.from ? " error" : "")}>
                                <label htmlFor={"from"}>De</label>
                                <input name={"from"} placeholder={"expediteur@expediteur.com"} type={"text"} id={"from"} value={form.from} onChange={(e) => dispatch(setFrom(e.target.value))} />
                                {error.from ? <span className="span-error">{error.from}</span> : null}
                            </div>
                            <div className={"app-form-item"}>
                                <label htmlFor={"message"}>Message<span> (optionnel)</span></label>
                                <textarea name={"message"} id={"message"} rows={4} value={form.message} onChange={(e) => dispatch(setMessage(e.target.value))} />
                            </div>
                            <div className={"app-form-actions"}>
                                <Link to="" className={"app-button primary"} onClick={onFormSubmit}>Envoyer</Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
