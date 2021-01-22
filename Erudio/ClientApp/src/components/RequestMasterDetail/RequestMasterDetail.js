import React, { useState, useEffect } from 'react';
import API from '../../Api';
import FeedRequestList from '../FeedRequestList/FeedRequestList';
import DetailedRequest from '../DetailedRequest/DetailedRequest';
import './RequestMasterDetail.css';

const RequestMasterDetail = ({ filter, detailHiddenState, chosenRequestState }) => {
    const [chosenRequest, setChosenRequest] = chosenRequestState;
    const [detailHidden, setHidden] = detailHiddenState;
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getRequests = async () => {
            const response = await API.get('request');
            if (isActive) {
                setRequests(response.data.sort(sortByDate));
            }
        }

        let isActive = true;
        getRequests();

        return () => {
            isActive = false;
        }
    }, [requests]);

    const sortByDate = (a, b) => {
        if (a.date > b.date) return -1;
        if (a.date < b.date) return 1;
        return 0;
    }

    const handleClick = (request) => {
        setChosenRequest(request);
        setHidden(false);
    };

    if (Object.keys(chosenRequest).length === 0 &&
        chosenRequest.constructor === Object) {
        setHidden(true);
    }

    return (
        <div className='page'>
            <FeedRequestList requests={requests} selectedRequestId={chosenRequest.requestId} onClick={handleClick} filter={filter} />
            <DetailedRequest hidden={detailHidden} request={chosenRequest} />
        </div>
    );
}
export default RequestMasterDetail;