import React, {useState} from 'react';
import FlipCoinUntilHead from '../Components/layouts/Geometric/FlipCoinUntilHead/FlipCoinUntilHead';
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
                <FlipCoinUntilHead />
            }
            {
                tabIndex === 1 &&
                <h2>Working progress dice geometric simulator</h2>
            }
            {
                tabIndex === 2 &&
                <h2>Working progress generic geometric simulator</h2>
            }
        </TabsContainer>
    )
}


export default geometricSimulator;