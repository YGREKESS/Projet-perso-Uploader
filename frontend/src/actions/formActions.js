const addFileAction = (file) => (dispatch) => {
    dispatch({ type: "ADD_FILE", payload: file })
}
const deleteFileAction = (name) => (dispatch) => {
    dispatch({ type: "REMOVE_FILE", payload: name })
}
const setTo = (to) => (dispatch) => {
    dispatch({ type: "WRITE_TO", payload: to })
}
const setFrom = (from) => (dispatch) => {
    dispatch({ type: "WRITE_FROM", payload: from })
}
const setMessage = (message) => (dispatch) => {
    dispatch({ type: "WRITE_MESSAGE", payload: message })
}
const validationForm = (form) => (dispatch) => {
    var emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (form.files.length === 0) {
        dispatch({ type : "FILES_VALIDATION_FAIL", payload : "Merci d'ajouter un fichier" })
    } else {
        if (!form.to) {
            dispatch({ type : "TO_VALIDATION_FAIL", payload : "Merci d'indiquer un destinataire." })
        } else {
            if (!emailRegex.test(form.to)) {
                dispatch({ type : "TO_VALIDATION_FAIL", payload : "Merci d'indiquer une adresse d'expédition valide." })
            } else {
                if (!form.from) {
                    dispatch({ type : "FROM_VALIDATION_FAIL", payload : "Merci d'indiquer un expéditeur." })
                } else {
                    if (!emailRegex.test(form.from)) {
                        dispatch({ type : "FROM_VALIDATION_FAIL", payload : "Merci d'indiquer une adresse de destination valide." })
                    } else {
                        dispatch({ type : "FORM_VALIDATION_SUCCESS", })
                    }
                }
            }
        }
    }
}

const resetForm = () => (dispatch) => {
    dispatch({ type: "RESET_FORM" })
}

export { addFileAction, deleteFileAction, setTo, setFrom, setMessage, validationForm, resetForm }
