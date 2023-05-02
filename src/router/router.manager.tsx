import { Outlet, Route, Router, Routes } from "@solidjs/router";
import LayoutSidebar from "../components/layout/layout.sidebar.component";
import HomePage from "../pages/home/home.page";
import ManagementPage from "../pages/management/management.page";
import ProductsPage from "../pages/products/products.page";
import CartPage from "../pages/cart/cart.page";
import ProductContextProvider from "../context/product.context";
import ProductDetailPage from "../pages/products/product.detail.page";


export default function RouterManager () {
    
    const Context = () => (
        <ProductContextProvider>
            <LayoutSidebar/>
        </ProductContextProvider>
    )

    return(
        <Router>
            <Routes>
                <Route path="" component={ Context }>
                    <Route path="/" component={ HomePage } />
                    <Route path="/home" component={ HomePage }/>
                    <Route path="/management" component={ ManagementPage }/>
                    <Route path="/cart" component={ CartPage }/>
                    <Route path="/products">
                        <Route path="/" component={ ProductsPage }/>
                        <Route path="/:id" component={ ProductDetailPage } />
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}