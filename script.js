const blogForm = document.getElementById('blogForm');
const titleInput = document.getElementById('titleInput');
const contentInput = document.getElementById('contentInput');
const blogList = document.getElementById('blogList');

// Function to create a new blog element
function createBlogElement(blog) {
  const blogElement = document.createElement('div');
  blogElement.classList.add('blog');

  const titleElement = document.createElement('h2');
  titleElement.classList.add('title');
  titleElement.textContent = blog.title;

  const contentElement = document.createElement('p');
  contentElement.classList.add('content');
  contentElement.textContent = blog.content;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteBlog(blog.id);
  });

  // Append elements to the blog container
  blogElement.appendChild(titleElement);
  blogElement.appendChild(contentElement);
  blogElement.appendChild(deleteButton);

  return blogElement;
}

// Function to fetch blogs from the API
function fetchBlogs() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      data.forEach(blog => {
        const blogElement = createBlogElement(blog);
        blogList.appendChild(blogElement);
      });
    })
    .catch(error => {
      console.log('Error fetching blogs:', error);
    });
}

// Function to add a new blog
function addBlog(title, content) {
  const newBlog = {
    title: title,
    content: content
  };

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBlog)
  })
    .then(response => response.json())
    .then(blog => {
      const blogElement = createBlogElement(blog);
      blogList.prepend(blogElement);
    })
    .catch(error => {
      console.log('Error adding blog:', error);
    });
}

// Function to delete a blog
function deleteBlog(blogId) {
    console.log(blogId)
  fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
    method: 'DELETE'
  })
    .then(() => {
      const blogElement = document.getElementById(`blog-${blogId}`);
      blogElement.remove();
    })
    .catch(error => {
      console.log('Error deleting blog:', error);
    });
}

// Event listener for blog form submission
blogForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const content = contentInput.value;

  addBlog(title, content);

  titleInput.value = '';
  contentInput.value = '';
});

// Fetch blogs when the page loads
fetchBlogs();
