import React, { Component } from "react";
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from "./searchbar/Searchbar";
import css from './app.module.css';

class App extends Component {
  state = {
    searchQuery: '',
  };
  
  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery })
  };

  render() {
    return (
    <div className={css.app}
      >
        <Searchbar
          onSubmit={this.handleFormSubmit}
        />
        <ImageGallery
          searchQuery={this.state.searchQuery}
        />
    </div>
  );
  }
}

export default App;