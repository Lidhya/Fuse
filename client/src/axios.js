import axios from 'axios'

const instance=axios.create({
    baseURL:'http://localhost:5000/api',
    withCredentials:true
});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default instance;