import React from 'react';
import styled from 'styled-components';

class Connect extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <ConnectWrapper>
        <Logo src="https://nouns.wtf/static/media/logo.f217962c.svg" />
        <Minted href="https://nouns.com/nounsdex" target="_blank">Already Minted Nouns</Minted>
      </ConnectWrapper>
    );
  }
}

const Logo = styled.img`
  height: 50%;
  width: auto;
`;

const Minted = styled.a`
  text-decoration: underline;
  cursor: pointer;
  margin-right: 20px;
  color: black;
`;

const ConnectWrapper = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 20px;
`;

export default Connect;
