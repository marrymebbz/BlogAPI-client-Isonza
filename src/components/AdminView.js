import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

export default function AdminView({ postsData, fetchData }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log(postsData);

        const postsArr = postsData.map(post => {
            return (
                <tr key={post._id}>
                    <td>{post._id}</td>
                    <td>{post.title}</td>
                    <td>{post.content}</td>
                    <td>{post.author}</td>
                    <td>{post.creationdate}</td>
                </tr>
            );
        });

        setPosts(postsArr);

    }, [postsData, fetchData]);

    return (
        <>
            <h1 className="text-center mt-4 mb-2">Admin Dashboard</h1>
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center bg-info">
                        <th className="bg-info-subtle text-info-emphasis text-center">ID</th>
                        <th className="bg-info-subtle text-info-emphasis">Title</th>
                        <th className="bg-info-subtle text-info-emphasis text-center">Content</th>
                        <th className="bg-info-subtle text-info-emphasis text-center">Author</th>
                        <th className="bg-info-subtle text-info-emphasis text-center">Creation Date</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {posts}
                </tbody>
            </Table>
        </>
    );
}