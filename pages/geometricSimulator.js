import React, {useState} from 'react';
import FlipCoinUntilHeadLayout from '../Components/layouts/Geometric/FlipCoinUntil/FlipCoinUntilHeadLayout';
import RollDiceUntilLayout from '../Components/layouts/Geometric/RollDiceUntil/RollDiceUntilLayout';
import GenericUntilLayout from '../Components/layouts/Geometric/GenericUntil/GenericUntilLayout';
import Tabs from '../Components/Tabs/Tabs';
import Tab from '../Components/Tabs/Tab/Tab';

import styled from 'styled-components';

const TabsContainer = styled.div`
    margin: 2rem;
    display:flex;
    flex-direction:column;
`;

const geometricSimulator = () => {     
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
                <FlipCoinUntilHeadLayout />
            }
            {
                tabIndex === 1 &&
                <RollDiceUntilLayout/>
            }
            {
                tabIndex === 2 &&
                <GenericUntilLayout />
            }
        </TabsContainer>
    )
}


export default geometricSimulator;