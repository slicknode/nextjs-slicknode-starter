import React from 'react'
import { withApollo } from '../lib/apollo'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'
import SignoutButton from '../components/SignoutButton';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const BLOG_POST_DETAIL = gql`query BlogPostDetail($slug: String!) {
  post: Blog_getPostBySlug(slug: $slug) {
    title
    slug
    text
    author {
      firstName
    }
    comments {
      edges {
        node {
          text
          createdAt
          author {
            firstName
          }
        }
      }
    }
  }
}`;

const PostPage = ({ loggedInUser, slug }) => {
  const {data, loading} = useQuery(BLOG_POST_DETAIL, {
    variables: {
      slug,
    },
  });

  return (
    <div>
      <div>
      Hello {loggedInUser.user.firstName} ({loggedInUser.user.email})!<br />
      <SignoutButton/>
      </div>
      <hr/>
      <div>
        {loading && 'Loading'}
        {data && data.post && (
          <div>
            <h1>{data.post.title}</h1>
            <p>
              {data.post.text}
            </p>
            <div>
              <h3>Comments</h3>
              {data.post.comments.edges.map(({node}) => (
                <div>
                  <hr/>
                  <div>
                    {node.text}
                  </div>
                  <p>
                    {node.author.firstName} {node.createdAt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

PostPage.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);

  if (!loggedInUser.user) {
    // If not signed in, send them somewhere more useful
    redirect(context, '/signin');
  }

  return {
    loggedInUser,
    slug: context.query.slug,
  };
};

export default withApollo(PostPage);
