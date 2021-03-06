import React, { useState, useEffect } from 'react';

const url = 'https://fsyrc1qpr9.execute-api.us-east-1.amazonaws.com/prod/notes';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('something went wrong while requesting posts');
      })
      .then((posts) => setPosts(posts))
      .catch((error) => setError(error.message));
  }, []);

  if (error) return <h1>{error}</h1>;

  return (
    <div>
      {posts.length > 0 ? (
        <>
          <Pagination
            data={posts}
            RenderComponent={Post}
            title="Posts"
            pageLimit={1}
            dataLimit={2}
          />
        </>
      ) : (
       <h1>No Posts to display</h1>
      )}
    </div>
  );
}

function Post(props) {
    const { noteId, content, createdAt } = props.data;
    return (
      <div className="post">
        <small>{noteId}</small>
        <h1>{createdAt}</h1>
        <p>{content}</p>
      </div>
    );
  }

  function Pagination({ data, RenderComponent, title, pageLimit, dataLimit }) {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);
  
    function goToNextPage() {
        setCurrentPage((page) => page + 1);
      }
  
      function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
      }
  
      function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
      }
  
      const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
      };
  
      const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
      };
  
      return (
        <div>
          <h1>{title}</h1>
      
          {/* show the posts, 10 posts at a time */}
          <div className="dataContainer">
            {getPaginatedData().map((d, idx) => (
              <RenderComponent key={idx} data={d} />
            ))}
          </div>
      
          {/* show the pagiantion
              it consists of next and previous buttons
              along with page numbers, in our case, 5 page
              numbers at a time
          */}
          <div className="pagination">
            {/* previous button */}
            <button
              onClick={goToPreviousPage}
              className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
            >
              prev
            </button>
      
            {/* show page numbers */}
            {getPaginationGroup().sort(function(a,b) { return a.createdAt  < b.createdAt}).map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${currentPage === item ? 'active' : null}`}
              >
                <span>{item}</span>
              </button>
            ))}
      
            {/* next button */}
            <button
              onClick={goToNextPage}
              className={`next ${currentPage === pages ? 'disabled' : ''}`}
            >
              next
            </button>
          </div>
        </div>
      );
            }