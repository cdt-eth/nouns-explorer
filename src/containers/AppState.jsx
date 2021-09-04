import React from 'react';
import styled from 'styled-components';
import CardList from './CardList';
import Connect from '../components/Connect';
import Filters from '../components/Filters';

class AppState extends React.Component {
  constructor(props) {
    super();

    this.state = {
      filter: 'object',
    };

    this.changeFilter = this.changeFilter.bind(this);
  }

  changeFilter(filter) {
    this.setState({
      filter: filter,
    });
  }

  render () {

    const { filter } = this.state;
    return (
      <AppWrapper>
        <Connect />
        <Filters filter={filter} selectFilter={(filter) => this.changeFilter(filter)} />
        <CardListWrapper>
          <CardList filter={filter} />
        </CardListWrapper>
      </AppWrapper>
    );
  }
}

const CardListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default AppState;
