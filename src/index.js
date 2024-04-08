// write your code here

document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch image data and comments
    const fetchImageData = async () => {
      try {
        const response = await fetch('http://localhost:3000/images/1');
        if (!response.ok) {
          throw new Error('Failed to fetch image data');
        }
        const imageData = await response.json();
        // Update UI with image data
        updateImageData(imageData);
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };
  
    // Function to update UI with image data
    const updateImageData = (imageData) => {
      // Update image title, likes count, and display the image
      const titleElement = document.querySelector('#card-title');
      const likesElement = document.querySelector('#likes-count');
      const imageElement = document.querySelector('#image');
      titleElement.textContent = imageData.title;
      likesElement.textContent = imageData.likes;
      imageElement.src = imageData.image;
  
      // Display comments
      const commentsElement = document.querySelector('#comments');
      commentsElement.innerHTML = ''; // Clear previous comments
      imageData.comments.forEach(comment => {
        const commentElement = document.createElement('li');
        commentElement.textContent = comment.content;
        commentsElement.appendChild(commentElement);
      });
    };
  
    // Function to handle like button click
    const handleLikeButtonClick = async () => {
      try {
        const response = await fetch('http://localhost:3000/images/1', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ likes: parseInt(likesElement.textContent) + 1 })
        });
        if (!response.ok) {
          throw new Error('Failed to update likes');
        }
        const updatedImageData = await response.json();
        // Update UI with updated likes count
        updateLikesCount(updatedImageData.likes);
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    };
  
    // Function to update likes count in the UI
    const updateLikesCount = (likes) => {
      const likesElement = document.querySelector('#likes-count');
      likesElement.textContent = likes;
    };
  
    // Function to handle comment form submission
    const handleCommentFormSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(commentForm);
      const commentContent = formData.get('comment');
      try {
        const response = await fetch('http://localhost:3000/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ imageId: 1, content: commentContent })
        });
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
        const newComment = await response.json();
        // Add new comment to UI
        addCommentToUI(newComment);
        // Clear comment form
        commentForm.reset();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
  
    // Function to add new comment to UI
    const addCommentToUI = (comment) => {
      const commentsElement = document.querySelector('#comments');
      const commentElement = document.createElement('li');
      commentElement.textContent = comment.content;
      commentsElement.appendChild(commentElement);
    };
  
    // Fetch image data when the page loads
    fetchImageData();
  
    // Event listeners
    const likeButton = document.querySelector('#like-button');
    likeButton.addEventListener('click', handleLikeButtonClick);
  
    const commentForm = document.querySelector('#comment-form');
    commentForm.addEventListener('submit', handleCommentFormSubmit);
  });
  
