const GET_ALL_COMMENTS = 'comment/GET_ALL_COMMENTS';
const CREATE_COMMENT = 'comment/CREATE_COMMENT';
// const DELETE_POST = 'post/DELETE_POST';
// const EDITED_POST = 'post/EDITED_POST';

const getAllCom = (comments) => ({
    type: GET_ALL_COMMENTS,
    payload: comments,
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    payload: comment,
})

export const getAllComments = () => async (dispatch) => {
    const res = await fetch("/api/comments/all")
    const data = await res.json()
    console.log(">>>>>>>>", data.comments)
    if (res.ok) {
        dispatch(getAllCom(data.comments))
    } else {
        return data
    }
}

export const postComment = (comment) => async (dispatch) => {
    const { post_id, description } = comment;
   console.log("??????", post_id, description)
    const form = new FormData();
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
