import { memo } from 'react';
import { Oval } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import styles from './loaderComponent.module.css';

function LoaderComponent() {
  return (
    <div className={styles.overlay}>
      <Oval
        color="#3f51b5"
        height={120}
        width={120}
        ariaLabel="loading-indicator"
      />
    </div>
  );
}

export default memo(LoaderComponent);
