import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import classes from './SideBar.module.css';

const SideBar = () => {

    const header = 'DUMMY HEADER';
    const content = 'SOME DUMMY CONTENT';
    const footer = 'SOME DUMMY FOOTER YP';

    return (
        <ProSidebar className={classes.sidenav}>
            <SidebarHeader>
                {header}
            </SidebarHeader>
            <SidebarContent>
                {content}
            </SidebarContent>
            <SidebarFooter>
                {footer}
            </SidebarFooter>
        </ProSidebar>
    );
};

export default SideBar;
