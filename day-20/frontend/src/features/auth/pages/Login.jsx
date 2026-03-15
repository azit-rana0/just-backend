import { Link } from 'react-router'
import '../style/form.scss'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const Login = () => {

    const { user, loading, handleLogin } = useAuth()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault()

        await handleLogin(username, password)
        console.log("use loggedIn")
        navigate("/")
    }

    if (loading) {
        return (
            <main>
                <h1>Loading......</h1>
            </main>
        )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handlesubmit}>
                    <input
                        onInput={(e) => { setUsername(e.target.value) }}
                        type="text"
                        name="username"
                        id="username"
                        placeholder='Enter username'
                    />
                    <input
                        onInput={(e) => { setPassword(e.target.value) }}
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Enter password'
                    />
                    <button className='button primary-button'>Login</button>
                </form>
                <p>Don't have an account ? <Link to={'/register'}>Create One.</Link></p>
            </div>
        </main>
    )
}

export default Login