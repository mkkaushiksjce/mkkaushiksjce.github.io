// LOGIN PAGE logic
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'dashboard.html';
    } else {
      const popup = document.getElementById('error-popup');
      popup.classList.remove('hidden');
      setTimeout(() => popup.classList.add('hidden'), 2000);
    }
  });
}

// DASHBOARD PAGE logic
if (window.location.pathname.includes('dashboard.html')) {
  if (sessionStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'index.html';
  }

  // Sidebar navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      const section = this.getAttribute('data-section');
      document.querySelectorAll('.dashboard-section').forEach(sec => sec.classList.add('hidden'));
      document.getElementById(section + 'Section').classList.remove('hidden');
    });
  });

  // Logout functionality
  document.getElementById('logoutBtn').addEventListener('click', function() {
    sessionStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  });
}

// Drag & Drop visual feedback for Excel Upload
const dragArea = document.getElementById('drag-area');
const uploadInput = document.getElementById('excel-upload');

if (dragArea && uploadInput) {
  dragArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragArea.classList.add('dragover');
  });
  dragArea.addEventListener('dragleave', () => {
    dragArea.classList.remove('dragover');
  });
  dragArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dragArea.classList.remove('dragover');
    uploadInput.files = e.dataTransfer.files;

    // Optional: Give a visual confirmation
    dragArea.querySelector('.drag-text').textContent = "File attached!";
  });
  // Optionally handle normal input selection
  uploadInput.addEventListener('change', function() {
    if (uploadInput.files && uploadInput.files.length > 0) {
      dragArea.querySelector('.drag-text').textContent = "File attached!";
    }
  });
}
// Error popup for login failure
if (document.getElementById('error-popup')) {           
  const errorPopup = document.getElementById('error-popup');
  errorPopup.addEventListener('click', function() {
    errorPopup.classList.add('hidden');
  });
}