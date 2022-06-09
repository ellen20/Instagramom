const GET_POSTS = "post/GET_POSTS";
const GET_SINGLE_POST = "post/GET_SINGLE_POST";
const GET_FOLLOWING_POSTS = "post/GET_FOLLOWING_POSTS";

const getFollowingPosts = (posts) => ({
    type: GET_FOLLOWING_POSTS,
    payload: posts,
});

const getMyPosts = (posts, userId) => ({
    type: GET_POSTS,
    payload: posts,
    userId,
});

const getSinglePost = (posts) => ({
    type: GET_SINGLE_POST,
    payload: posts,
});

export const createPost = (post) => async (dispatch) => {
    const { file, description } = post;

    const form = new FormData();
    form.append("file", file);
    form.append("description", description);

    const res = await fetch("/api/posts/new", {
        method: "POST",
        body: form,
    });
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
    dispatch(getFollowingPosts(data));
};

export const deletePost = (id) => async (dispatch) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    dispatch(getFollowingPosts(data));
};


export const postInfo = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/id/${postId}`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getSinglePost(data));
    }
};

export const findPosts = (userId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${userId}`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getMyPosts(data, userId));
    }
};

export const findFollowingPosts = () => async (dispatch) => {
    const res = await fetch(`/api/posts/following`);
    const data = await res.json();
    if (res.ok) {
        dispatch(getFollowingPosts(data));
    }
};


const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return { ...state, [action.userId]: action.payload };
        case GET_FOLLOWING_POSTS:
            return { ...state, following: action.payload.following };
        case GET_SINGLE_POST:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
