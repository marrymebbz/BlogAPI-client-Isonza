import { useState, useEffect } from 'react';
import { PostList } from './PostCard';

export default function UserView({ postsData }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Check if postsData is an array before filtering
    if (Array.isArray(postsData)) {
      const activePosts = postsData.filter(post => post.isActive);
      setPosts(activePosts);
    } else {
      console.error("Expected postsData to be an array, but got:", postsData);
      setPosts([]); // Optionally, set to an empty array if postsData is invalid
    }
  }, [postsData]);

  return (
    <>
      <PostList posts={posts} />
    </>
  );
}
