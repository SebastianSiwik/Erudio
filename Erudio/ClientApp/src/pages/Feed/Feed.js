import React, { useState } from 'react';
import FilterBar from '../../components/FilterBar/FilterBar';
import RequestMasterDetail from '../../components/RequestMasterDetail/RequestMasterDetail';
import '../../App.css';
import './Feed.css';

export const Feed = () => {
    const initialFilterState = { caption: 'All', from: '', to: '' };
    const filterState = useState(initialFilterState);
    const detailHiddenState = useState(true);
    const chosenRequestState = React.useState({});

    return (
        <div>
            <FilterBar
                filterState={filterState}
                setHidden={detailHiddenState[1]}
                setChosenRequest={chosenRequestState[1]} />
            <RequestMasterDetail
                filter={filterState[0]}
                detailHiddenState={detailHiddenState}
                chosenRequestState={chosenRequestState} />
        </div>
    );
}