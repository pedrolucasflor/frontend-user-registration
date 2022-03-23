import '../styles/users/Users.css'

import UserRegistrationApi from '../api/UserRegistrationApi';

export async function Users() {
    async function loadUsers () {
        try {
            return await UserRegistrationApi.findUsers()
        } catch (e) {
            console.log(e)
            return null
        }
    }

    const users = await loadUsers()

    const items = users.map((user : any) => {
        return (
            <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.birthdate}</td>
                {/* <td>{user.cellphones}</td>
                <td>{user.adresses}</td>
                <td>{user.socialMedia}</td> */}
                <td>{user.cpf}</td>
                <td>{user.rg}</td>
            </tr>
        )
    })

    return (
        <table className="users-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Data de nascimento</th>
                    {/* <th>Telefones</th>
                    <th>Endereços</th>
                    <th>Redes sociais</th> */}
                    <th>CPF</th>
                    <th>RG</th>
                </tr>
            </thead>
            <tbody>
                {items}
            </tbody>
        </table>
    )
}
