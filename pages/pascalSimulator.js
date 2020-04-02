import React, {useState} from 'react';
import Tabs from '../Components/Tabs/Tabs';
import Tab from '../Components/Tabs/Tab/Tab';

import styled from 'styled-components';

const TabsContainer = styled.div`
    margin: 2rem;
    display:flex;
    flex-direction:column;
`;

const pascalSimulator = () => {     
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
                <h2>Working progress coin pascal simulator</h2>
            }
            {
                tabIndex === 1 &&
                <h2>Working progress dice pascal simulator</h2>
            }
            {
                tabIndex === 2 &&
                <h2>Working progress generic pascal simulator</h2>
            }
        </TabsContainer>
    )
}


export default pascalSimulator;