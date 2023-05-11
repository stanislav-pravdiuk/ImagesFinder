import { useState } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './searchbar.module.css';
import PropTypes from 'prop-types';

function Searchbar({ onSubmit }) {

    const [searchQuery, setSearchQuery] = useState('');

    function handleSearchQueryChange(e) {
        setSearchQuery(e.currentTarget.value.toLowerCase());
    }; 

    function handleSubmit(e) {
        e.preventDefault();

        if (searchQuery.trim() === '') {
            Notify.failure('WTF???');
            return;
        };

        onSubmit(searchQuery);
        setSearchQuery('');
    };

    return (
        <header className={css.searchbar}>
            <form onSubmit={handleSubmit} className={css.searchForm}>
                <button type="submit" className={css.searchForm__button}>
                    <span className={css.searchForm__buttonLabel}>Search</span>
                </button>

                <input
                    className={css.searchForm__input}
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                />
            </form>
        </header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func
};

export default Searchbar;

