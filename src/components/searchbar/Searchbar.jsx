import React, { Component } from "react";
import css from './searchbar.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

class Searchbar extends Component{
    state = {
        searchQuery: '',
    };

    handleSearchQueryChange = event => {
        this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
    } 

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.searchQuery.trim() === '') {
            Notify.failure('WTF???');
            return;
        };

        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form onSubmit={this.handleSubmit} className={css.searchForm}>
                    <button type="submit" className={css.searchForm__button}>
                        <span className={css.searchForm__buttonLabel}>Search</span>
                    </button>

                    <input
                        className={css.searchForm__input}
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        value={this.state.searchQuery}
                        onChange={this.handleSearchQueryChange}
                        />
                </form>
            </header>
        )
    }
};

Searchbar.propTypes = {
    onsubmit: PropTypes.func
};

export default Searchbar;

