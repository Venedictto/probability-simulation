import React, {useCallback} from 'react';
import styled from 'styled-components';

const TabWrapper = styled.div`
    width:100%;
    max-width:100%;
`;
const TabHeaderContent = styled.ul`
  display:flex;
  flex-direction:row;
  background-color: ${props => props.theme.color.white};
  padding:unset;
  margin:unset;
`;

const Tabs = (props) => {

    const handleTabClick = useCallback((tabIndex) => {
        props.onTabIndexChange(tabIndex);
    }, [])

    // Encapsulate <Tabs/> component API as props for <Tab/> children
    const renderChildrenWithTabsApiAsProps = useCallback((activeTabIndex) => {
        return React.Children.map(props.children, (child, index) => {
            if (child !== null) {
                return React.cloneElement(child, {
                    onClick : handleTabClick,
                    tabIndex: index,
                    isActive: index === activeTabIndex
                });
            }
        });
    }, [])

    return (
        <TabWrapper>
            <TabHeaderContent >
                {renderChildrenWithTabsApiAsProps(props.activeTabIndex)}
            </TabHeaderContent>
        </TabWrapper>
    );
}
export default Tabs