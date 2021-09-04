import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Card from '../components/Card';
import InfiniteScroll from 'react-infinite-scroll-component';

import abstract_json from '../data/abstract';
import animal_json from '../data/animal';
import food_json from '../data/food';
import object_json from '../data/object';
import place_json from '../data/place';
import plant_json from '../data/plant';

const base = 'https://us-central1-nounsdao.cloudfunctions.net/generateNounUsingOptionsAndSourceAndBG';

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const abstract = shuffle(abstract_json);
const animal = shuffle(animal_json);
const food = shuffle(food_json);
const object = shuffle(object_json);
const place = shuffle(place_json);
const plant = shuffle(plant_json);
let all = [];
all = all.concat(abstract, animal, food, object, place, plant);

class CardList extends React.Component {
  constructor(props) {
    super();

    this.state = {
      cards: [],
      hasMore: true,
      pointer: 10,
    }

    this.fetchCards = this.fetchCards.bind(this);
  }

  componentDidMount() {
    const { filter } = this.props;
    this.getCards(filter, 10, true)
  }

  componentDidUpdate(prevProps) {

    if (this.props.filter !== prevProps.filter) {

      const { filter } = this.props;
      const { pointer } = this.state;
      this.setState({
        pointer: 10,
      })
      this.getCards(filter, 10, true)
    }
  }

  updateCards(pointer, filterArray, renderNew) {

    let hasMore = false;
    if (pointer < filterArray.length) {
      hasMore = true;
    }

    if (renderNew) {

      this.setState({
        cards: filterArray.slice(0, pointer),
        hasMore: hasMore
      });
    }
    else {

      let { cards } = this.state;

      console.log(`array length ${filterArray.length} ${pointer}`);
      if ((pointer + 10) < filterArray.length) {
        hasMore = true;
      }

      this.setState({
        cards: [].concat(cards, filterArray.slice(pointer, pointer + 10)),
        pointer: pointer + 10,
        hasMore: hasMore
      })
      console.log(`${pointer} pointer`);
    }

  }

  getCards(filter, pointer, renderNew) {

    switch(filter) {
      case 'abstract': {
        this.updateCards(pointer, abstract, renderNew);
        break;
      }
      case 'animal': {
        this.updateCards(pointer, animal, renderNew);
        break;
      }
      case 'food': {
        this.updateCards(pointer, food, renderNew);
        break;
      }
      case 'object': {
        this.updateCards(pointer, object, renderNew);
        break;
      }
      case 'place': {
        this.updateCards(pointer, place, renderNew);
        break;
      }
      case 'plant': {
        this.updateCards(pointer, plant, renderNew);
        break;
      }
      default: {
        this.updateCards(pointer, all, renderNew);
        break;
      }
    }
  }

  fetchCards() {
    const { filter } = this.props;
    const { pointer } = this.state;
    console.log(`Call fetch cards`);
    this.getCards(filter, pointer, false)
  }

  render() {

    const { filter } = this.props;
    const { cards } = this.state;
    const { hasMore, pointer } = this.state;

    console.log(hasMore);
    // const cards = this.getCards(filter);

    return (
      <Wrapper>
        <IScroll
          dataLength={cards.length}
          next={this.fetchCards}
          hasMore={hasMore}>
            { cards.map((card, index) => <Card key={index} file={card} />)}
        </IScroll>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-diretion: row;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 20px;
`;

const IScroll = styled(InfiniteScroll)`
  display: flex;
  flex-diretion: column;
  flex-wrap: wrap;
  width: 100%;
`;

export default CardList;
