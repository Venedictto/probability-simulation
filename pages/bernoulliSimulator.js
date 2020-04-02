import React, {useState} from 'react';
import FlipCoinLayout from '../Components/layouts/Bernoulli/FlipCoin/FlipCoinLayout';
import Tabs from '../Components/Tabs/Tabs';
import Tab from '../Components/Tabs/Tab/Tab';

import styled from 'styled-components';

const TabsContainer = styled.div`
    margin: 2rem;
    display:flex;
    flex-direction:column;
`;

const bernoulliSimulator = () => {     
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
                <FlipCoinLayout />
            }
            {
                tabIndex === 1 &&
                <h2>Working progress dice bernoulli simulator</h2>
            }
            {
                tabIndex === 2 &&
                <h2>Working progress generic bernoulli simulator</h2>
            }
        </TabsContainer>
    )
}


export default bernoulliSimulator;