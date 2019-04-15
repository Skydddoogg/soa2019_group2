import React from 'react';
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
import './search.css';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'P8OW22R5NQ',
  '668aff46e9654cb4b523e3bc12537834'
);

const Search = props => (
  <InstantSearch
    indexName="dev_posts" 
    searchClient={searchClient}
    searchState={props.searchState}
    createURL={props.createURL}
    onSearchStateChange={props.onSearchStateChange}
  >
    <Configure hitsPerPage={16} />
    <Header />
    <div className="content-wrapper">
      <Facets />
      <CustomResults />
    </div>
  </InstantSearch>
);

const Header = () => (
  <header className="content-wrapper">
    {/* <ConnectedSearchBox /> */}
  </header>
);

const Facets = () => (
  <aside>
    <ClearRefinements
      translations={{
        reset: 'Clear all filters',
      }}
    />

    {/* <section className="facet-wrapper">
      <div className="facet-category-title facet">Show results for</div>
      <HierarchicalMenu
        attributes={[
          'level',
        ]}
      />
    </section> */}

    <section className="facet-wrapper">
      {/* <div className="facet-category-title facet">Refine By</div> */}

      <Panel header={<h5>วิชา</h5>}>
        <RefinementList attribute="subject" operator="or" limit={5} />
      </Panel>

      <Panel header={<h5>ระดับชั้น</h5>}>
        <RefinementList attribute="level" operator="or" limit={5} />
      </Panel>

      <Panel header={<h5>ราคา</h5>}>
        <RangeInput attribute="expectPrice" />
      </Panel>
    </section>

  </aside>
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

const Hit = ({ item }) => {
  // const icons = [];
  // for (let i = 0; i < 5; i++) {
  //   const suffixClassName = i >= item.expectPrice ? '--empty' : '';
  //   const suffixXlink = i >= item.expectPrice ? 'Empty' : '';

  //   icons.push(
  //     <svg
  //       key={i}
  //       className={`ais-RatingMenu-starIcon ais-RatingMenu-starIcon${suffixClassName}`}
  //       aria-hidden="true"
  //       width="24"
  //       height="24"
  //     >
  //       <use xlinkHref={`#ais-RatingMenu-star${suffixXlink}Symbol`} />
  //     </svg>
  //   );
  // }
  return (
    <article className="hit">
      <div className="product-desc-wrapper">
        <div className="product-name">
          <Highlight attribute="subject" hit={item} />
        </div>
        <div className="product-type">
          อาจารย์ <Highlight attribute="creatorUsername" hit={item} />
        </div>
        <div>
          ราคา: ${item.expectPrice}
        </div>
      </div>
    </article>
  );
};

const CustomResults = connectStateResults(({ searchState, searchResult }) => {
  if (searchResult && searchResult.nbHits === 0) {
    return (
      <div className="results-wrapper">
        <div className="no-results">
          No results found matching{' '}
          <span className="query">{searchState.query}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="results-wrapper">
        <section id="results-topbar">
          <Stats />
        </section>
        <ConnectedHits />
        <footer>
          <Pagination showLast={true} />
        </footer>
      </div>
    );
  }
});

const ConnectedSearchBox = connectSearchBox(CustomSearchBox);
const ConnectedHits = connectHits(CustomHits);

export default Search;
