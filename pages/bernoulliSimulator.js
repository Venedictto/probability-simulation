import React, {useState} from 'react';
import styled from 'styled-components';
import Latex from 'react-latex';
import Card from '../Components/Card/Card'
import FlipCoinLayout from '../Components/layouts/Bernoulli/FlipCoin/FlipCoinLayout';
import RollDiceLayout from '../Components/layouts/Bernoulli/RollDice/RollDiceLayout';
import GenericLayout from '../Components/layouts/Bernoulli/Generic/GenericLayout';
import Tabs from '../Components/Tabs/Tabs';
import Tab from '../Components/Tabs/Tab/Tab';

const TabsContainer = styled.div`
    margin: 2rem;
    display:flex;
    flex-direction:column;
`;
const SimulatorTitle = styled.div`
    color: ${props => props.theme.color.primaryColor};
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.subTitle};
    font-weight: ${props => props.theme.font.weight.bold};
`;

const SimulatorSubtitle = styled.div`
    color: ${props => props.theme.color.primaryColor};
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
    text-align:center;
    margin-bottom:0.5rem;
`;
const SimulatorFormula = styled.div`
    color: ${props => props.theme.color.primaryColor};
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const bernoulliSimulator = () => {     
    const [ tabIndex, setTabIndex] = useState(0);

    return (
        <Card>
            <Card>
                <SimulatorTitle>
                    Bernoulli
                </SimulatorTitle>
                <SimulatorSubtitle>
                    <Latex>
                        The Bernoulli variable models the result of an experiment with two possible results, 
                        value $1$ is assigned to $success$ (with probability $p$) and $0$ to $failure$ (with probability $(1-p)$).
                    </Latex>
                </SimulatorSubtitle>
                <SimulatorFormula>
                    <Latex>
                        {'$ Ber(p) = p^{x}(1-p)^{1-x},  sup(0,1) $'}
                    </Latex>
                </SimulatorFormula>
            </Card>
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
                    <RollDiceLayout />
                }
                {
                    tabIndex === 2 &&
                    <GenericLayout />
                }
            </TabsContainer>
        </Card>
    )
}


export default bernoulliSimulator;