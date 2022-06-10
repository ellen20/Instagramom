const GET_ALL_POSTS = 'post/GET_ALL_POSTS';
const CREATE_POST = 'post/CREATE_POST';
const DELETE_POST = 'post/DELETE_POST';
const EDITED_POST = 'post/EDITED_POST';

const getAll = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts,
})

const createNewPost = (post) => ({
    type: CREATE_POST,
    payload: post,
});
const removePost = (id) => ({
    type: DELETE_POST,
    payload: id,
});
const editedPost = (post) => ({
    type: EDITED_POST,
    payload: post,
});

export const getAllPosts = () => async (dispatch) => {
    const res = await fetch("/api/posts/all")
    const data = await res.json()
    if (res.ok) {
        dispatch(getAll(data.posts))
    } else {
        return data
    }

}

export const uploadPost = (post) => async (dispatch) => {
    const { file, description } = post;
    const form = new FormData();
    form.append("image", file);
    form.append("description", description);

    const res = await fetch("/api/posts/new", {
        method: "POST",
        body: form,
    });

    const data = await res.json()
    if (res.ok) {
        dispatch(createNewPost(data))
    } else {
        return data
    }
};

export const editPost = (id, post) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });

    const data = await res.json();
    if (res.ok) {
        dispatch(editedPost(data))
    } else {
        return data
    }
};

export const deletePost = (id) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
    });

    const data = await res.json();
    if (res.ok) {
        dispatch(removePost(data.id))
    } else {
        return data
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_ALL_POSTS:
            action.payload.map(post => newState[post.id] = post)
            return newState
        case CREATE_POST:
            newState[action.payload.id] = action.payload
            return newState
        case DELETE_POST:
            delete newState[action.payload]
            return newState
        case EDITED_POST:
            newState[action.payload.id] = action.payload
            return newState
        default:
            return state;
    }
}
