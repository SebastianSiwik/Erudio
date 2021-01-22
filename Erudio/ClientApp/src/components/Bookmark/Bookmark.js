import React, { useState, useEffect } from 'react';
import API from '../../Api';
import star from '../../assets/star.svg';
import starEmpty from '../../assets/star_empty.svg';

const Bookmark = ({ requestId, userId }) => {
    const [bookmarked, setBookmark] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        let isActive = true;
        const getBookmarks = async () => {
            const response = await API.get(`requestBookmark/${requestId}`);
            if (isActive) {
                setBookmarks(response.data);
                const userBookmarked = bookmarks.some(bookmark => bookmark.userId === userId);
                setBookmark(userBookmarked);
            }
        }
        getBookmarks();
        return () => {
            isActive = false;
        }
    });

    const postBookmark = async () => {
        await API.post('requestBookmark', {
            'requestId': parseInt(requestId),
            'userId': userId
        });
    }

    const deleteBookmark = async () => {
        await API.delete(`requestBookmark/delete/${requestId}/${userId}`);
    }

    const handleClick = () => {
        if (bookmarked) {
            deleteBookmark();
        }
        else {
            postBookmark();
        }
        setBookmark(!bookmarked);
    }

    return (
        <img alt='bookmark' src={bookmarked ? star : starEmpty} onClick={handleClick} />
    );
}
export default Bookmark;