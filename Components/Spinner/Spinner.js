
import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import {getRandomLoaderType, getRandomThemeColour} from '../../pages/api/utils/utils';

const CenterLoader = styled(Loader)`
    display:flex !important;
    justify-content:center !important;
`;

const Spinner = (props) => {
    const {loading} = props;
    return (
        <>
            {
            loading &&
                <CenterLoader
                    // @ts-ignore
                    type={getRandomLoaderType()}
                    color={getRandomThemeColour(1)}
                    height={250}
                    width={250}
                    timeout={10000}/>
            }
        </>
    )
}
export default Spinner;