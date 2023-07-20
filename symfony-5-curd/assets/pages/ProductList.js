import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import logo from '../../src/img/cart.png';

function ProductList() {
    const [productList, setProductList] = useState([])

    useEffect(() => {
        fetchProductList()
    }, [])

    const fetchProductList = () => {
        axios.get('/products')
            .then(function (response) {
                setProductList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/delete/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Product deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchProductList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    const [query, setQuery] = useState("");

    if (query == "") {
        return (
            <Layout>
                <div className="container">
                    <h2 className="text-center mt-5 mb-3">Symfony Product Manager</h2>
                    <div className="card">
                        <div className="card-header" >
                            <Link
                                className="btn btn-outline-primary"
                                to="/create">Add a New Product
                            </Link>
                        </div><input
                            type="text"
                            placeholder="Enter item to be searched"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="card-body d-flex flex-row ">

                            {productList.map((product, key) => {
                                return (
                                    <div key={key} >
                                        <div className="image">
                                            <img src={logo} alt="img" />
                                        </div>
                                        <div className="">
                                            <h3>{product.name}</h3>

                                        </div>
                                        <div className="">
                                            <h5>{product.price} $</h5>
                                        </div>

                                        <div className="">
                                            <p>Quantity left: {product.quantity}</p>
                                        </div>


                                        <Link
                                            to={`/product/${product.id}`}
                                            className="btn btn-outline-info mx-1">
                                            Show
                                        </Link>
                                        <Link
                                            className="btn btn-outline-success mx-1"
                                            to={`/edit/${product.id}`}>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="btn btn-outline-danger mx-1">
                                            Delete
                                        </button>

                                    </div>
                                )
                            })}


                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
    else {

        return (
            <Layout>
                <div className="container">
                    <h2 className="text-center mt-5 mb-3">Symfony Product Manager</h2>
                    <div className="card">
                        <div className="card-header" >
                            <Link
                                className="btn btn-outline-primary"
                                to="/create">Add a New Product
                            </Link>
                        </div><input
                            type="text"
                            placeholder="Enter item to be searched"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="card-body d-flex flex-row ">

                            {productList
                                .filter((product) => product.name.search(query) !== -1)
                                .map((product, key) => {
                                    return (
                                        <div key={key} >
                                        <div className="image">
                                        <img src={logo} alt="img" />

                                        </div>
                                        <div className="">
                                            <h3>{product.name}</h3>

                                        </div>
                                        <div className="">
                                            <h5>{product.price} $</h5>
                                        </div>

                                        <div className="">
                                            <p>Quantity left: {product.quantity}</p>
                                        </div>


                                        <Link
                                            to={`/product/${product.id}`}
                                            className="btn btn-outline-info mx-1">
                                            Show
                                        </Link>
                                        <Link
                                            className="btn btn-outline-success mx-1"
                                            to={`/edit/${product.id}`}>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="btn btn-outline-danger mx-1">
                                            Delete
                                        </button>

                                    </div>
                                    )
                                })}

                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default ProductList;