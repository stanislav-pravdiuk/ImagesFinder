import css from './button.module.css';
import PropTypes from 'prop-types';

function Button({ children, onClick }) {
    return (
        <button
            type="button"
            className={css.button}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    Children: PropTypes.node,
    onClick: PropTypes.func.isRequired
}

export default Button;