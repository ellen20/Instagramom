import { like_icon, unlike_icon} from "./PostIcons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { addLike, getAllLikes, removeLike } from "../../store/like";

function PostLikes({ post, userId }) {
    const dispatch = useDispatch();
    const [heartState, setHeartState] = useState(unlike_icon);
    const likes = useSelector(state => Object.values(state?.likes))

    useEffect(() => {
        dispatch(getAllLikes());
        if (likes?.find(e => e.post_id == post.id && e.user_id == userId)) {
            setHeartState(like_icon);
        }
    }, [post, userId]);

    const postLike = async () => {
        await dispatch(addLike(post.id));
        setHeartState(like_icon);
    }

    const postUnlike = async () => {
        await dispatch(removeLike(post.id))
        setHeartState(unlike_icon);
    }

    const likeOrRemoveLike = () => {
        if (heartState === unlike_icon) {
            return postLike();
        } else if (heartState === like_icon) {
            return postUnlike();
        }
    };

    return (
        <div className="likes-post-feed">
            <div
                className="heart-icon"
                style={{ width: "30px", cursor: "pointer" }}
                onClick={(e) => likeOrRemoveLike(e, post.id, userId)}
            >
                {heartState}
            </div>
        </div>
    );
}

export default PostLikes;
