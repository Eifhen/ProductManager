import { JSX } from "solid-js";
import IProduct from "../../interfaces/product.interface";



export interface IProductTable {
    children?:JSX.Element;
    classname?:string;
}



export default function ProductTable (props:IProductTable) {
    return (
        <table class={`table ${props.classname}`}>
             <thead>
                <tr>
                    <th >#</th>
                    <th >Image</th>
                    <th >Title</th>
                    <th >Description</th>
                    <th >Price</th>
                    <th >Stock</th>
                </tr>
            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    );
}

