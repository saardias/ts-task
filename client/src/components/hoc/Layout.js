import React from 'react'
import styled from 'styled-components';

export const PageLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const Layout = ({ children }) => {
    return (
        <PageLayout>
            {children}
        </PageLayout>
    )
}

export default Layout;
