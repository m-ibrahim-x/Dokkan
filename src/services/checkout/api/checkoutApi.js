import api from '../../../shared/api/axios';

//place order 
export const placeOrder=(payload)=>api.post('/orders',payload);
