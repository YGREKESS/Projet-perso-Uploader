export function formReducer(state = { form : { files: [], to: "", from: "", message: "" } }, action) {
    switch (action.type) {
        case "ADD_FILE":
            return { ...state, form: {...state.form, files: [...state.form.files, action.payload]} };
        case "REMOVE_FILE":
            return { ...state, form: {...state.form, files: state.form.files.filter(file => file.name !== action.payload)} };
        case "WRITE_TO":
            return { ...state, form: { ...state.form, to: action.payload } };
        case "WRITE_FROM":
            return { ...state, form: { ...state.form, from: action.payload } };
        case "WRITE_MESSAGE":
            return { ...state, form: { ...state.form, message: action.payload } };
        case "RESET_FORM":
            return { form : { files: [], to: "", from: "", message: "" } };
        default:
        return state;
    }  
}

export function validationFormReducer(state = { error : { files: "", to: "", from: "", message: "" } }, action) {
    switch (action.type) {
        case "FILES_VALIDATION_FAIL":
            return { ...state, error: { files: action.payload } };
        case "TO_VALIDATION_FAIL":
            return { ...state, error: { to: action.payload } };
        case "FROM_VALIDATION_FAIL":
            return { ...state, error: { from: action.payload } };
        case "FORM_VALIDATION_SUCCESS":
            return { ...state, success: true };
        case "RESET_FORM":
            return { error : { files: "", to: "", from: "", message: "" }, success: false };
        default:
        return state;
    }  
}