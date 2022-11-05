import Link from 'next/link';
import styles from './Recipes.module.scss';
import classNames from 'classnames';

function Recipe({ recipeName, recipeUrl, deleteRecipe, recipeId, groupId }) {
    return (
        <div className={styles.cakesItem}>
            <span className={classNames('small-text', styles.smallText)}>
                {recipeName}
            </span>
            <Link href="/recipe">
                <a>
                    <div className={styles.cakesImage}>
                        <img src={recipeUrl} />
                    </div>
                </a>
            </Link>
            <span
                className={styles.groupsDelete}
                title="Удалить"
                onClick={(e) => deleteRecipe(recipeId, groupId)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M12,24A12,12,0,1,1,24,12,12,12,0,0,1,12,24ZM12,1.88A10.13,10.13,0,1,0,22.15,12,10.13,10.13,0,0,0,12,1.88Z"
                        transform="translate(-0.02)"
                        fill="#010101"
                    />
                    <path
                        d="M10.33,15,12,13.3l1.7,1.7A.92.92,0,0,0,15,13.7L13.33,12,15,10.3A.85.85,0,0,0,15,9a.85.85,0,0,0-1.3,0L12,10.7,10.33,9A.85.85,0,0,0,9,9a.85.85,0,0,0,0,1.3l1.7,1.7L9,13.7A.85.85,0,0,0,9,15,.85.85,0,0,0,10.33,15Z"
                        transform="translate(-0.02)"
                        fill="#010101"
                    />
                </svg>
            </span>
        </div>
    );
}

export { Recipe };
