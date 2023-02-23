import React, { useState } from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

function UserCredential() {
    const [login, setLogin] = useState(true)
    return (
        <div>
            {login ? <SignIn login={login} setLogin={setLogin} /> : <SignUp login={login} setLogin={setLogin} />}


        </div>
    )
}

export default UserCredential