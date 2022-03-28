import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useParams
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { CreateUser } from './pages/CreateUser';
import { EditUser } from './pages/EditUser';

class AppRoutes extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        const EditUserWrapper = (props) => {
            const params = useParams();
            return <EditUser {...{...props, match: {params}} } />
        }

        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/edit-user/:id" element={<EditUserWrapper />} />
                </Routes>
            </Router>
        )
    }
}

export default AppRoutes