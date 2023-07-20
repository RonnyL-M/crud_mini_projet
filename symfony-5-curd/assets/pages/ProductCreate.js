import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
  
function ProductCreate() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('')
    const [isSaving, setIsSaving] = useState(false)
  
    const handleSave = () => {
        setIsSaving(true);
        let formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        formData.append("quantity", quantity)
        axios.post('/create', formData)
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Product saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setName('')
            setPrice('')
            setQuantity('')
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
          });
    }
  
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Create New Product</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-info float-right"
                            to="/">View All Product
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    onChange={(event)=>{setName(event.target.value)}}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    value={price}
                                    onChange={(event)=>{setPrice(event.target.value)}}
                                    className="form-control"
                                    type="number"
                                    id="price"                              
                                    name="price"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input 
                                    onChange={(event)=>{setQuantity(event.target.value)}}
                                    value={quantity}
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"/>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Save Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ProductCreate;