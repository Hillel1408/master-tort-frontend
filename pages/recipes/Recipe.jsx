import Link from 'next/link';
import styles from './Recipes.module.scss';
import classNames from 'classnames';

function Recipe({ recipeName, recipeUrl }) {
    return (
        <Link href="/recipe">
            <a className={styles.link}>
                <div className={styles.cakesItem}>
                    <span
                        className={classNames('small-text', styles.smallText)}
                    >
                        {recipeName}
                    </span>
                    <div className={styles.cakesImage}>
                        <img src={recipeUrl} />
                    </div>
                </div>
            </a>
        </Link>
    );
}

export { Recipe };
