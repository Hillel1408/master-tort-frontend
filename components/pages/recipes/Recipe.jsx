import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../pages/recipes/Recipes.module.scss';

function Recipe({
    recipeName,
    recipeUrl,
    setRecipeId,
    setGr,
    recipeId,
    groupId,
    deleteRecipe,
}) {
    return (
        <div className={styles.cakesItem}>
            <span className={classNames('small-text', styles.smallText)}>
                {recipeName}
            </span>
            <Link href={`/recipe/${recipeId}`}>
                <div className={styles.cakesImage}>
                    <Image src={recipeUrl} alt="" fill />
                </div>
            </Link>
            <i
                className={classNames(styles.groupsDelete, 'icon-11')}
                title="Удалить"
                onClick={(e) => {
                    setRecipeId(recipeId);
                    setGr(groupId);
                    deleteRecipe(recipeId);
                }}
            ></i>
        </div>
    );
}

export { Recipe };
