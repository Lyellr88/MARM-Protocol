// UI logic for modal, chat events, and dark mode toggle
document.addEventListener('DOMContentLoaded', function () {
  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('help-modal');
  const closeHelp = document.getElementById('close-help');
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatLog = document.getElementById('chat-log'); // Matches the HTML
  const darkModeBtn = document.getElementById('darkModeToggle');
  
  // Help modal toggle
  if (helpBtn && helpModal && closeHelp) {
    helpBtn.onclick = () => helpModal.classList.remove('hidden');
    closeHelp.onclick = () => helpModal.classList.add('hidden');
    window.onclick = (e) => {
      if (e.target === helpModal) helpModal.classList.add('hidden');
    };
  }
  
  // Dark mode load and toggle
  if (localStorage.getItem('darkMode') === '1') {
    document.body.classList.add('dark-mode');
  }
  
  if (darkModeBtn) {
    darkModeBtn.onclick = function () {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', '1');
      } else {
        localStorage.removeItem('darkMode');
      }
    };
  }
});
