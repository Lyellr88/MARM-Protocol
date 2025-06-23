// UI logic for modal and chat events
document.addEventListener('DOMContentLoaded', function () {
  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('help-modal');
  const closeHelp = document.getElementById('close-help');
  const chatForm = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const chatLog = document.getElementById('chat-log');

  helpBtn.onclick = () => helpModal.classList.remove('hidden');
  closeHelp.onclick = () => helpModal.classList.add('hidden');
  window.onclick = (e) => { if (e.target === helpModal) helpModal.classList.add('hidden'); };

  chatForm.onsubmit = function (e) {
    e.preventDefault();
    const msg = userInput.value.trim();
    if (!msg) return;
    appendMessage('You', msg);
    userInput.value = '';
    window.handleUserMessage(msg);
  };

  // Append a chat message
  function appendMessage(sender, text) {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // For chatbot.js to use
  window.appendBotMessage = (msg) => appendMessage('MARM', msg);
});
