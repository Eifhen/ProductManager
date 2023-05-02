import './management.styles.css';
import ProductTable from '../../components/table/product.table.component';
import ManagementContextProvider, { IManagementContext, useManagementContext } from './management.context';
import Modal from '../../components/modal/modal.component';
import { For, Show } from 'solid-js';
import IProduct from '../../interfaces/product.interface';



export default function ManagementPage () {
    return (
        <ManagementContextProvider>
            <PageContent/>
        </ManagementContextProvider>
    )
}

function PageContent () {
    const context = useManagementContext();
    const {modal, setModal, store} = context;

    return (
        <div class='management-page'>
            <header class="header">
                <h1>  
                    <i class="ri-settings-4-line"></i>
                    Product Management
                </h1>
                <button onClick={()=> context.openModal("add")}  class="btn-new-product">
                    <i class="ri-add-fill"></i>
                    Add new Product
                </button>
            </header>
            <div class="container">
                <div class="table-container">
                    <ProductTable classname='nogutters'>
                        <Show when={store.products} fallback={<>loading...</>}>
                            <For each={store.products} fallback={<div class="table-fallback">No data</div>}>
                                {(item)=>(
                                    <tr>
                                        <th title={item.id}>
                                            <span class='truncate'>{item.id}</span>
                                        </th>
                                        <td>
                                            <img class='table-img' src={item.img} alt="img" />
                                        </td>
                                        <td title={item.tlte}>
                                            <span class='trucante'>{item.title}</span> 
                                        </td>
                                        <td title={item.description}>
                                            <span class='truncate' >{item.description}</span>
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.stock}</td>
                                        <td class="actions">
                                            <div onClick={()=> context.openModal("update", item.id)} class="edit" >
                                                <i class="ri-edit-box-line"></i>
                                            </div>
                                            <div onClick={()=> context.openModal("delete", item.id)} class="delete">
                                                <i class="ri-delete-bin-5-line"></i>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </For>
                        </Show>
                    </ProductTable>
                </div>
                <Modal height={modal.height} setModalState={setModal} state={modal.modalState} modalType={modal.modalType}>
                    {modal.children}
                </Modal>
            </div>
        </div>
    )
}