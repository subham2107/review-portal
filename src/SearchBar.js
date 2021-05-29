import React from 'react';
import './NavBar.css'

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value:''
        };
    }

onInput = event => {
    if(event.target.value){
    fetch(`/api/movies/search/${event.target.value}`)
    
            .then((response) => response.json())
            .then(response => {this.props.searchMovieResult(response)});
    }
    else {
        this.props.searchMovieResult([])
        }
    }

    render(){
    return (
    <div class="SearchBar">
        <input
              className="SearchInput"
              type="text"
              placeholder="Search for tv series..."
              name="search"
              onInput={this.onInput} 
              value={this.state.search}
        />
      <div className="SearchIconWrapper"><img className="SearchIcon" src='/images/search-24px.svg' alt='searchIcon'/></div>
    
      </div>
      );
  }

}
 export default SearchBar;