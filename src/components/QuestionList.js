import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(res => setQuestions(res))
  },[])

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE" })
      .then(res => res.json())
      .then(() => {setQuestions(questions.filter((q) => (q.id !== id)))})
  }

  function handleAnswerChange(correctIndex, id) {
    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex })
    })
    .then(res => res.json())
    .then((res) => { setQuestions(questions.map((q) => {
        if (q.id === res.id) {
          return res
        } else {
          return q
        }
      }))
    })

  }

  
  return (<section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q) => (<QuestionItem question={q} key={q.id} handleDelete={handleDelete} handleAnswerChange={handleAnswerChange}/>))}
      </ul>

    </section>
  );
}

export default QuestionList;
