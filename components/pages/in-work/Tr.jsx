import classNames from 'classnames';
import Link from 'next/link';
import { Checkbox } from '../../CustomCheckbox';
import styles from '../../../pages/purchase/Purchase.module.scss';

function Tr({ cake, rings }) {
    return (
        <div className={styles.workGridItem}>
            <Checkbox />
            <div>
                <p
                    className={classNames('small-text', styles.work)}
                    style={{
                        marginBottom: '5px',
                    }}
                >
                    {cake}
                </p>
                <p
                    className={classNames(
                        'small-text',
                        styles.work,
                        styles.workFlex
                    )}
                >
                    {rings.map((item) => (
                        <span>{item}</span>
                    ))}
                </p>
                <Link href="/recipe">
                    <span
                        className={classNames(
                            'icon-28',
                            'small-text',
                            styles.workLink
                        )}
                    >
                        Смотреть рецепт
                    </span>
                </Link>
            </div>
        </div>
    );
}

export { Tr };
