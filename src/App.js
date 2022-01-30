import React, {useState} from 'react';
import ClassCounter from './components/ClassCounter.jsx';
import Counter from './components/Counter.jsx'
import '../src/styles/App.css'
import PostItem from './components/PostItem.jsx';
import PostList from './components/PostList.jsx';
import MyButton from './components/UI/button/MyButton.jsx';
import MyInput from './components/UI/input/MyInput.jsx';
import { useMemo, useRef } from 'react/cjs/react.development';
import PostForm from './components/PostForm.jsx';
import MySelect from './components/UI/select/MySelect.jsx';
import PostFilter from './components/PostFilter.jsx';
import MyModal from './components/UI/MyModal/MyModal.jsx';
import { usePosts } from './hooks/usePosts.js';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';
import PostService from './API/PostService.js';
import Loader from './components/UI/Loader/Loader.jsx';
import { useFetching } from './hooks/useFetching.js';
import { getPageCount, getPagesArray } from './utils/pages.js';
import Pagination from './components/UI/pagination/Pagination.jsx';

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = (response.headers['x-total-count'])
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts(limit, page)
  }, []);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
    fetchPosts(limit, page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px' }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin: '15px 0'}}/>
      <PostFilter 
        filter={filter} 
        setFilter={setFilter}
      />
      {postError &&
        <h1>Произошла ошибка ${postError}</h1>
      }
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
      }
      <Pagination 
        page={page} 
        changePage={changePage} 
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;
