import React, { Component } from "react";
import css from './image-gallery.module.css';
import ImageGalleryItem from "./imageGalleryItem";
import Loader from "../loader/Loader";
import { fetchPix } from "services/pixApi";
import Button from '../button/Button';
import Modal from '../modal/Modal';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
    state = {
        response: '',
        error: null,
        status: null,
        showModal: false,
        modalImg: '',
        alt: '',
        page: 1,
    }

    componentDidUpdate(prevProps, prevState) {
        const prevSearchQuery = prevProps.searchQuery;
        const nextSearchQuery = this.props.searchQuery;

        if (prevSearchQuery !== nextSearchQuery) {
            
            this.setState({ status: 'pending' });
            
            fetchPix(nextSearchQuery, 1)
                .then(response => this.setState(prevState => {
                    return {
                        response: response.hits,
                        status: 'resolved',
                        page: prevState.page +1, 
                    }
                }))
                .catch(error => this.setState({ error, status: 'rejected' }));
        };
    };

    toggleModal = () => {
        this.setState(state => ({
            showModal: !state.showModal,
        })); 
    };

    getModalImg = (modalImg, alt) => {
        this.setState({
            modalImg,
            alt,
        })
    };

    loadMore = () => {
            fetchPix(this.props.searchQuery, this.state.page)
            .then(nextResponse => this.setState(prevState => {
                return {
                    response: [...prevState.response, ...nextResponse.hits],
                    page: prevState.page + 1,
                }
            })  
            )
            .catch(error => this.setState({ error, status: 'rejected' }));
    };

    render() {
        const { response, error, status } = this.state;

        if (status === 'pending') {
            return  <div className={css.box}>
                        <Loader />
                    </div>
        };

        if (status === 'rejected') {
            return <h1>{error.message}</h1>
        };

        if (status === 'resolved')
            return <div>
                        <ul className={css.imageGallery}>
                            {response.map(pix =>
                                <ImageGalleryItem
                                    onGetModalImg={this.getModalImg}
                                    toggleModal={this.toggleModal}
                                    key={pix.id}
                                    pix={pix}
                                />
                                )}
                        </ul>
                
                        <div className={css.box}>       
                        <Button
                            onClick={this.loadMore}
                                >More
                        </Button>
                        </div>
                
                        {this.state.showModal &&
                            <Modal
                                onClose={this.toggleModal}>
                                    <img
                                        src={this.state.modalImg}
                                        alt={this.state.alt}
                                    />
                            </Modal>}
                    </div>
                
        
        };
};

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired
};

export default ImageGallery;