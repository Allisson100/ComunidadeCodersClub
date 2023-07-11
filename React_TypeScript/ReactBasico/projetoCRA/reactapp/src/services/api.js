import Axios from "axios"

export default Axios.create({
    baseURL: 'http://api.github.com/users/'
})