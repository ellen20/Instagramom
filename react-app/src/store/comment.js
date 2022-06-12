const GET_ALL_COMMENTS = 'comment/GET_ALL_COMMENTS';
// const CREATE_POST = 'post/CREATE_POST';
// const DELETE_POST = 'post/DELETE_POST';
// const EDITED_POST = 'post/EDITED_POST';

const getAll = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments,
})

export const getAllComments = () => async (dispatch) => {
    const res = await fetch("/api/comments/all")
    const data = await res.json()
    if (res.ok) {
        dispatch(getAll(data.comments))
    } else {
        return data
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_ALL_COMMENTS:
            action.payload.map(comment => newState[comment.id] = comment)
            return newState
        // case CREATE_POST:
        //     newState[action.payload.id] = action.payload
        //     return newState
        // case DELETE_POST:
        //     delete newState[action.payload]
        //     return newState
        // case EDITED_POST:
        //     newState[action.payload.id] = action.payload
        //     return newState
        default:
            return state;
    }
}
