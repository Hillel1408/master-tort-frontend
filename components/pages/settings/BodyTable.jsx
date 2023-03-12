import { TableCell } from '../../TableCell';
import stylesTable from '../../Table/Table.module.scss';

function BodyTable({ settings, index, setSettings }) {
    return (
        <div
            className={stylesTable.tr}
            style={{
                gridTemplateColumns: '2fr 1fr',
            }}
        >
            {Object.keys(settings).map((keyObj) => (
                <>
                    <TableCell
                        key={keyObj}
                        disabled={true}
                        thValue={
                            keyObj === 'weightOfCoveredCake' && index === '1'
                                ? ''
                                : keyObj
                        }
                    />
                    <TableCell
                        key={keyObj + index}
                        value={settings[keyObj][index]}
                        thValue={keyObj}
                        disabled={
                            keyObj === 'weightOfCoveredCake' && index === '1'
                                ? true
                                : false
                        }
                        type="number"
                        index={index}
                        purchase={
                            keyObj === 'weightOfCoveredCake' && index === '1'
                        }
                        saveSettings={(item, thValue, index) => {
                            settings[thValue][index] = item;
                            setSettings({ ...settings });
                        }}
                    />
                </>
            ))}
        </div>
    );
}

export { BodyTable };
