import { TableCell } from '../../TableCell';
import stylesTable from '../../Table/Table.module.scss';

function BodyTable({ settings, index }) {
    return (
        <div
            className={stylesTable.tr}
            style={{
                gridTemplateColumns: '2fr 1fr',
            }}
        >
            {Object.keys(settings).map((keyObj) => (
                <>
                    <TableCell key={keyObj} disabled={true} thValue={keyObj} />
                    <TableCell
                        key={keyObj + index}
                        value={settings[keyObj][index]}
                        thValue={keyObj}
                        disabled={false}
                        type="number"
                        index={index}
                        saveSettings={(item, thValue, index) => {
                            settings[thValue][index] = item;
                        }}
                    />
                </>
            ))}
        </div>
    );
}

export { BodyTable };
