import classNames from 'classnames';

import { Sidebar } from '../components/Sidebar';

const MainLayout = ({ children }) => (
    <div className={classNames('wrapper', 'container')}>
        <Sidebar />
        {children}
    </div>
);

export default MainLayout;
