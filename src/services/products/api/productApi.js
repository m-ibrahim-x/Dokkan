import api from '../../../shared/api/axios';

// Get all product 
export const getAllProducts=(params)=>api.get('/products' , {params});

//Search product
export const searchProduct =(params, config = {})=>api.get('/products/search', {params, ...config});

//Get single product
export const getSingleProduct =(id , config = {})=>api.get(`/products/${id}`, config);
