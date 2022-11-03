import styles from './Recipes.module.scss';
import classNames from 'classnames';

function Group({
    groupIcon,
    groupName,
    countRecipe,
    dataset,
    groupClickHandler,
    groupRef,
    activeClass,
}) {
    return (
        <a
            href="#"
            className={classNames(styles.link, 'groupLink', activeClass)}
            data-id={dataset}
            onClick={(e) => {
                groupClickHandler(e);
            }}
            ref={groupRef}
        >
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
