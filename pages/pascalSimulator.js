import React, {useState} from 'react';
import Tabs from '../Components/Tabs/Tabs';
import Tab from '../Components/Tabs/Tab/Tab';
import FlipCoinUntilNSuccess from '../Components/layouts/Pascal/FlipCoinUntilNSuccess/FlipCoinUntilNSuccessLayout';
import RollDiceUntilNSuccess from '../Components/layouts/Pascal/RollDiceUntilNSuccess/RollDiceUntilNSuccessLayout';
import GenericUntilNSuccess from '../Components/layouts/Pascal/GenericUntilNSuccess/GenericUntilNSuccessLayout';

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
                <FlipCoinUntilNSuccess />
            }
            {
                tabIndex === 1 &&
                <RollDiceUntilNSuccess />
            }
            {
                tabIndex === 2 &&
                <GenericUntilNSuccess />
            }
        </TabsContainer>
    )
}


export default pascalSimulator;