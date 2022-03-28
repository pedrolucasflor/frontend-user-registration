import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/users/Users.css'
import { styled } from '@stitches/react'
import Pagination from '@mui/material/Pagination';

import UserRegistrationApi from '../api/UserRegistrationApi'

const Input = styled('input', {
    all: 'unset',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: '0 10px',
    height: 35,
    fontSize: 15,
    lineHeight: 1,
    color: '#767676',
    boxShadow: `0 0 0 1px #CDCDCD`,
    '&:focus': { boxShadow: `0 0 0 2px #CDCDCD` },
});


const SearchButton = styled('button', {
    border: 0,
    marginLeft: '10px',
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: 4,
    backgroundColor: '#354d3b',
    color: '#fff'
})


export class Users extends React.Component {
    state = {
        usersPage: {
            pageNumber: 1,
            items: []
        },
        name: '',
        hoveringRowIndex: 0,
        currentPage: 0
    }

    findUsers = async (query) => {
        try {
            const response = await UserRegistrationApi.findUsers(query)
            this.setState({ usersPage: response })
        } catch (e) {
            console.log(e)
        }
    }

    formatDate (date : any) {
        let day = date.getDate().toString()
        day = day.length == 1 ? `0${day}` : day
        let month = (date.getMonth() + 1).toString()
        month = month.length == 1 ? `0${month}` : month
        const year = date.getFullYear()
    
        return `${day}/${month}/${year}`
    }

    handlePaginationChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        this.setState({ currentPage: value})
        const query = {
            page: value,
            size: 10,
            name: this.state.name
        }

        await this.findUsers(query)
    };

    filter = async () => {
        const query = {
            page: 1,
            size: 10,
            name: this.state.name
        }
        await this.findUsers(query)
    }


    componentWillMount = async () => {
        try {
            const query = {
                page: this.state.currentPage + 1,
                size: 10,
                name: this.state.name
            }

            await this.findUsers(query)
        } catch (e) {
            console.log(e)
        }
    }
    
    render () {
        const users = this.state.usersPage.items
        this.state.usersPage.items.map((user : any) => {
            const date = new Date(user.birthdate)
            user.birthdate = this.formatDate(date)
        })

        const PER_PAGE = 2;
        const offset = this.state.currentPage * PER_PAGE;
        const pageCount = Math.ceil(this.state.usersPage.totalItemCount / PER_PAGE);

        return (
            <div>
                <Input type="text" id="name" placeholder="Filtrar por nome" onChange={(e) => this.state.name = e.target.value} onKeyUp={(e) => e.key === 'Enter' && this.filter()}/>
                <SearchButton type="button" onClick={this.filter}>filtrar</SearchButton>
                <table className="users-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Data de nascimento</th>
                            <th>CPF</th>
                            <th>RG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.usersPage.items.map((user : any, index) => (
                            <tr key={index} onMouseEnter={() => this.setState({ hoveringRowIndex: index })} onMouseLeave={() => this.setState({ hoveringRowIndex: 0 })}>
                                <td>
                                    {
                                        (this.state.hoveringRowIndex == index) &&
                                            <Link className="users-table__edit-btn" to={`/edit-user/${user.id}`}>editar</Link>

                                    }
                                </td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.birthdate}</td>
                                <td>{user.cpf}</td>
                                <td>{user.rg}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination count={this.state.usersPage.pageCount} onChange={this.handlePaginationChange} />
            </div>
        )
    }
}
