import React from 'react';
import styled from 'styled-components';

import axios from 'axios';

const BODY = 1;
const ACCESSORY = 2;
const GLASSES = 4;

const base = 'https://us-central1-nounsdao.cloudfunctions.net/generateNounUsingOptionsAndSourceAndBG';
const params = {
  options: {
    source: "src-main",
    layers: {
      "layer-0": "random",
      "layer-1": "random",
      "layer-2": "random",
      "layer-3": "",
      "layer-4": "random",
    }
  }
};

const CardWrapper = styled.div`
  border-radius: 10px;
  border: 3px solid #9c88ff;
  border-style: dotted;
  cursor: pointer;
  padding: 15px;
  padding-top: 40px;
  margin: 10px;
  background: white;

  @media (min-width: 200px) {
    width: 70%;
  }

  @media (min-width: 400px) {
    width: 35%;
  }

  @media (min-width: 700px) {
    width: 25%;
  }

  @media (min-width: 1050px) {
    width: 15%;
  }
`;

const CardImgWrapper = styled.div`
  background: white;
  height: auto;
  width: 100%;
`;

const defaultUri = 'https://nouns.wtf/static/media/loading-skull-noun.d7293d44.gif';

class Card extends React.Component {

  constructor(props) {
    super();
    this.state = {
      uri: 'https://nouns.wtf/static/media/loading-skull-noun.d7293d44.gif',
      loading: true,
    };
  }

  componentDidMount() {

    const { fileId } = this.props.file;
    this.fetchCards(fileId);
  }

  fetchCards(fileId) {
    const params = {
      options: {
        source: "src-main",
        layers: {
          "layer-0": "random",
          "layer-1": "random",
          "layer-2": "random",
          "layer-3": fileId,
          "layer-4": "random",
        }
      }
    };

    axios.get(base, { params }).then((response) => {

      const layers = response.data.layers;
      const body_ = layers[BODY].split("-").slice(1).slice(-1).join(" ");
      const accessory_ = layers[ACCESSORY].split("-").slice(1).join(" ");
      const glass_ = layers[GLASSES].split("-").slice(2).join(" ");

      this.setState({
        uri: response.data.base64,
        body: body_,
        accessory: accessory_,
        glass: glass_,
        loading: false,
      });
    });
  }

  componentDidUpdate(prevProps) {

    if (this.props.file.fileId !== prevProps.file.fileId) {

      const { fileId } = this.props.file;
      this.setState({
        loading: true
      });
      this.fetchCards(fileId);
    }
  }

  render() {

    let { loading, uri } = this.state;
    const { body, glass, accessory } = this.state;
    const { fileId, name } = this.props.file;
    // params.options.layers['layer-3'] = fileId;

    return (
      <CardWrapper>
        <CardImgWrapper>
          <CardImg src={loading ? defaultUri : uri} />
        </CardImgWrapper>
        <CardInfo>
          <CardName>{name}</CardName>
          {
            loading
            ? <div></div>
            : <CardDetails>
                <div>Glasses: {glass}</div>
                <div>Accessory: {accessory}</div>
              </CardDetails>
          }
        </CardInfo>
      </CardWrapper>
    );
  }
}

const CardImg = styled.img`
  width: 100%;
  height: auto;
  image-rendering: pixelated;
  border-radius: 5px;
  background: #d1d8e0;
`;

const CardInfo = styled.div`
  height: 60px;
  padding: 10px 5px;
  display: flex;
  font-weight: bold;
  font-size: 14px;
  flex-direction: column;
  align-items: flex-start;
`;

const CardName = styled.div`
  font-size: 17px;
  margin-top: -5px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

const CardDetails = styled.div`
  font-size: 12px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-weight: 300;
  height: 30px;
  text-align: left;
`;

export default Card;
