import { CButton } from '@coreui/react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

const Navbar = (props) => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')

    const handleChange = (e) => {
        const value = e.target.value
        setSearchText(value)
        props.onSearchChange(value)
    }

    function logout() {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className='bg-black py-3 shadow-sm'>
            <div className='container-fluid d-flex flex-wrap justify-content-between align-items-center'>
                <Link to="/" className="text-decoration-none">
                    <h2 className='text-danger fw-bold m-0 px-3'>🎬 MBA Movies</h2>
                </Link>
                <div className='flex-grow-1 px-3 py-2'>
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleChange}
                        className="form-control rounded-pill shadow-sm"
                        placeholder="Search for a movie..."
                        style={{ paddingLeft: "1.5rem", fontSize: "1rem" }}
                    />
                </div>
                <div className='px-3'>
                    {
                        localStorage.getItem('username') === null ? (
                            <CButton color='danger' className='rounded-pill px-4' onClick={() => navigate('/login')}>
                                Login
                            </CButton>
                        ) : (
                            <CButton color='danger' className='rounded-pill px-4' onClick={logout}>
                                Logout
                            </CButton>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
