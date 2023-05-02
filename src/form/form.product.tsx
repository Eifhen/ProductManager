import { For, Show, createSignal } from "solid-js";
import IForm from "../interfaces/form.product.interface";
import IProduct from "../interfaces/product.interface";
import './form.styles.css';
import { createStore } from "solid-js/store";
import { Images } from "../data/images";
import { nanoid } from "nanoid";


interface IFormStore {
    item:IProduct;
}

const default_product:IProduct = {
    id: "",
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    img:"",
    stock:0,
}

export default function ProductForm(props:IForm<IProduct>){
    
    const images = Images;
    const data = props.data ? props.data : {} as IProduct;
    const img = data.img ? data.img : '';
    const [status, setStatus] = createSignal<string>("");
    const [product, setProduct]= createStore<IFormStore>({item:data});
    const [selectedImage, setSelectedImage] = createSignal<string>(img);

    const HandleInputs = (event:any) => {
        const { value, id } = event.target;
        setProduct("item", id, value);
    }

    const Action = () => {
        if(props.operationType === "add"){
            setProduct("item","id", nanoid());
        }
        
        if(selectedImage() != ''){
            setProduct("item","img", selectedImage());
        }
        
        if(FormValidation()){
            props.action(product.item);
            setProduct("item", default_product);
        }
    }

    const Discard = () => {
        props.discard();
        setProduct("item", default_product);
    }

    function FormValidation(){

        const item = product.item;

        for(let key in item){
            if(key != "quantity"){
                if(item[key] === null || item[key] === 0 || item[key] === ''){
                    setStatus("Please fill the form before continue");
                    return false;
                }
            }
        }
        setStatus('completed');
        return true;
    }

    function SelectImage(image:string){
        setSelectedImage(image);
    }

    return (
        <div class="form">
            <div class="form-header">
                <h1>{props.title}</h1>
                <p>{props.paragraph}</p>
            </div>
            <div class="form-content">
                <div class="img-selector">
                    <Show when={images} fallback={<>loading...</>}>
                        <For each={images}>
                            {(image:string)=>(
                                <img 
                                    classList={{"active":selectedImage() === image}}
                                    onClick={()=> SelectImage(image)} 
                                    src={image} 
                                    alt="image" 
                                />
                            )}
                        </For>
                        <div class="img-selector-title">
                            <h1>Choose an image for your product</h1>
                        </div>
                    </Show>
                </div>
                <div class="fields">
                    <fieldset>
                        <label html-for="title">Name</label>
                        <input id="title" type="text" onInput={HandleInputs} value={product.item.title}/>
                    </fieldset>
                    <fieldset>
                        <label html-for="description">Description</label>
                        <textarea rows="2" maxlength="100" id="description"onInput={HandleInputs} value={product.item.description} />
                    </fieldset>
                    <fieldset>
                        <label html-for="price">Price</label>
                        <input id="price" type="number" onInput={HandleInputs} value={product.item.price} />
                    </fieldset>
                    <fieldset>
                        <label html-for="stock">Stock</label>
                        <input id="stock" type="number" onInput={HandleInputs} value={product.item.stock} />
                    </fieldset>
                    <fieldset>
                        <span class="text-wine">{status()}</span>
                    </fieldset>
                </div>
            </div>
            <div class="form-footer">
                <button onClick={Discard}>
                    Discard
                </button>
                <button class="bg-dark text-white border-0" onClick={Action}>
                    Save
                </button>
            </div>
        </div>
    );
}