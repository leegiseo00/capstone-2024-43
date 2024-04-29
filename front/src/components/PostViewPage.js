import React from 'react';
import { useEffect,useState } from 'react';
import { useLocation,useParams } from 'react-router-dom';
import parse from 'html-react-parser'; // HTML 문자열을 React 구성 요소로 변환

function PostViewPage() {
  const location = useLocation();
  const {postID} = location.state; 
  const[data,setData]=useState({});
  //postID로 글 찾아오기~
  useEffect(()=>{
    fetch(`http://localhost:8080/api/post/${postID}`)
    .then(res=>res.json())
    .then(json=>{
      console.log(json[0]);
      setData(json[0]);
    })
    .catch(error=>console.log(error))
  },[])
  //const { title, editorData } = location.state; // PostPage에서 전달된 데이터 가져오기
  return (
    <>
    <div>
      {data.body}
      {/* <h1>{title}</h1>
      <div>{parse(editorData)}</div> HTML 문자열을 React 구성 요소로 변환 */}
    </div>
    </>
  );
}

export default PostViewPage;

/*import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // 설치되어 있어야 함.
import { EditorState, convertFromRaw } from 'draft-js'; // 설치되어 있어야 함.
import { Editor } from 'react-draft-wysiwyg'; // 설치되어 있어야 함.
import '../css/PostViewPage.css'; 
import draftToHtml from 'draftjs-to-html'

function PostViewPage() {
  const { postId } = useParams(); // useParams()을 사용해 URL 파라미터에서 postId 추출
  const { state } = useLocation(); // useLocation()을 사용해 현재 URL의 상태 정보를 가져옴
  const [data,setData]=useState({});//post 정보

  // 상태 정보에서 제목, 내용, 책 정보 추출함. (없을 경우 빈 객체 사용.)
  const { title, content, bookTitle, author, publisher } = state || {};
  useEffect(()=>{console.log(data)},[data])
  //postId로 글 찾아오기~
  useEffect(()=>{
    const fetchPostData= async()=>{
      try{
        const res = await axios.get(`http://localhost:8080/api/post/${postId}`);
       console.log(res.data); 
       console.log(res.data[0]); 
       console.log(res.data[0].body);

        setData(res.data[0]);
        
      }catch(err){
        console.log(err);
      }
    }
    fetchPostData();
  },[]);

  // 책 정보 표시 여부 상태 및 설정 함수. 처음은 보이지 않게.
  const [showBookInfo, setShowBookInfo] = useState(false); 
  
  // 책 정보 보기 버튼 클릭 시 호출되는 함수. true로 변경되며 정보가 보이게 됨.
  const handleShowBookInfo = () => {
    setShowBookInfo(true);
  };

  // ContentState 객체를 기반으로 EditorState를 생성
  // content가 비어있거나 존재하지 않는 경우에는 빈 EditorState를 생성
  const editorState = content
    ? EditorState.createWithContent(draftToHtml(convertFromRaw(content)))
    : EditorState.createEmpty();

  return (
    <div>
      <h1>{title}</h1>
      <div className="content-box">
        <div className="dataBody">
          {data.body}
        </div>
        <Editor 
          editorState={editorState}
          toolbarHidden={true} // 툴바를 숨김.
          readOnly={true} // 읽기 전용 모드로 설정함. 이곳은 편집하는 곳이 아니기 때문.
        />
      </div>
      <p>ID: {postId}</p> {/*단순히 postId를 확인하기 위해서 나중에 없앨 예정임.*//*}

      <div className="center">
        {!showBookInfo && (
          <div className="confirmation-box">
            <p>책 정보를 확인하시겠습니까?</p>
            <button onClick={handleShowBookInfo}>확인</button>
          </div>
        )}{/*상태가 false일 경우*//*}
        
        {showBookInfo && (
          <div className="book-box">
            <p>책: {bookTitle}</p>
            <p>저자: {author}</p>
            <p>출판사: {publisher}</p>
          </div>
        )}{/*상태가 true일 경우*//*}
      </div>
    </div>
  );
}

export default PostViewPage;*/