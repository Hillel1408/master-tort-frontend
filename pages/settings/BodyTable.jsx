import { TableCell } from './TableCell';
import stylesTable from '../../components/Table/Table.module.scss';

function BodyTable({ settings, setSettings, index }) {
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
                        key={Math.random()}
                        disabled={true}
                        thValue={keyObj}
                    />
                    <TableCell
                        key={Math.random()}
                        value={settings[keyObj][index]}
                        thValue={keyObj}
                        disabled={false}
                        setSettings={setSettings}
                        settings={settings}
                        type="number"
                        index={index}
                    />
                </>
            ))}
        </div>
    );
}

export { BodyTable };
