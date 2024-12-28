document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://your-project-name.glitch.me/questions';
  
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Logged in successfully');
      });
    }
  
    // Quiz form handling
    const quizForm = document.getElementById('quiz-form');
    if (quizForm) {
      quizForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const newQuestion = {
          title: event.target.question.value,
          optionA: event.target.optionA.value,
          optionB: event.target.optionB.value,
          optionC: event.target.optionC.value,
          optionD: event.target.optionD.value,
          correctOption: event.target.correctOption.value,
          reviewStatus: false
        };
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuestion)
          });
          if (response.ok) {
            alert('Question added successfully');
            loadQuestions();
          } else {
            alert('Failed to add question');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  
    // Load questions
    const loadQuestions = async () => {
      try {
        const response = await fetch(apiUrl);
        const questions = await response.json();
        const container = document.getElementById('questions-container');
        if (container) {
          container.innerHTML = '';
          questions.forEach(question => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.innerHTML = `
              <h3>${question.title}</h3>
              <p>A: ${question.optionA}</p>
              <p>B: ${question.optionB}</p>
              <p>C: ${question.optionC}</p>
              <p>D: ${question.optionD}</p>
              <p>Correct Option: ${question.correctOption}</p>
              <button onclick="reviewQuestion(${question.id}, true)">Mark as Reviewed</button>
              <button onclick="deleteQuestion(${question.id})">Delete</button>
            `;
            container.appendChild(questionCard);
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Review question
    window.reviewQuestion = async (id, reviewStatus) => {
      try {
        const response = await fetch(${apiUrl}/${id}, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ reviewStatus })
        });
        if (response.ok) {
          alert('Review status updated');
          loadQuestions();
        } else {
          alert('Failed to update review status');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Delete question
    window.deleteQuestion = async (id) => {
      try {
        const response = await fetch(${apiUrl}/${id}, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Question deleted');
          loadQuestions();
        } else {
          alert('Failed to delete question');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Load reviewed questions
    const loadReviewedQuestions = async () => {
      try {
        const response = await fetch(apiUrl);
        const questions = await response.json();
        const container = document.getElementById('reviewed-questions-container');
        if (container) {
          container.innerHTML = '';
          questions.filter(q => q.reviewStatus).forEach(question => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.innerHTML = `
              <h3>${question.title}</h3>
              <p>A: ${question.optionA}</p>
              <p>B: ${question.optionB}</p>
              <p>C: ${question.optionC}</p>
              <p>D: ${question.optionD}</p>
              <p>Correct Option: ${question.correctOption}</p>
            `;
            container.appendChild(questionCard);
          });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Initial load
    if (document.getElementById('questions-container')) {
      loadQuestions();
    }
    if (document.getElementById('reviewed-questions-container')) {
      loadReviewedQuestions();
    }
  });