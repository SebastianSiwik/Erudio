import React from 'react';
import FeedRequest from '../FeedRequest/FeedRequest';
import './FeedRequestList.css';

const FeedRequestList = (props) => {
    let filteredRequests;
    if (props.filter.caption !== 'All') {
        filteredRequests = props.requests.filter(request =>
            request.fromLanguageCode === props.filter.from
            && request.toLanguageCode === props.filter.to);
    } else {
        filteredRequests = props.requests;
    }

    return (
        <div className='request-list'>
            {filteredRequests.map(request => (
                <FeedRequest request={request}
                    key={request.requestId}
                    onClick={props.onClick}
                    highlighted={props.selectedRequestId === request.requestId} />
            ))}
        </div>
    );
}
export default FeedRequestList;