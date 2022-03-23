import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { CreateUser } from './pages/CreateUser';

export function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/create-user" element={<CreateUser />} />
            </Routes>
        </Router>
    )
}