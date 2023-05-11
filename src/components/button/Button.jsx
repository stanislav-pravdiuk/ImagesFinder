import css from './button.module.css';
import PropTypes from 'prop-types';

const Button = ({ children, onClick }) => (
    <button
        type="button"
        className={css.button}
        onClick={onClick}
    >
        {children}
    </button>
);

Button.propTypes = {
    Children: PropTypes.node,
    onClick: PropTypes.func.isRequired
}

export default Button;