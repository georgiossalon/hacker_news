import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/require-default-props
type PostLinkProps = { postId?: string; postUrl?: string };

function PostLink({ postId, postUrl }: PostLinkProps) {
  if (postId) return <Link to={`/${postId}`}>View Post</Link>;
  if (postUrl) return <a href={postUrl}>View Post</a>;
  return null;
}

export default PostLink;
