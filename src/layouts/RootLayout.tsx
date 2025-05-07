import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout: React.FC = () => {
    return (
        <div className="bg-slate-700 min-h-screen text-white flex flex-col">
            <Navbar/>
            <div className="container mx-auto flex-grow p-4">
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};


export default RootLayout;
