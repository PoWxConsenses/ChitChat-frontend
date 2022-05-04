import React from "react";
import "./custom-search-bar.style.scss";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
    };
  }
  handleChange = (event) => {
    this.setState({ searchInput: event.target.value });
  };
  render() {
    return (
      <div className="search-bar">
        <input
          className="search-input"
          type="search"
          value={this.state.searchInput}
          onChange={this.handleChange}
          placeholder="Search"
        />
      </div>
    );
  }
}

export default SearchBar;
