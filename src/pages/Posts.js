// import { useState, useEffect, useContext, useCallback } from 'react';
// import { Container, Button, Modal } from 'react-bootstrap';
// import { AuthContext } from '../context/AuthContext';
// import { PostList } from '../components/PostCard';
// import AdminView from '../components/AdminView';
// import AddPost from '../components/AddPost';

// export default function Posts() {
//   const { user, setUser } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]); 
//   const [showAddPostModal, setShowAddPostModal] = useState(false); // State to control modal visibility
//   const [loading, setLoading] = useState(true);

//   // Fetch user data
//   const fetchUserData = useCallback(async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const res = await fetch('https://blogapi-isonza.onrender.com/users/details', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (data.user) setUser(data.user);
//       else console.error('User data not found:', data);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   }, [setUser]);

//   // Fetch mpost data
//   const fetchPosts = useCallback(async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const res = await fetch('https://blogapi-isonza.onrender.com/posts/getBlogs', {
//         headers: { Authorization: token ? `Bearer ${token}` : '' },
//       });
//       const data = await res.json();
//       if (Array.isArray(data.posts)) {
//         setPosts(data.posts);
//       } else {
//         console.error('Unexpected response format:', data);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       setPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   useEffect(() => {
//     fetchPosts();
//   }, [fetchPosts]);

//   // Add a new post to the state
//   const addNewPost = (newPost) => {
//     setPosts((prevPosts) => [newPost, ...prevPosts]);
//   };

//   return (
//     <Container className="mb-5">
//       {user?.isAdmin ? (
//         <>
//           {/* Admin View */}
//           <AdminView postsData={posts} fetchData={fetchPosts} />
//           <Button
//             variant="danger"
//             onClick={() => setShowAddPostModal(true)}
//             className="mb-3 d-flex px-4 py-2 fw-bold mx-auto"
//           >
//             Add Post
//           </Button>
//         </>
//       ) : (
//         // User View
//         // <UserView postsData={posts} />
//         <PostList posts={posts} />
//       )}

//       {/* Modal for AddPost component */}
//       <Modal show={showAddPostModal} onHide={() => setShowAddPostModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Post</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <AddPost closeModal={() => setShowAddPostModal(false)} addPost={addNewPost} />
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// }

import { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { PostList } from '../components/PostCard';
import AdminView from '../components/AdminView';
import AddPost from '../components/AddPost';

export default function Posts() {
  const { user, setUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found in localStorage');
      return;
    }

    try {
      const res = await fetch('https://blogapi-isonza.onrender.com/users/details', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error(`User fetch failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      } else {
        console.error('User data not found:', data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data. Please try again.');
    }
  }, [setUser]);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token provided. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://blogapi-isonza.onrender.com/posts/getBlogs', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.auth || 'Failed to fetch posts');
      }

      const data = await res.json();
      if (Array.isArray(data.blogs)) {
        setPosts(data.blogs);
      } else {
        console.error('Unexpected response format:', data);
        setError('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error.message || 'Failed to fetch posts.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <Container className="mb-5">
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : user?.isAdmin ? (
        <>
          <AdminView postsData={posts} fetchData={fetchPosts} />
          <Button
            variant="danger"
            onClick={() => setShowAddPostModal(true)}
            className="mb-3 d-flex px-4 py-2 fw-bold mx-auto"
          >
            Add Post
          </Button>
        </>
      ) : (
        <PostList posts={posts} />
      )}

      <Modal show={showAddPostModal} onHide={() => setShowAddPostModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPost closeModal={() => setShowAddPostModal(false)} addPost={addNewPost} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
