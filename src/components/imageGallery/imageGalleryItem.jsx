import css from './image-gallery.module.css';
import PropTypes from 'prop-types';

function ImageGalleryItem({ pix, toggleModal, onGetModalImg }) {

    function onClick() {
        onGetModalImg(pix.largeImageURL, pix.tags);
        toggleModal();
    };

    return (
        <li
            className={css.imageGallery__item}>
            <img
                onClick={onClick}    
                className={css.imageGalleryItem__image}
                src={pix.webformatURL}
                alt={pix.tags}
            />
        </li>
    )
};

ImageGalleryItem.propTypes = {
    pix: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onGetModalImg: PropTypes.func.isRequired
};

export default ImageGalleryItem;