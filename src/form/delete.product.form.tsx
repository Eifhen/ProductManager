import { createSignal } from "solid-js";
import IForm from "../interfaces/form.product.interface";
import IProduct from "../interfaces/product.interface";
import './delete.product.form.css';



export function DeleteProductForm (props:IForm<IProduct>){
    const [status, setStatus] = createSignal("");

    const Action = () => {
        if(props.data !== undefined){
            props.action(props.data); 
        }
        else {
            setStatus("Error while deleting the entry");
        }
    }

    const Discard = () => {
        props.discard();
    }

    return (
        <div class="form-delete">
            <div class="form-header">
                <h1>{props.title}</h1>
                <p>{props.paragraph}</p>
                <p class="text-wine">{status()}</p>
            </div>
            <div class="form-footer">
                <button onClick={Discard}>
                    Discard
                </button>
                <button class="bg-wine text-white border-0" onClick={Action}>
                    Save
                </button>
            </div>
        </div>
    );
}