import { JSX, createContext,  useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import IProduct from "../../interfaces/product.interface";
import { IModalStore } from "../../components/modal/modal.component";
import { Products } from '../../data/products';
import ProductForm from "../../form/form.product";
import { DeleteProductForm } from "../../form/delete.product.form";
import { useProductContext } from "../../context/product.context";

interface IContextProvider {
    children: JSX.Element;
}

export interface IManagementContext {
    store: IManagementStore;
    openModal: (operation:string, id?:string) => void;
    modal: IModalStore;
    setModal: SetStoreFunction<IModalStore>;
}

interface IManagementStore {
    selected: IProduct;
    products: IProduct[];
}

const default_product:IProduct = {
    id: "",
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    stock:0,
} 

const ManagementContext = createContext({} as IManagementContext);

export default function ManagementContextProvider (props:IContextProvider) {
    
    const productContext = useProductContext();

    const [modal, setModal] = createStore<IModalStore>({
        modalState:false,
        modalType: "add",
        height: "90%"
    })

    const [store, setStore] = createStore<IManagementStore>({
        selected: {} as IProduct,
        products: productContext.load(),
    });



    function SelectProduct(id:number|string){
        const product = store.products.find(prod => prod.id === id);
        if(product != undefined){
            setStore("selected", product);
        }
        else {
            alert("Product Undefined");
        }
    }

    function AddProduct (product:IProduct){
        setStore("products", (products:IProduct[])=>[...products, {...product}]);
        const products = JSON.stringify(store.products);
        localStorage.setItem("products", products);
        CloseModal();
    };

    function UpdateProduct (product:IProduct) {
        const validation = (prod:IProduct) => prod.id == product.id;
        setStore("products", validation, (item)=> ({...item, ...product}));
        const products = JSON.stringify(store.products);
        
        localStorage.removeItem("products");
        localStorage.setItem("products", products);
        CloseModal();
    }

    function DeleteProduct (product:IProduct) {
        
        setStore("products", (products:IProduct[])=>{
            const filter = products.filter(prod => prod.id !== product.id);
            return filter;
        });

        const products = JSON.stringify(store.products);
        localStorage.removeItem("products");
        if(store.products.length > 0){
            localStorage.setItem("products", products);
        }
        CloseModal();
    }

    function ModalManagment (operation:string, id?:string){
        console.log("operation =>", operation);

        if(operation === "add"){
            const form = 
            <ProductForm
                operationType={operation}
                data={default_product}
                title="Add new Product" 
                paragraph="Fill the form an add a new product"
                action={ AddProduct } 
                discard={ CloseModal }
            />

            setModal("children", form);
            OpenModal(operation);
            return;
        }
        
        if(operation === "update" && id != undefined){
            SelectProduct(id);
            const form = 
            <ProductForm
                operationType={operation}
                data={store.selected}
                title="Edit Product" 
                paragraph="Change the properties that you want to modify"
                action={ UpdateProduct } 
                discard={ CloseModal }
            />
            setModal("children", form);
            OpenModal(operation);
            return;
        }
    
        if(operation === "delete" && id != undefined){
            SelectProduct(id);
            const form = 
            <DeleteProductForm
                operationType={operation}
                data={store.selected}
                title="Delete Product" 
                paragraph="Are you sure you want to delete this record?"
                action={ DeleteProduct } 
                discard={ CloseModal }
            />

            setModal("children", form);
            OpenModal(operation);
            return;
        }

        alert("Error While Doin the operation : Undefined id");
        return;
    }

    function OpenModal(operation:string){
        if(operation === "delete"){
            setModal("height", "35%");
        }
        else {
            setModal("height", "90%");
        }
        setModal("modalState", true);
        setModal("modalType", operation);
    }

    function CloseModal(){
        setModal("modalState", false);
        setModal("modalType", "closed");
        setStore("selected", default_product);
    }
   
    const context:IManagementContext = {
        openModal:ModalManagment,
        modal,
        setModal,
        store,
    } 

    return (
        <ManagementContext.Provider value={context}>
            {props.children}
        </ManagementContext.Provider>
    )
}

export function useManagementContext () {
    return useContext(ManagementContext);
}