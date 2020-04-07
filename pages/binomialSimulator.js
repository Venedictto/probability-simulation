import React, {useState} from 'react';
import Tabs from '../Components/Tabs/Tabs';
import Tab from '../Components/Tabs/Tab/Tab';
import FlipCoinNTimes from '../Components/layouts/Binomial/FlipCoinNTimes/FlipCoinNTimesLayout';
import RollDiceNTimes from '../Components/layouts/Binomial/RollDiceNTimes/RollDiceNTimesLayout';
import GenericNTimes from '../Components/layouts/Binomial/GenericNTimes/GenericNTimesLayout';

import styled from 'styled-components';

const TabsContainer = styled.div`
    margin: 2rem;
    display:flex;
    flex-direction:column;
`;

const binomialSimulator = () => {     
    const [ tabIndex, setTabIndex] = useState(0);

    return (
        <TabsContainer>
            <Tabs
                activeTabIndex={tabIndex}
                onTabIndexChange={(index) => setTabIndex(index)}>
                <Tab title='Coin'/>
                <Tab title='Dice'/>
                <Tab title='Generic'/>
            </Tabs>
            {
                tabIndex === 0 &&
                <FlipCoinNTimes />
            }
            {
                tabIndex === 1 &&
                <RollDiceNTimes />
            }
            {
                tabIndex === 2 &&
                <GenericNTimes />
            }
        </TabsContainer>
    )
}


export default binomialSimulator;