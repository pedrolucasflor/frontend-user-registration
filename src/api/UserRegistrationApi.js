import axios from 'axios'

export const RequestError = function (status, message) {
this.status = status
this.message = message
}

export default {
    
    async findUsers (query) {
        try {
          const response = await axios.get('/api/users', {
            params: {
                page: query.page,
                size: query.size,
                name: query.name
            }
          })

          return response.data
        } catch (e) {
            console.log(e)
        }
    },

    async findUser (id) {
        try {
          const response = await axios.get(`/api/users/${id}`)
    
          return response.data
        } catch (e) {
            console.log(e)
        }
    },

    async addUser (query) {
        try {
            const response = await axios.post('api/users', query)
            return response.data
        } catch (e) {
                console.log(e)
        }
    },

    async updateUser (id, query) {
        try {
            const response = await axios.put(`/api/users/${id}`, query)
            return response.data
        } catch (e) {
                console.log(e)
        }
    },

}