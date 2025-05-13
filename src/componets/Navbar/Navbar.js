import { CButton } from '@coreui/react'
import SuggestionInputSearch from 'suggestion-react-input-search'
import { useNavigate, Link } from 'react-router-dom'

const Navbar = (props) => {
    const navigate = useNavigate()

    function logout() {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div className='bg-dark px-2'>
            <div className='row text-center'>
                <div className='col-lg-2 col-sm-12'>
                    <Link to="/">
                        <div className='display-6 text-danger py-1'>MBA</div>
                    </Link>
                </div>
                <div className='col-lg-8 col-sm-8 py-2'>
                    <SuggestionInputSearch
                        onSubmitFunction={props.onMovieSelect}
                        recentSearches={props.movies}
                        placeholder='Search for Movie ...'
                    />
                </div>
                <div className='col-lg-2 col-sm-4'>
                    {
                        localStorage.getItem('username') === null ? (
                            <CButton type='submit' color='danger' className='px-3' onClick={() => navigate('/login')}>
                                Login
                            </CButton>
                        ) : (
                            <CButton className="bg-danger col-lg-4 col-sm-4" onClick={logout}>
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
