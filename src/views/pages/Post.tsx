import React from 'react';
import { useParams } from 'react-router-dom';
import PostLink from 'views/components/PostLink';
import PostDate from 'views/components/PostDate';
import { usePost } from 'application/react-query-hooks';
import PostAuthor from '../components/PostAuthor';

function Post() {
  const { postId } = useParams();
  const { data: post, isLoading, isError, isSuccess } = usePost(postId ?? '');
  if (isLoading) <div>Loading...</div>;

  if (isError) <div>Error...</div>;

  if (!isSuccess) return null;

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
