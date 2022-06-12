import React, { useEffect } from 'react';

import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import RightSideBar from '../components/home/RightSideBar';

import { useSelector } from 'react-redux';
import LoadIcon from '../images/loading.gif';
import { Col, Container, Row, Image } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

let scroll = 0;

const Home = () => {
  const { homePosts } = useSelector((state) => state);
  const [articles, setArticles] = useState([]);

  window.addEventListener('scroll', () => {
    if (window.location.pathname === '/') {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  const getArticlesList = async () => {
    try {
      const res = await axios.get(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=ae6fed86a98e4f46bb230f7242ad690a'
      );
      if (res.data) {
        setArticles(res.data.articles);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArticlesList();
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: 'smooth' });
    }, 100);
  }, []);

  return (
    <Container>
      <Row className=' mx-0 py-3'>
        <Col lg={3} md={2} className='sm__none'>
          {articles.map((article, index) => (
            <div key={index} className='mb-2'>
              <a href={article.url} target='_blank' rel=''>
                <Image src={article.urlToImage} className='h-24 w-56' />
                <p className='mt-2'>{article.title.substring(0, 30)}...</p>
              </a>
            </div>
          ))}
        </Col>

        <Col lg={5} md={8} sm={12} className=''>
          <Status />
          {homePosts.loading ? (
            <img src={LoadIcon} alt='loading' className='d-block mx-auto' />
          ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
            <h2 className='text-center'>No Post</h2>
          ) : (
            <Posts />
          )}
        </Col>

        <Col lg={3} md={2} sm={12}>
          <RightSideBar />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
