// import { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ onLoadMore, text }) => {
  return (
    <button onClick={onLoadMore} className={styles.button} type="button">
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
