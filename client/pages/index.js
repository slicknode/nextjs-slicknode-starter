import React from 'react'
import { withApollo } from '../lib/apollo'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import SignoutButton from '../components/SignoutButton';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const BLOG_POST_LIST = gql`query MyQuery {
  posts: Blog_listPost {
    totalCount
    edges {
      node {
        title
        slug
        text
        author {
          firstName
        }
      }
    }
  }
}`;

const IndexPage = ({ loggedInUser }) => {
  const {data, loading} = useQuery(BLOG_POST_LIST);

  return (
    <div>
      <div>
      Hello {loggedInUser.user.firstName} ({loggedInUser.user.email})!<br />
      <SignoutButton/>
      </div>
      <hr/>
      <div>
        {loading && 'Loading'}
        {data && data.posts.totalCount} Posts
        {data && data.posts && (
          data.posts.edges.map(({node}) => (
            <div>
              <h2>{node.title}</h2>
              <p>{node.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
};

IndexPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient)

  if (!loggedInUser.user) {
    // If not signed in, send them somewhere more useful
    redirect(context, '/signin');
  }

  return { loggedInUser };
};

export default withApollo(IndexPage);
