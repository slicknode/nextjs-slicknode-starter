import { useRef } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import cookie from 'cookie'
import redirect from '../lib/redirect'

const CREATE_USER = gql`
  mutation CreateUser($input: createUserInput!, $loginInput: loginEmailPasswordInput!) {
  createUser(input: $input) {
    node {
      id
    }
  }
  loginEmailPassword(input: $loginInput) {
    accessToken
    accessTokenLifetime
    refreshToken
    refreshTokenLifetime
  }
}
`

const RegisterBox = () => {
  const client = useApolloClient()

  const onCompleted = data => {
    // Store the token in cookie
    document.cookie = cookie.serialize('token', data.loginEmailPassword.accessToken, {
      maxAge: data.loginEmailPassword.accessTokenLifetime,
      path: '/' // make cookie available for all routes underneath "/"
    })
    // Force a reload of all the current queries now that the user is
    // logged in
    client.cache.reset().then(() => {
      redirect({}, '/')
    })
  }
  const onError = error => {
    // If you want to send error to external service?
    console.error(error)
  }
  const [create, { loading, error }] = useMutation(CREATE_USER, { onCompleted, onError })

  const name = useRef(null)
  const email = useRef(null)
  const password = useRef(null)

  console.log(error);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        create({
          variables: {
            input: {
              firstName: name.current.value,
              email: email.current.value,
              password: password.current.value
            },
            loginInput: {
              email: email.current.value,
              password: password.current.value
            },
          }
        });

        name.current.value = email.current.value = password.current.value = ''
      }}
    >
      {error && <p>Issue occurred while registering :( {error.graphQLErrors.length && (error.graphQLErrors[0].message)}</p>}
      <input name='name' placeholder='Name' ref={name} />
      <br />
      <input name='email' placeholder='Email' ref={email} />
      <br />
      <input
        name='password'
        placeholder='Password'
        ref={password}
        type='password'
      />
      <br />
      <button>Register</button>
    </form>
  )
}

export default RegisterBox
