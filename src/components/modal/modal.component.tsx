import { JSX, createEffect, createSignal } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import './modal.style.css';


export interface IModalStore {
    modalState:boolean;
    modalType:string;
    children?: JSX.Element;
    height:string;
}

export interface IModalProps {
    children?: JSX.Element;
    state:boolean;
    setModalState: SetStoreFunction<IModalStore>;
    modalType:string;
    height:string;
}

export default function Modal (props:IModalProps){

    const [hideModal, setHideModal] = createSignal(false);
     
    function Hide () {
        props.setModalState("modalState", false);
        if(props.state === false){
            setHideModal(true);
        }
    }

    createEffect(()=>{
        if(props.state){
            setHideModal(false);
        }

        if(props.modalType == "closed") {
            setHideModal(true);
        }
    })

    return (
        <div class="modal-mask" classList={{"active":props.state, "inactive": hideModal()}}>
            <div class="modal" style={{height:props.height}}>
                <div class="close" onClick={ Hide } ><i class="ri-close-fill"></i></div>
                <div class="modal-content">
                    {props.children}
                </div>
            </div>
        </div>
    );

}