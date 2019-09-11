import gql from 'graphql-tag'

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query getUser {
          viewer {
            user {
              id
              firstName
              lastName
              email
            }
          }
        }
      `
    })
    .then(({ data }) => {
      return { loggedInUser: data.viewer }
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} }
    })
