import { useEffect } from 'react';
import styles from '../../../pages/Home.module.scss';

function Canvas({ canvasRef, canvas }) {
    useEffect(() => {
        canvas();
    }, []);
    return (
        <canvas
            ref={canvasRef}
            className={styles.cakeCanvas}
            height="434"
        ></canvas>
    );
}

export { Canvas };
