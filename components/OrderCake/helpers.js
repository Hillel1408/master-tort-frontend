export const updateKanban = (
    index,
    board,
    boards,
    updateStatusOrder,
    setBoards
) => {
    const currentIndex = board.items.indexOf(item);
    let clone = JSON.parse(JSON.stringify(boards[index]));

    board.items.splice(currentIndex, 1);
    clone.items.unshift(item);
    setBoards(
        boards.map((b) => {
            if (b.id === board.id) {
                return board;
            }
            if (b.id === clone.id) {
                return clone;
            }
            return b;
        })
    );
    updateStatusOrder(clone, board);
};
