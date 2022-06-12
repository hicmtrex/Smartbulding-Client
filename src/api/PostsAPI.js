import { useState, useEffect } from 'react';
import myAxios from '../utils/axios';

function PostsAPI() {
  const [posts, setPosts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const getPosts = async () => {
      const res = await myAxios.get(
        `/api/posts?limit=${
          page * 9
        }&${category}&${sort}&title[regex]=${search}`
      );
      setPosts(res.data.posts);
      setResult(res.data.result);
    };
    getPosts();
  }, [callback, category, sort, search, page]);

  return {
    posts: [posts, setPosts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
}

export default PostsAPI;
