import classNames from 'classnames';
import styles from '../../../pages/recipes/Recipes.module.scss';

function Group({
    groupIcon,
    groupName,
    countRecipe,
    groupId,
    groupClickHandler,
    active,
    setActive,
    deleteGroup,
}) {
    return (
        <div
            onClick={(e) => {
                setActive(groupId);
                groupClickHandler(e, groupId);
            }}
            className={classNames(
                styles.link,
                active === groupId && styles.groupsItemActive
            )}
        >
            <div
                className={classNames(
                    styles.groupsItem,
                    groupId === '' && styles.allRecipe
                )}
            >
                <span
                    className={classNames(`${groupIcon}`, styles.groupsIcon)}
                ></span>
                <p className={classNames('small-text', styles.smallText)}>
                    {groupName}
                </p>
                <i
                    className={classNames(styles.groupsDelete, 'icon-11')}
                    title="Удалить"
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteGroup(groupId, active);
                    }}
                ></i>
                {countRecipe !== 0 && (
                    <span className={styles.groupsCount}>{countRecipe}</span>
                )}
            </div>
        </div>
    );
}

export { Group };
