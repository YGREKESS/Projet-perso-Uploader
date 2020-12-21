import Axios from 'axios'

const recupPostInfos = (id) => async (dispatch) => {
    dispatch({ type: "POST_INFOS_REQUEST" });
    try {
        const res = await Axios.get('http://localhost:5001/api/post/' + id);
        dispatch({ type: "POST_INFOS_SUCCESS", payload: res.data[0] });
    } catch (error) {
        dispatch({ type: "POST_INFOS_FAIL", payload: error });
    }
}

const resetPostDl = () => (dispatch) => {
    dispatch({ type: "RESET_POST_DL" })
}

export { recupPostInfos, resetPostDl };