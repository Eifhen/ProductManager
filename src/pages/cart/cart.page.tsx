import { For, Show } from 'solid-js';
import { useProductContext } from '../../context/product.context';
import './cart.style.css';


export default function CartPage () {
    const context = useProductContext();
    context.loadCart();

    const RemoveProduct = (id:string) => {
        context.removeFromCart(id);
    }

    const ClearCart = () => {
        context.clearCart();
    }

    return (
    <div class="cart-page">
        <header>
            <div class="banner">
                <h1> 
                    <i class="ri-shopping-cart-line"></i>
                    Cart
                </h1>
            </div>
        </header>
        <div class="container">
            <div class="cart-card">
                <div class="title">
                    <h1>Your Cart</h1>
                </div>
                <div class="list">
                    <Show when={context.cart.products} fallback={<>loading...</>}>
                        <For each={context.cart.products}>
                            {(product)=>(
                                <div class="cart-item">
                                    <div class="content">
                                         <div class="remove" onClick={()=>RemoveProduct(product.id)} >
                                            <i class="ri-close-circle-line"></i>
                                         </div>
                                         <img src={product.img} alt="image" />
                                         <h1>{product.title}</h1>  |
                                         <span>Price: ${product.price}</span> |
                                         <span>x{product.quantity}</span>
                                    </div>
                                </div>
                            )}
                        </For>
                    </Show>
                </div>
                <div class="footer">
                    <span class='total'>
                        Total: ${context.cart.total}
                    </span>
                    <button onClick={ClearCart}>
                        <i class="ri-shopping-cart-line"></i>
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}