import React, {useState} from 'react';
import styled from 'styled-components';
import Latex from 'react-latex';
import Card from '../Components/Card/Card'
import Tabs from '../Components/Tabs/Tabs';
import Tab from '../Components/Tabs/Tab/Tab';
import FlipCoinNTimes from '../Components/layouts/Binomial/FlipCoinNTimes/FlipCoinNTimesLayout';
import RollDiceNTimes from '../Components/layouts/Binomial/RollDiceNTimes/RollDiceNTimesLayout';
import GenericNTimes from '../Components/layouts/Binomial/GenericNTimes/GenericNTimesLayout';


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
const binomialSimulator = () => {     
    const [ tabIndex, setTabIndex] = useState(0);

    return (
        <Card>
            <Card>
                <SimulatorTitle>
                    Binomial
                </SimulatorTitle>
                <SimulatorSubtitle>
                    <Latex>
                        The Binomial variable models the number of successes obtained by independently repeating a Bernoulli experiment 
                        with probability $p$ of $success$ $n$ times.
                    </Latex>
                </SimulatorSubtitle>
                <SimulatorFormula>
                    <Latex>
                        {'$ B(n,p) = \\binom{n}{x}p^x(1-p)^{n-x}, sup(0,n) $'}
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
        </Card>
    )
}


export default binomialSimulator;