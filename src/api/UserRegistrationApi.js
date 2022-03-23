import axios from 'axios'

export const RequestError = function (status, message) {
this.status = status
this.message = message
}

axios.create({
    baseUrl: 'http://localhost:5284'
})

export default {
    
    async findUsers () {
        try {
          const response = await axios.get('/users', {})
    
          return response.data
        } catch (e) {
          throw new RequestError(e.response.status, e.response.data)
        }
    },

    async addUser (query) {
        try {
            const response = await axios.post('/users', query)
            return response.data
        } catch (e) {
            throw new RequestError(e.response.status, e.response.data)
        }
    },

}