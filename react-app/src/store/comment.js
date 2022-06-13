const GET_COMMENTS = 'comment/GET_COMMENTS';
const CREATE_COMMENT = 'comment/CREATE_COMMENT';
const DELETE_COMMENT = 'comment/DELETE_COMMENT';
const EDITED_COMMENT = 'comment/EDITED_COMMENT';

const getCom = (comments) => ({
    type: GET_COMMENTS,
    payload: comments,
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment,
})

const removeComment = (id) => ({
    type: DELETE_COMMENT,
    payload: id,
});

// export const getAllComments = () => async (dispatch) => {
//     const res = await fetch("/api/comments/all")
//     const data = await res.json()
//     console.log(">>>>>>>>", data)
//     if (res.ok) {
//         dispatch(getAllCom(data))
//     } else {
//         return data
//     }
// }
export const getComments = (post_id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${post_id}`)
    const data = await res.json()
    // console.log(">>>>>>>>", data)
    if (res.ok) {
        dispatch(getCom(data))
    } else {
        return data
    }
}


export const postComment = (comment) => async (dispatch) => {
    const { user_id, post_id, description } = comment;
    const form = new FormData();
    form.append("user_id", user_id);
    form.append("post_id", post_id);
    form.append("description", description);

    const res = await fetch("/api/comments/new", {
        method: "POST",
        body: form,
    });

    const data = await res.json()

    if (res.ok) {
        dispatch(createComment(data))
    } else {
        return data
    }
};

export const deleteComment = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });

    const data = await res.json();
    if (res.ok) {
        dispatch(removeComment(data.id))
    } else {
        return data
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_COMMENTS:
            action.payload.comments.map(comment => newState[comment.id] = comment)
            return newState
        case CREATE_COMMENT:
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_COMMENT:
            delete newState[action.payload]
            return newState
        // case EDITED_POST:
        //     newState[action.payload.id] = action.payload
        //     return newState
        default:
            return state;
    }
}
