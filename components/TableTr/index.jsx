import stylesTable from '../Table/Table.module.scss';
import { useState } from 'react';
import { settingsNameTh } from '../../data/settings';
import { TableTd } from '../TableTd';

function TableTr({ settings, setSettings }) {
    return (
        <div
            className={stylesTable.tr}
            style={{
                gridTemplateColumns: '2fr 1fr',
            }}
        >
            {Object.keys(settings).map((keyObj) => (
                <>
                    <TableTd
                        key={Math.random()}
                        value={keyObj}
                        disabled={true}
                        thValue={keyObj}
                    />
                    <TableTd
                        key={Math.random()}
                        value={String(settings[keyObj])}
                        thValue={keyObj}
                        disabled={false}
                        setSettings={setSettings}
                        settings={settings}
                        type="number"
                    />
                </>
            ))}
        </div>
    );
}

export { TableTr };
