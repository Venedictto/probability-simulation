
import React, {useCallback} from 'react';
import styled from 'styled-components';
import {getRandomThemeColour,getRandomNumber} from '../../pages/api/utils/utils';

import {ClimbingBoxLoader, ClockLoader, DotLoader, HashLoader, PacmanLoader} from "react-spinners";

const SpinnerContainer = styled.div`
    position: absolute;
    right:0px;
    top:0px;
    width:100%;
    height:100%;
    z-index:100;
    background-color:rgba(245, 245, 245,0.3);
`;
const SpinnerWrapper = styled.div`
    position:relative;    
    top: 50vh;
    left: 40vw;
    @media (max-width: 768px) {
        left:0px;
    }
`;
const Spinner = (props) => {
    const {loading} = props;

    return (
        <>
            {
                loading &&
                <SpinnerContainer>
                    <SpinnerWrapper>
                        <PacmanLoader size={90} color={getRandomThemeColour(1)} loading={loading}/>
                    </SpinnerWrapper>
                </SpinnerContainer>
            }
        </>
        
    )
}
export default Spinner;