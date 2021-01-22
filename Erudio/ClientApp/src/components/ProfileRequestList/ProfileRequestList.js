import React from 'react';
import { useHistory } from 'react-router-dom';
import Request from '../FeedRequest/FeedRequest';
import './ProfileRequestList.css';

const RequestList = ({ requests }) => {

    const history = useHistory();

    const sortByDate = (a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
    }

    const handleClick = (request) => {
        const path = `/post/${request.requestId}`;
        history.replace(path);
    }

    return (
        <div className='activity-list'>
            {requests?.sort(sortByDate)
                .map(request => (
                    <Request request={request}
                        onClick={handleClick}
                        key={request.requestId} />
                ))}
        </div>
    );
}
export default RequestList;