import Axios from "axios";
import {formatBytes, formatSeconds} from '../helpers/formatBytes';
import Cookie from 'js-cookie';

const resetPostUpl = () => (dispatch) => {
    dispatch({ type: "RESET_POST" })
}

const sendEmail = (id, to, from, message) => (dispatch) => {
    const params = { id: id, to: to, from: from, message: message };
    dispatch({ type: "EMAIL_REQUEST" })
    try {
        const res = Axios.post(`http://localhost:5001/api/sendemail`, params)
        dispatch({ type: "EMAIL_SUCCESS" })
    } catch (error) {
        dispatch({ type: "EMAIL_FAIL" })
        console.log(error)
    }
}

const uploadFiles = (form, props) => async (dispatch) => {
    dispatch({ type: "UPLOAD_REQUEST" })
    let fData = new FormData();
    form.files.forEach((file) => {
        fData.append("files", file);
    });
    fData.append("to", form.to)
    fData.append("from", form.from)
    fData.append("message", form.message)
    try {
        const res = await Axios.post('http://localhost:5001/api/upload', fData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: progressEvent => {
                dispatch(setBytes(formatBytes(progressEvent.loaded)));                
                dispatch(setProgress(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))));
                dispatch(setTime(formatSeconds(progressEvent.timeStamp / 10000)));
            }
        })
        dispatch({ type: "UPLOAD_SUCCESS", payload: res.data });
        //dispatch(sendEmail(res.data.post._id, res.data.post.to, res.data.post.from, res.data.post.message));
        setTimeout(() => props.history.push("/sent/" + res.data.post._id), 1500)
    } catch (error) {
        console.log(error)
        dispatch({ type: "UPLOAD_FAIL" })
    } 
}

const setBytes = (bytes) => (dispatch, getState) => {
    dispatch({ type: "SET_BYTES", payload: bytes })
    const {uploadStats} = getState();
    console.log(uploadStats);
    Cookie.set("uploadStats", JSON.stringify(uploadStats));

}

const setProgress = (progress) => (dispatch, getState) => {
    dispatch({ type: "SET_PROGRESS", payload: progress })
    const {uploadStats} = getState();
    console.log(uploadStats);
    Cookie.set("uploadStats", JSON.stringify(uploadStats));
}

const setTime = (time) => (dispatch, getState) => {
    dispatch({ type: "SET_TIME", payload: time })
    const {uploadStats} = getState();
    console.log(uploadStats);
    Cookie.set("uploadStats", JSON.stringify(uploadStats));
}

const resetStats = () => (dispatch, getState) => {
    dispatch({ type: "RESET_STATS" })
    Cookie.remove("uploadStats");
}

export { resetPostUpl, sendEmail, setBytes, setProgress, uploadFiles, resetStats, setTime };