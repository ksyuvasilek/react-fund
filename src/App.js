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
import { usePosts } from './hooks/usePosts.jsx';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  // async function fetchPosts() {
  //   const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  //   console.log(response.data)
  // }

  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      {/* <button onClick={fetchPosts}>GET POSTS</button> */}
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
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS'/>
    </div>
  );
}

export default App;
