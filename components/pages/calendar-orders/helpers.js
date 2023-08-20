import dateFormat from 'dateformat';

export const monthArr = [
    ['январь', 'января'],
    ['февраль', 'февраля'],
    ['март', 'марта'],
    ['апрель', 'апреля'],
    ['май', 'мая'],
    ['июнь', 'июня'],
    ['июль', 'июля'],
    ['август', 'августа'],
    ['сентябрь', 'сентября'],
    ['октябрь', 'октября'],
    ['ноябрь', 'ноября'],
    ['декабрь', 'декабря'],
];

const range = (count) => {
    let mas = [];

    for (let i = 1; i <= count; i++) {
        mas.push(i);
    }
    return mas;
};

const getLastDayPrewMonth = (year, month) => {
    let date = new Date(year, month, 0);

    return date.getDate();
};

const getLastDay = (year, month) => {
    let date = new Date(year, month + 1, 0);

    return date.getDate();
};

const chunk = (arr, n) => {
    let result = [];
    let count = Math.ceil(arr.length / n);

    for (let i = 0; i < count; i++) {
        let elems = arr.splice(0, n);
        result.push(elems);
    }
    return result;
};

const toUpperCase = (str) => {
    let newStr = str[0].toUpperCase() + str.slice(1);

    return newStr;
};

const normalize = (arr, left, right, year, month) => {
    const LastDayPrewMonth = getLastDayPrewMonth(year, month);

    for (let i = LastDayPrewMonth; i > LastDayPrewMonth - left; i--) {
        arr.unshift(i);
    }
    for (let i = 1; i <= right; i++) {
        arr.push(i);
    }
    return arr;
};

export const getFirstWeekDay = (year, month) => {
    let date = new Date(year, month, 1);
    let num = date.getDay();

    if (num == 0) {
        return 6;
    } else {
        return num - 1;
    }
};

export const getLastWeekDay = (year, month) => {
    let date = new Date(year, month + 1, 0);
    let num = date.getDay();

    if (num == 0) {
        return 6;
    } else {
        return num - 1;
    }
};

export const draw = (year, month, setDateNow) => {
    let arr = range(getLastDay(year, month));
    let firstWeekDay = getFirstWeekDay(year, month);
    let lastWeekDay = getLastWeekDay(year, month);

    setDateNow(toUpperCase(monthArr[month][0]) + ' ' + year);
    return chunk(normalize(arr, firstWeekDay, 6 - lastWeekDay, year, month), 7);
};

export const getNextYear = (year, month) => {
    if (month == 11) return ++year;
    else return year;
};

export const getNextMonth = (month) => {
    if (month == 11) return 0;
    else return ++month;
};

export const getPrevYear = (year, month) => {
    if (month == 0) return --year;
    else return year;
};

export const getPrevMonth = (month) => {
    if (month == 0) return 11;
    else return --month;
};

export const filterOrders = (
    orders,
    year,
    month,
    dataUser,
    setFilteredOrders
) => {
    const asd = {};
    const today = new Date();

    orders.forEach((item) => {
        const date = new Date(
            dateFormat(item.date, 'yyyy-mm-dd') +
                'T' +
                dateFormat(item.time, 'HH:MM')
        );

        if (date.getMonth() === month && date.getFullYear() === year) {
            const day = date.getDate();
            const a = (date - today) / (1000 * 3600 * 24);
            let status = '';

            if (a > 0 && a <= dataUser.rushOrder.value) status = 'urgent';
            else if (a < 0) status = 'archive';
            else status = 'ordinary';

            const obj = {
                ...item,
                isRushOrder: status,
            };

            asd[day] ? (asd[day] = [...asd[day], obj]) : (asd[day] = [obj]);
        }
    });
    setFilteredOrders(asd);
};
