import { For, Show } from "solid-js";
import { useProductContext } from "../../context/product.context";
import './products.styles.css';
import IProduct from "../../interfaces/product.interface";
import { A } from "@solidjs/router";



export default function ProductsPage () {

    const context = useProductContext();
    const products = context.load();

    return (
        <div class="product-page">
            <header>
                <div class="banner">
                    <h1> 
                        <i class="ri-list-check"></i>
                        Products
                    </h1>
                </div>
            </header>
            <div class="container">

                <Show when={products} fallback={<>loading...</>}>
                    <For each={products} fallback={ <>loading...</>}>
                        {(product) =>(
                          <A href={`/products/${product.id}`} class="product-card">
                            <img src={product.img} alt="image" />
                            <div class="content">
                                <h1 class="title">{product.title}</h1>
                                <div class="info">
                                    <p>Price: ${product.price}</p>
                                    <span>Stock: {product.stock}</span>
                                </div>
                            </div>
                          </A>
                        )}
                      </For>
                </Show>

            </div>
        </div>
    );
}