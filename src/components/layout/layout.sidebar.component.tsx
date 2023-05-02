import { Outlet } from "@solidjs/router";
import Sidebar from "../sidebar/sidebar.component";
import './layout.sidebar.styles.css';


export default function LayoutSidebar(){
    return (
        <div class='layout-sidebar'>
            <Sidebar/>
            <main class="mainContent">
                <Outlet/>
            </main>
            <footer class='footer'>
                <p>Gabriel Jiménez</p>
                <small>01 | 05 | 2023</small>
            </footer>
        </div>
    )
}