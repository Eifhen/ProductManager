import { JSX, createContext, useContext } from "solid-js";
import IProduct from "../interfaces/product.interface";
import { createStore } from "solid-js/store";
import { useParams } from "@solidjs/router";

interface IProductContextProps {
    children:JSX.Element;
}

interface IProductContext {
    store:IProductStore;
    cart:ICartStore;
    load:() => IProduct[];
    loadProduct: () => IProduct;
    addToCart: () => void;
    loadCartCount: () => number;
    loadCart: () => IProduct[];
    removeFromCart: (id:string) => void;
    clearCart: () => void;
}

interface IProductStore {
    products: IProduct[];
    selected: IProduct;
}

interface ICartStore {
    products: IProduct[];
    count:number;
    total:number;
}

const ProductContext = createContext({} as IProductContext);

export default function ProductContextProvider(props: IProductContextProps){

    const params = useParams();

    const [store, setStore] = createStore<IProductStore>({
        products: GetProducts(),
        selected: GetProduct(),
    })

    const [cart, setCart] = createStore<ICartStore>({
        products: GetCart(),
        count: GetCartCount(),
        total: GetCartTotalCost(),
    })

    function GetProducts(){
        const items = localStorage.getItem("products");
        if(items){
            const products = JSON.parse(items);
            return products as IProduct[];
        }
        return [];
    }

    function GetProduct(){
        const items = localStorage.getItem("products");
        if(items){
            const products = JSON.parse(items) as IProduct[];
            const find = products.find(prod => prod.id === params.id);
            if(find){
                return find;
            }
        }
        return {} as IProduct;
    }

    function LoadProducts(){
        setStore("products", ()=> GetProducts());
        return store.products;
    }

    function LoadProduct(){
       setStore("selected", ()=> GetProduct());
       return store.selected;
    }

    function AddToCart(){

        const value = store.selected.quantity + 1; 
        const quantity = value === 0 ? 1 : value;
        const stock = store.selected.stock - 1;
        const validation = (product:IProduct)=> product.id === store.selected.id;

        if(store.selected.stock > 0){
            setStore("selected", (product)=>{
                return {...product, stock, quantity  }
            })

            setStore("products", validation, (product)=>{
                return {...product, ...store.selected};
            });

            if(cart.products.some(validation) == false){
                // no hay productos repetidos
                setCart("products", (product)=> {
                    return [...product, store.selected];
                });
            }
            else {
                // hay producto repetido
                setCart("products", validation, (product)=>{
                    return {...product, stock, quantity  }
                });
            }

    
            UpdateCartLocalStorage();
            UpdateLocalStorage();
            LoadCart();
            return;
        }
        alert("Out of Stock");
    }

    function RemoveFromCart(id:string){
       
       const validation = (prod:IProduct) => prod.id === id;
       const find = cart.products.find(validation);
       
       setCart("products", validation, (prod)=>{
            const quantity = prod.quantity === 0 ? 0 : prod.quantity - 1*1;
            return {...prod, quantity};
       });
       
       if(find?.quantity === 0){
           setCart("products", (products)=>{
                const filter = products.filter(prod => prod.id !== id);
                return filter;
            })
       }

        setStore("products", validation, (product)=>{
            const stock = product.stock + 1*1;
            const quantity = product.quantity - 1*1;
            return {...product, stock, quantity};
        });

        UpdateCartLocalStorage();
        UpdateLocalStorage();
        LoadCart();
    }

    function ClearCart(){
        cart.products.forEach((prod)=>{
            for(let index = 0; prod.quantity >= index; index++){
                RemoveFromCart(prod.id);
            }
        });
    }

    function UpdateLocalStorage(){
        const products = JSON.stringify(store.products);
        localStorage.removeItem("products");
        localStorage.setItem("products", products);
    }

    function UpdateCartLocalStorage(){
        localStorage.removeItem("cart");
        const cartStore = JSON.stringify(cart.products);
        localStorage.setItem("cart", cartStore);
    }

    function GetCart(){
        const items = localStorage.getItem("cart");
        if(items){
            const cart = JSON.parse(items);
            return cart as IProduct[];
        }
        return [];
    }

    function GetCartCount(){
        const cart = GetCart();
        const count = cart.reduce((acc, prod)=>{
            return acc + prod.quantity*1;
        },0);

        return count;
    }

    function GetCartTotalCost(){
        const products = GetCart();
        const total = products.reduce((acc, product)=>{
            return acc + (product.price*product.quantity);
        },0);

        return total;
    }

    function LoadCartCount() {
        setCart("count", GetCartCount());
        return cart.count;
    }

    function LoadCartTotalCost(){
        setCart("total", GetCartTotalCost());
        return cart.total;
    }

    function LoadCart(){
        setCart("products", ()=> GetCart());
        LoadCartTotalCost();
        LoadCartCount();
        return cart.products;
    }

    const data:IProductContext = {
        cart,
        store,
        load:LoadProducts,
        loadProduct: LoadProduct,
        addToCart: AddToCart,
        loadCartCount:LoadCartCount,
        loadCart:LoadCart,
        removeFromCart: RemoveFromCart,
        clearCart: ClearCart
    } 
   
    return (
        <ProductContext.Provider value={data}>
            {props.children}
        </ProductContext.Provider>
    )
}

export function useProductContext(){
    return useContext(ProductContext);
}