import { useState } from "react";
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from "./searchbar/Searchbar";
import css from './app.module.css';

function App() {

  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className={css.app}
      >
        <Searchbar
          onSubmit={setSearchQuery}
        />
        <ImageGallery
          searchQuery={searchQuery}
        />
    </div>
  );
};

export default App;