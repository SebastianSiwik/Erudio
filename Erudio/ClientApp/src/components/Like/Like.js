import React, { useState, useEffect } from 'react';
import API from '../../Api';
import like from '../../assets/like.svg';
import likeEmpty from '../../assets/like_empty.svg';
import './Like.css';

const Like = ({ translationId, userId }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        let isActive = true;
        const getLikes = async () => {
            const response = await API.get(`translationLike/${translationId}`);
            if (isActive) {
                setLikes(response.data);
                const userLiked = likes.some(like => like.userId === userId);
                setLiked(userLiked);
            }
        }
        getLikes();
        return () => {
            isActive = false;
        }
    });

    const postLike = async () => {
        await API.post('translationLike', {
            'translationId': translationId,
            'userId': userId
        });
    }

    const deleteLike = async () => {
        await API.delete(`translationLike/delete/${translationId}/${userId}`);
    }

    const handleClick = () => {
        if (liked) {
            deleteLike();
        }
        else {
            postLike();
        }
        setLiked(!liked);
    }

    return (
        <div className='count-container'>
            <span className='count'>{likes.length ? likes.length : ''}</span>
            <img alt='like' src={liked ? like : likeEmpty} onClick={handleClick} />
        </div>
    );
}
export default Like;