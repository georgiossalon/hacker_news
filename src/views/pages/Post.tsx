import React, { useEffect } from 'react';
import {
  selectedPost,
  selectedPostStatus,
} from 'application/posts/postsSelectors';
import { useAppSelector, useAppDispatch } from 'application/hooks';
import { useParams } from 'react-router-dom';
import PostLink from 'views/components/PostLink';
import PostDate from 'views/components/PostDate';
import { fetchPostById } from 'application/posts/postsSlice';
import PostsStatus from 'shared/status';
import PostAuthor from '../components/PostAuthor';

function Post() {
  const { postId } = useParams();
  const post = useAppSelector(selectedPost);
  const postStatus = useAppSelector(selectedPostStatus);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!post && postId) {
      dispatch(fetchPostById(postId));
    }
  }, [dispatch, post, postId]);

  if (postStatus === PostsStatus.loading) {
    // TODO add loading spinner
    return <div>Loading...</div>;
  }

  if (postStatus === PostsStatus.error) {
    return <div>Error</div>;
  }

  // TODO add Loading when I fetch the post

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }
  const { title, by, time, url } = post;

  return (
    <section>
      <article>
        <h2>{title}</h2>
        <div>
          <PostAuthor {...{ by }} />
          <PostDate {...{ time }} />
        </div>
        <PostLink {...{ postUrl: url }} />
      </article>
    </section>
  );
}

export default Post;
