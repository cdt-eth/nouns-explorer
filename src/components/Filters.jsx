import React from 'react';
import styled from 'styled-components';

const all = 'all';
const animal = 'animal';
const abstract = 'abstract';
const food = 'food';
const place = 'place';
const plant = 'plant';
const object = 'object';

class Filters extends React.Component {

  constructor(props) {
    super();
  }

  render() {

    const { filter, selectFilter } = this.props;
    return (
      <FiltersWrapper>
        <Explore>Explore</Explore>
        <FilterList>
          <Filter active={filter === all} onClick={() => selectFilter(all)}>&#127752;&nbsp;All</Filter>
          <Filter active={filter === object} onClick={() => selectFilter(object)}>&#127942;&nbsp;Object</Filter>
          <Filter active={filter === animal} onClick={() => selectFilter(animal)}>&#128053;&nbsp;Animal</Filter>
          <Filter active={filter === abstract} onClick={() => selectFilter(abstract)}>&#128640;&nbsp;Abstract</Filter>
          <Filter active={filter === food} onClick={() => selectFilter(food)}>&#127798;&nbsp;Food</Filter>
          <Filter active={filter === place} onClick={() => selectFilter(place)}>&#127979;&nbsp;Place</Filter>
          <Filter active={filter === plant} onClick={() => selectFilter(plant)}>&#127807;&nbsp;Plant</Filter>
        </FilterList>
      </FiltersWrapper>
    );
  }
}

const Filter = styled.div`
  margin-left: 20px;
  border: 1px solid #dfe6e9;
  padding: 5px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  background: ${props => props.active ? '#6c5ce7' : 'white' };
  color: ${props => props.active ? 'white' : '#6c5ce7' };
  &:hover {
    background: #6c5ce7;
    color: #ffffff;
  }
`;

const FiltersWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  font-weight: 900;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Explore = styled.div`
  font-size: 24px;
  margin-left: 30px;
  font-weight: 900;
  margin-right: 20px;
`;

const FilterList = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  overflow-x: auto;
`;

export default Filters;
