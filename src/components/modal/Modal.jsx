import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from './modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

function Modal({ children, onClose }) {

        useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return removeEventListeners;
    }, []);

    function handleKeyDown(e) {
        if (e.code === 'Escape') {
            onClose();
        };
    };

    function handleBackdropClick(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    function removeEventListeners() {
        window.removeEventListener('keydown', handleKeyDown);
    }

    return (
        createPortal(
            <div 
                className={css.overlay}
                onClick={handleBackdropClick}>
    
                <div className={css.modal}>
                    {children}
                </div>
            </div>,
            modalRoot
        )
    );    
};

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

export default Modal;