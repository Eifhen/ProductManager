
import { A } from '@solidjs/router';
import './home.page.styles.css';

export default function HomePage() {
    return (
        <div class='home-page'>
            <header class="header">
                <h1>Welcome to our Home Page!</h1>
                <p>I made this project as a practice for <span>SolidJS</span></p>
                <p>
                    The idea of this project is to mimic the 
                    behavior of a basic shopping application
                </p>
            </header>
            <div class="info">
                <div class="container row">
                    <A href="/cart" class="option">
                        <div class="header">
                            <i class="ri-shopping-cart-line"></i>
                            Cart
                        </div>
                        <div class="info">
                            <p>
                                In this section you will find all 
                                the products that you have selected
                            </p>
                        </div>
                    </A>

                    <A href="/products" class="option">
                        <div class="header">
                            <i class="ri-list-check"></i>
                            Products
                        </div>
                        <div class="info">
                            <p>
                                In this section you will be able to
                                view all the products listed, you can also see the detail 
                                of the product, an add it
                                to the cart. 
                            </p>
                        </div>
                    </A>

                    <A href="/management" class="option">
                        <div class="header">
                            <i class="ri-settings-4-line"></i>
                            Management
                        </div>
                        <div class="info">
                            <p>
                                In this section you will be able to
                                remove products from the list, add new products to
                                the list, and edit any product of the list.
                            </p>
                        </div>
                    </A>
                </div>
            </div>
        </div>
    )
}
