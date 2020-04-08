import React, {useState} from 'react';
import styled from 'styled-components';
import Latex from 'react-latex';
import Card from '../Components/Card/Card'
import FlipCoinUntilHeadLayout from '../Components/layouts/Geometric/FlipCoinUntil/FlipCoinUntilHeadLayout';
import RollDiceUntilLayout from '../Components/layouts/Geometric/RollDiceUntil/RollDiceUntilLayout';
import GenericUntilLayout from '../Components/layouts/Geometric/GenericUntil/GenericUntilLayout';
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
const geometricSimulator = () => {     
    const [ tabIndex, setTabIndex] = useState(0);

    return (
        <Card>
            <Card>
                <SimulatorTitle>
                    Geometric
                </SimulatorTitle>
                <SimulatorSubtitle>
                    <Latex>
                        The Geometric variable models the number of tests required to obtain $1$ $success$ 
                        if a Bernoulli experiment with probability $p$ of $success$ is repeated $independently$.
                    </Latex>
                </SimulatorSubtitle>
                <SimulatorFormula>
                    <Latex>
                        {'$ G(p) = (1-p)^{x-1}p,  sup(\\N) $'}
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
        </Card>
    )
}


export default geometricSimulator;