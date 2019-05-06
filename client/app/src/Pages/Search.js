import React, { Component } from 'react';
import {
  InstantSearch,
  HierarchicalMenu,
  RefinementList,
  SortBy,
  Stats,
  Pagination,
  ClearRefinements,
  RatingMenu,
  RangeInput,
  Highlight,
  Panel,
  Configure,
  connectSearchBox,
  connectHits,
  connectStateResults,
} from 'react-instantsearch-dom';
import '../search.css';
import algoliasearch from 'algoliasearch/lite';
import styled from 'styled-components'
import Wrapper from '../Components/Wrapper'
import bg_pattern from '../Assets/images/home_bg_pattern.svg'
import { createOffer } from '../Actions/offerAction'
const searchClient = algoliasearch(
  'P8OW22R5NQ',
  '668aff46e9654cb4b523e3bc12537834'
);

const SearchPage = styled.div`
`
const SearchWrapper = styled.div`
display:flex;
padding:1%;
align-items:flex-start;
  align-content:flex-start;
`



class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      postObj: {}
    }

  }
  render() {
    return (
      <SearchPage>
        <InstantSearch
          indexName="dev_posts"
          searchClient={searchClient}
          searchState={this.props.searchState}
          createURL={this.props.createURL}
          onSearchStateChange={this.props.onSearchStateChange}
        >
          <Wrapper>
            <Configure hitsPerPage={16} />
            <div className="content-wrapper">
              <SearchWrapper >
                <Facets />
                <CustomResults />
              </SearchWrapper>
            </div>
          </Wrapper>
        </InstantSearch>
      </SearchPage>
    )
  }
}

const Header = () => (
  <header className="content-wrapper">
    <ConnectedSearchBox />
  </header>
);


const FacetsWrapper = styled.div`
width:30%;
padding:2%;
background-color:#fff;
border:1px solid #E8EEF2;
display:flex;
flex-direction:column;
border-radius:10px;

  & button{
    color:#fff;
  }

  & ul{
    padding:0;
    margin:0;
    list-style:none;
  }

  & h5{
    padding:0;
    margin:0;
    font-family:prompt;
    font-size:1.2em;
    margin-bottom:4%;
    color:#008FF6;
  }

  & .ais-Panel{
    margin-bottom:20px;
  }

  & li{
    margin-bottom:3%;
  }
  & .ais-RefinementList-label > span{
    font-family:prompt;
    color: #7A90A8;
    margin-left:5px;
  }
  & .ais-RefinementList-label > input{
    border-radius:3000px;
    
  }

  & .ais-RangeInput-input{
    border:1px solid #E8EEF2;
    padding:10px;
    width:100%;
  }

  & .ais-RangeInput-form{
    width:100%;
    text-align:center;
  }

  & .ais-RangeInput-form >span{
    float:left;
    width:100%;
    margin-top:2%;
    margin-bottom:2%;
    color: #7A90A8;
  }
  & .ais-RangeInput-input::placeholder{
    color:#c2c6ca;
  }

  

  & .ais-RangeInput-submit{
    width:100%;
    height:45px;
color:#fff;
font-size:1.1em;
padding:0 20px 0 20px;
background-color:#008FF6;
font-family:'Prompt', sans-serif;
border-radius:3px;
border:none;
margin:auto;
margin-top:20px;
cursor:pointer;
transition:all .2s ease;
&:hover{
  color:#fff;
    background-color:#006dbf; 

  }

`

const Facets = () => (
  <FacetsWrapper className="animated bounceInUp">
    <Panel header={<h5>วิชา</h5>}>
      <RefinementList attribute="subject" operator="or"  limit={5} />
    </Panel>

    <Panel header={<h5>ระดับชั้น</h5>}>
      <RefinementList attribute="level" operator="or" limit={5} />
    </Panel>

    <Panel header={<h5>ราคา</h5>}>
      <RangeInput attribute="expectPrice" />
    </Panel>

  </FacetsWrapper>
);

const CustomSearchBox = ({ currentRefinement, refine }) => (
  <div className="input-group">
    <input
      type="text"
      value={currentRefinement}
      onChange={e => refine(e.target.value)}
      autoComplete="off"
      className="form-control"
      id="q"
    />
    <span className="input-group-btn">
      <button className="btn btn-default">
        <i className="fa fa-search" />
      </button>
    </span>
  </div>
);

function CustomHits({ hits }) {
  return (
    <main id="hits">
      {hits.map(hit => (
        <Hit item={hit} key={hit.objectID} />
      ))}
    </main>
  );
}

const handleSendOffer = (item) => {
}



const Hit = ({ item }) => {
  return (
    <article name="asdsd" className="hit animated bounceInUp" name={item.objectID} onClick={() => handleSendOffer(item)}>

      <div className="product-desc-wrapper">
        <div className="product-name">
          <Highlight attribute="subject" hit={item} />
        </div>
        <div className="product-type">
          อาจารย์ <Highlight attribute="creatorUsername" hit={item} />
        </div>
        <div className="price">
          <h6>{item.expectPrice.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h6> <span>บาท</span>
        </div>
      </div>
    </article>
  );
};


const CustomResultsWrapper = styled.div`
width:100%;
padding:1%;
align-self:stretch;
  & .product-name{
  }
  & .ais-Highlight{
    color:#008FF6;
  }
  & .price{
    position: absolute;
    right: 15px;
    bottom: 15px;
    text-align:right;
  }
  & .price > h6{
    color:#008FF6;
    font-size:1.8em;
    padding:0;
    margin:0;
  }
  & .price > span{
    font-family:prompt;
    font-size:1.1em;
    font-weight:bold;
  }
`
const CustomResults = connectStateResults(({ searchState, searchResult }) => {
  if (searchResult && searchResult.nbHits === 0) {
    return (

      <CustomResultsWrapper>

        <div className="no-results">
          No results found matching{' '}
          <span className="query">{searchState.query}</span>
        </div>
      </CustomResultsWrapper>


    );
  } else {
    return (
      <CustomResultsWrapper>
        <section id="results-topbar">
          <Stats />
        </section>
        <ConnectedHits />
        {/* <footer>
          <Pagination showLast={true} />
        </footer> */}
      </CustomResultsWrapper>

    );
  }
});

const ConnectedSearchBox = connectSearchBox(CustomSearchBox);
const ConnectedHits = connectHits(CustomHits);

export default Search;
