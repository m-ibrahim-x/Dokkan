import api from '../../../shared/api/axios';

//get my order
export const myOrder=()=>api.get('orders/my');

//get single order
export const getOrderById=(id)=>api.get(`/orders/my/${id}`);

//cancel order
// export const cancelOrder=(id)=>api.get(`/orders/my/${id}`);
export const cancelOrder = (id) => api.patch(`/orders/my/${id}/cancel`);
