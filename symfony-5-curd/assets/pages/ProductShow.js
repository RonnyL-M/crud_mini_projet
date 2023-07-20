import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import axios from 'axios';
import { async } from 'regenerator-runtime';

function ProductShow() {
    const [id, setId] = useState(useParams().id)
    const [product, setProduct] = useState([])
    const [data, setDate] = useState([]);
    // const getData = async () => {
    //     const data = await axios.get(`/product/${id}`).then(function (response) {
    //         setProduct(response.data);
    //         console.log(response.data);
    //         console.log(product)        
    //     });


    // };
    useEffect(() => {
        // getData();
        axios.get(`/product/${id}`)
        .then(res => {
            console.log("Geting from ::::",res.data)
            setProduct(res.data);
        })
        .catch(err =>console.log(err))
        

        // Axios.get(`/product/${id}`)
        // .then(function (response) {
        //     setProduct(response.data)
        //     console.log(response.data)
        // })
        // .catch(function (error) {
        //   console.log(error);
        // })
    }, [])


    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Product</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/"> View All Products
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name: {product.name}</b>
                        <p></p>
                        <b className="text-muted">Price: {product.price}</b>
                        <p></p>
                        <b className="text-muted">Quantity: {product.quantity}</b>
                        <p></p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductShow;