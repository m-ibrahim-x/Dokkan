import api from '../../../shared/api/axios'

export const updateUserProfile =(payload ,id)=>api.patch(`/users/${id}`,payload);
