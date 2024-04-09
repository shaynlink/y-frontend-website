function Post({post}) {
  return (
    <div className="post">
      <div className="post-header">
        <img src={post.user.avatar} alt="avatar" />
        <h3>{post.user.name}</h3>
        <p>{post.user.handle}</p>
      </div>
      <p>{post.content}</p>
      <span>{new Date(post.timestamp).toLocaleString()}</span>
    </div>
  );
}
export default Post;