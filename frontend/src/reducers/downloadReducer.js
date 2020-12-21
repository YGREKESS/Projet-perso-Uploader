export default function downloadReducer(state = { post: {}, loading: true }, action) {
    switch (action.type) {
        case "POST_INFOS_REQUEST":
            return { loading: true, post: {} };
        case "POST_INFOS_SUCCESS":
            return { loading: false, post: action.payload };
        case "POST_INFOS_FAIL":
            return { loading: false, error: action.payload };
        case "RESET_POST_DL":
            return { post: {}, loading: true }
        default:
        return state;
    }
}