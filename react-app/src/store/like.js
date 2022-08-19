const CREATE_LIKE = 'like/CREATE_LIKE';
const DELETE_LIKE = 'like/DELETE_LIKE';

const createLike = (like) => ({
    type: CREATE_LIKE,
    payload: like,
})

const deleteLike = (id) => ({
    type: DELETE_LIKE,
    payload: id,
})

export const addLike = (post_id) => async (dispatch) => {
    console.log("?????", post_id)
    const res = await fetch(`/api/likes/${post_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json()

    if (res.ok) {
        dispatch(createLike(data))
    } else {
        return data
    }
};

export const removeLike = (id) => async (dispatch) => {
    const res = await fetch(`/api/likes/${id}`, {
        method: "DELETE",
    });

    const data = await res.json();
    if (res.ok) {
        dispatch(deleteLike(data))
    } else {
        return data
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {

        case CREATE_LIKE:
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_LIKE:
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
}
