import { useAppDispatch } from 'application/hooks';
import {
  selectPostIds,
  selectPosts,
  selectPostsStatus,
} from 'application/posts/postsSelectors';
import { fetchPosts } from 'application/posts/postsSlice';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PostsStatus from 'shared/status';
import PostExcerpt from 'views/components/PostExcerpt';

function Posts() {
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);
  const postIds = useSelector(selectPostIds);

  const status = useSelector(selectPostsStatus);

  useEffect(() => {
    if (postIds.length === 0) return;
    if (status === PostsStatus.initial) {
      dispatch(fetchPosts(''));
    }
  }, [dispatch, status, postIds]);

  if (status === PostsStatus.loading) {
    // TODO add loading spinner
    return <div>Loading...</div>;
  }

  if (status === PostsStatus.error) {
    return <div>Error</div>;
  }

  return (
    <section>
      <h1>Posts</h1>
      {posts?.map((post) => (
        <PostExcerpt key={post.id} {...{ post }} />
      ))}
    </section>
  );
}

export default Posts;
