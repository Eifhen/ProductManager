
import { A } from '@solidjs/router';
import './sidebar.style.css';
import { useProductContext } from '../../context/product.context';
import { Show } from 'solid-js';


export default function Sidebar() {
    const context = useProductContext();
    context.loadCartCount();
   
    return (
        <div class="sidebar">
            <header>
                <A class='brand' href="./home">
                    <i class="ri-home-5-line"></i>
                    Home
                </A>
            </header>
            <div class='navegation'>
                <A class='item' activeClass='active' href="/cart">
                    <i class="ri-shopping-cart-line"></i>
                    <Show when={context.cart.count > 0} fallback={<>Cart</>}>
                        Cart ({context.cart.count})
                    </Show>
                </A>
                
                <A class="item" href="/products">
                    <i class="ri-list-check"></i>
                    Products
                </A>
                <A class="item" href="/management">
                    <i class="ri-settings-4-line"></i>
                    Management
                </A>
            </div>
        </div>
    )
}