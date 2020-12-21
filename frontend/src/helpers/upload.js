import Axios from 'axios';
import { apiUrl } from '../config';

export const upload = (form, cb = () => {}) => {
    
    let fData = new FormData();
    form.file.forEach((file) => {
        fData.append("files", file);
    });
    fData.append("to", form.to)
    fData.append("from", form.from)
    fData.append("message", form.message)

    const config = {
        onUploadProgress: (event) => {
            console.log("upload event", event)
            return cb({
                type: 'onUploadProgress',
                payload: event,
            })
        }
    }

    Axios.post('http://localhost:5001/api/upload', fData, config).then((response) => {
        return cb({
                type: "success",
                payload: response.data,
            })
        }).catch((err) => {
            return cb({
                type: "error",
                payload: err,
            })
        })
} 