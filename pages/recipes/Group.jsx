import styles from './Recipes.module.scss';
import classNames from 'classnames';

function Group({ groupIcon, groupName, countRecipe }) {
    return (
        <a href="#" className={styles.link}>
            <div className={styles.groupsItem}>
                <span
                    className={classNames(`${groupIcon}`, styles.groupsIcon)}
                ></span>
                <p className={classNames('small-text', styles.smallText)}>
                    {groupName}
                </p>
                {countRecipe !== 0 ? (
                    <span className={styles.groupsCount}>{countRecipe}</span>
                ) : (
                    ''
                )}
            </div>
        </a>
    );
}

export { Group };
