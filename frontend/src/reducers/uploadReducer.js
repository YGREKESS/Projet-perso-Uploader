function uploadReducer(state = { post: {}, }, action) {
    switch (action.type) {
        case "UPLOAD_REQUEST":
            return { loading: true, post: {} };
        case "UPLOAD_SUCCESS":
            return { loading: false, post: action.payload.post, success : true };
        case "UPLOAD_FAIL":
            return { loading: false, error: action.payload };
        case "RESET_POST":
            return { post: {}, success : false }
        default:
        return state;
    }
}

function uploadStatsReducer(state = { bytes: 0, progress: 0, time: 0 }, action) {
    switch (action.type) {
        case "SET_BYTES":
            return { ...state, bytes: action.payload };
        case "SET_PROGRESS":
            return { ...state, progress: action.payload };
        case "SET_TIME":
            return { ...state, time: action.payload };
        case "RESET_STATS":
            return { bytes: 0, progress: 0, time: 0 };
        default:
            return state;
    }
}

export { uploadReducer, uploadStatsReducer }