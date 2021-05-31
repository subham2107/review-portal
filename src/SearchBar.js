import React from 'react';
import './SearchBar.css'
import './NavBar.css'

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value:'',
            search:''
        };
    }

onInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.value.length==0)
    {
        window.location.reload();
    }
}

searchIconClick = () => {
    console.log(this.state.search);
    
    if(this.state.search){
    fetch(`/api/movies/search/${this.state.search}`)
    
            .then((response) => response.json())
            .then(response => {this.props.searchMovieResult(response)});
    }
    else {
        this.props.searchMovieResult([]);
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
      <div className="SearchIconWrapper"><img onClick={this.searchIconClick} className="SearchIcon" src='/images/search-24px.svg' alt='searchIcon'/></div>
    
      </div>
      );
  }

}
 export default SearchBar;