import { useNavigate } from '@solidjs/router';
import './product.detail.css';
import { useProductContext } from '../../context/product.context';




export default function ProductDetailPage () {

    const navegation = useNavigate();
    const context = useProductContext();
    const product = context.loadProduct();
  
    const goBack = () =>{
        navegation("/products");
    }

    const AddToCart = () => {
        context.addToCart();
    }

    return (
        <div class="product-detail-page">
            <header>
                <div class="banner">
                    <h1> 
                        <i onClick={goBack} class="ri-arrow-left-circle-line"></i>
                        Products
                    </h1>
                </div>
            </header>
            <div class="content">
                <div class="detail-card">
                    <div class='maininfo'>
                        <div class='img-container'>
                            <img src={product.img} alt="image" />
                            <div class="stock">Stock: {product.stock}</div>
                            <div class="price">Price: ${product.price}</div>
                        </div>
                        <div class="info">
                            <button onClick={AddToCart} class="btn-add-cart">
                                <i class="ri-shopping-cart-line"></i>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                    <div class='info'>
                        <h1>{product.title}</h1>
                        <p class='col-7'>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}