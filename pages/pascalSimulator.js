import React, {useState} from 'react';
import styled from 'styled-components';
import Latex from 'react-latex';
import Card from '../Components/Card/Card'
import FlipCoinUntilNSuccess from '../Components/layouts/Pascal/FlipCoinUntilNSuccess/FlipCoinUntilNSuccessLayout';
import RollDiceUntilNSuccess from '../Components/layouts/Pascal/RollDiceUntilNSuccess/RollDiceUntilNSuccessLayout';
import GenericUntilNSuccess from '../Components/layouts/Pascal/GenericUntilNSuccess/GenericUntilNSuccessLayout';
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

const pascalSimulator = () => {     
    const [ tabIndex, setTabIndex] = useState(0);

    return (
        <Card>
            <Card>
                <SimulatorTitle>
                    Pascal
                </SimulatorTitle>
                <SimulatorSubtitle>
                    <Latex>
                        The Pascal variable models the number of tests required to obtain $k$ successes 
                        if a Bernoulli experiment with probability $p$ of $success$ is repeated $independently$.
                    </Latex>
                </SimulatorSubtitle>
                <SimulatorFormula>
                    <Latex>
                        {'$ pas(k,p) = \\binom{x-1}{k-1}(1-p)^{x-k}p^ \\ sup(\\Z_k) $'}
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
        </Card>
    )
}


export default pascalSimulator;