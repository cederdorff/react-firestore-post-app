import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import { postsRef, usersRef } from "../firebase-config";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";

export default function PostCard({ post }) {
    const navigate = useNavigate();
    const auth = getAuth();

    /**
     * handleClick is called when user clicks on the Article (PostCard)
     */
    function handleClick() {
        navigate(`/posts/${post.id}`);
    }

    async function handleAddToFav() {
        const currentUserDocRef = doc(usersRef, auth.currentUser.uid); // reference to current authenticated user doc
        const postRef = doc(postsRef, post.id); // reference to the post you want to add to favorites
        await updateDoc(currentUserDocRef, {
            favorites: arrayUnion(postRef) // updating current user's favorites field in firebase by adding a doc ref to the post
        }); // docs about update elemennts in an array: https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array
    }

    return (
        <article>
            <div onClick={handleClick}>
                <UserAvatar uid={post.uid} />
                <img src={post.image} alt={post.title} />
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
            <button onClick={handleAddToFav}>Add to favorites</button>
        </article>
    );
}
