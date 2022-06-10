const GET_POSTS = "post/GET_POSTS";
const GET_SINGLE_POST = "post/GET_SINGLE_POST";
const GET_FOLLOWING_POSTS = "post/GET_FOLLOWING_POSTS";
const GET_ALL_POSTS = 'post/GET_ALL_POSTS';
const CREATE_POST = 'post/CREATE_POST';
const DELETE_POST = 'post/DELETE_POST';

const getAll = (posts) => ({
    type: GET_ALL_POSTS,
    payload: posts,
})

const getMyPosts = (posts, userId) => ({
    type: GET_POSTS,
    payload: posts,
    userId,
});

const getSinglePost = (posts) => ({
    type: GET_SINGLE_POST,
    payload: posts,
});

const createNewPost = (post) => ({
    type: CREATE_POST,
    payload: post,
});
const removePost = (id) => ({
    type: DELETE_POST,
    payload: id,
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
    console.log(">>>>>>>>", data)
    if (res.ok) {
        dispatch(createNewPost(data))
    } else {
        return data
    }
};

export const editPost = (post, id) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });
    const data = await res.json();

};

export const deletePost = (id) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
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
        // case GET_POSTS:
        //     return { ...state, [action.userId]: action.payload };
        // case GET_FOLLOWING_POSTS:
        //     return { ...state, following: action.payload.following };
        // case GET_SINGLE_POST:
        //     return { ...state, ...action.payload };
        default:
            return state;
    }
}
