import React, { useEffect, useState } from 'react';
import PostFragment from './PostFragment';
import styles from "../css/ScrollView.module.css"
function ScrollView() {//무한스크롤
  const count = 20;
  let index =0;
  const [fragments, setFragments] = useState([]); // PostFragment 컴포넌트들을 담을 상태
  
  useEffect(() => {
    const options = {
      root:null,
      threshold: 0.1
    };  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async(entry) => {
        if (entry.isIntersecting) {
          console.log("entry.isIntersecting");
          fetch("http://localhost:8080/api/ScrollView")
          .then(res=>res.json())
          .then(json=>{
            const newFragments = [];
            for (let i = index; i < index + count; i++) {
              newFragments.push(<PostFragment key={i} postID={json[i].postID} post={json[i].body}/>);//postID만 가지고 검색할 예정
            }
            setFragments(prevFragments => [...prevFragments, ...newFragments]); // 기존 fragments에 새로운 fragments를 추가
            index+=count;}
          )
          .catch((error)=>{console.log("erorr: "+error)})
            
        }
      });
    }, options);
    
    // list-end 요소를 관찰
    const target = document.querySelector(`.${styles.listEnd}`);
    if (target) {
      observer.observe(target);
    }

    // IntersectionObserver 객체를 cleanup하기 위해 return에서 disconnect 호출
    return () => observer.disconnect();
  }, []);
  //
  return (
    <div className={styles.mainBox}>
      <div className="list">
        {fragments} {/* fragments 배열을 렌더링 */}
      </div>
      <div className={styles.listEnd}></div>
    </div>
  );
}

export default ScrollView;