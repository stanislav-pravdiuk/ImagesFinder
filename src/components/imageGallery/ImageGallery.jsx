import { useState, useEffect } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchPix } from "services/pixApi";
import css from './image-gallery.module.css';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import PropTypes from 'prop-types';
import ImageGalleryItem from "./imageGalleryItem";
import Loader from "../loader/Loader";

function ImageGallery({ searchQuery }) {

    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalImg, setModalImg] = useState('');
    const [alt, setAlt] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {

        if (searchQuery === '') {
            return
        };

        setStatus('pending');

        fetchPix(searchQuery, 1)
            .then(response => {

                if (response.total === 0) {
                    Notify.warning('Nothing was found for your request');
                    setStatus(null);
                    return
                }
                setResponse(response.hits);
                setStatus('resolved');
                setPage(page + 1);
                })
            .catch(error => {
                setError(error);
                setStatus('rejected')
                });

    },[searchQuery]);

    function toggleModal() {
        setShowModal(!showModal); 
    };

    function getModalImg(modalImg, alt) {
        setModalImg(modalImg);
        setAlt(alt);
    };


    function loadMore() {
        
        fetchPix(searchQuery, page)
            .then(nextResponse => {
                console.log('old', response);
                console.log('new', nextResponse.hits);
                setResponse([...response, ...nextResponse.hits]);
                setPage(page + 1);
            })
            .catch(error => {
                setError(error);
                setStatus('rejected')
                });
    };

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
                                    onGetModalImg={getModalImg}
                                    toggleModal={toggleModal}
                                    key={pix.id}
                                    pix={pix}
                                />
                                )}
                        </ul>
                
                        <div className={css.box}>       
                        <Button
                            onClick={loadMore}
                                >More
                        </Button>
                        </div>
                
                        {showModal &&
                            <Modal
                                onClose={toggleModal}>
                                    <img
                                        src={modalImg}
                                        alt={alt}
                                    />
                            </Modal>}
                    </div>
};

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired
};

export default ImageGallery;