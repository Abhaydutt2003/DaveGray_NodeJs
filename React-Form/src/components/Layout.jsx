import { Outlet } from "react-router-dom";

const Layout = ()=>{
    return(
        <main className="App">
            <Outlet></Outlet>
        </main>
    );
}


export default Layout;