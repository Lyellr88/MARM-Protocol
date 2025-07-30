// ui.js - DOM manipulation and UI display functions for MARM chatbot
import { speakText, voiceConfig, addVoiceToggleToHelp } from './voice.js';

// ===== LOADING INDICATORS =====
export function showLoadingIndicator() {
  const chatMessages = document.getElementById('chat-log');
  if (!chatMessages) throw new Error('Chat log not found');
  
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading-indicator';
  loadingDiv.id = 'loading-indicator';
  
  loadingDiv.innerHTML = `
    <div class="message-name">MARM bot</div>
    <div class="loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

export function hideLoadingIndicator() {
  const loadingDiv = document.getElementById('loading-indicator');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

// ===== MARKDOWN PROCESSING =====
function processMarkdownWithCodeWindows(text) {
  if (!window.marked) return text;
  
  let html = marked.parse(text);
  
  const codeBlockRegex = /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/g;
  
  html = html.replace(codeBlockRegex, (match, codeContent) => {
    const langMatch = match.match(/class="language-(\w+)"/);
    const language = langMatch ? langMatch[1] : 'markdown';
    
    const cleanCode = codeContent
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
    
    return `
      <div class="code-window">
        <div class="code-window-header">
          <span class="code-language">${language}</span>
          <button class="code-window-copy-btn" onclick="copyCodeWindow(this)">
            Copy
          </button>
        </div>
        <div class="code-window-content">
          <pre><code>${cleanCode}</code></pre>
        </div>
      </div>
    `;
  });
  
  return html;
}

// ===== CODE WINDOW COPY FUNCTION =====
window.copyCodeWindow = function(button) {
  const codeWindow = button.closest('.code-window');
  const codeElement = codeWindow.querySelector('code');
  const codeText = codeElement.textContent;
  
  navigator.clipboard.writeText(codeText).then(() => {
    button.textContent = 'Copied!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = 'Copy';
      button.classList.remove('copied');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy code: ', err);
  });
};

// ===== MESSAGE DISPLAY =====
export function appendMessage(sender, text) {
  const chatMessages = document.getElementById('chat-log');
  if (!chatMessages) throw new Error('Chat log not found');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}-message`;
  
  const nameTag = document.createElement('div');
  nameTag.className = 'message-name';
  nameTag.textContent = sender === 'user' ? 'User' : 'MARM bot';
  messageDiv.appendChild(nameTag);
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.setAttribute('aria-live', 'polite');
  
  if (sender === 'bot') {
    try {
      // Process markdown and create proper code windows
      const processedContent = processMarkdownWithCodeWindows(text);
      contentDiv.innerHTML = processedContent;
    } catch (e) {
      contentDiv.textContent = text;
    }
  } else {
    try {
      // Process markdown for user messages too
      const processedContent = processMarkdownWithCodeWindows(text);
      contentDiv.innerHTML = processedContent;
    } catch (e) {
      contentDiv.textContent = text;
    }
  }
  messageDiv.appendChild(contentDiv);

  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-btn';
  copyBtn.textContent = 'Copy';
  copyBtn.title = 'Copy text';
  copyBtn.onclick = function() {
    navigator.clipboard.writeText(contentDiv.textContent).then(() => {
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      
      setTimeout(() => {
        copyBtn.textContent = 'Copy';
        copyBtn.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
  messageDiv.appendChild(copyBtn);
  
  if (sender === 'bot') {
    const voiceBtn = document.createElement('button');
    voiceBtn.className = 'voice-btn';
    voiceBtn.textContent = '🔊';
    voiceBtn.title = 'Read aloud';
    voiceBtn.onclick = function() {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        document.querySelectorAll('.bot-message').forEach(msg => {
          msg.classList.remove('speaking');
        });
      } else {
        if (typeof speakText === 'function') {
          speakText(text, true);
          messageDiv.classList.add('speaking');
        }
      }
    };
    messageDiv.appendChild(voiceBtn);
  }
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  if (sender === 'bot' && voiceConfig && voiceConfig.enabled) {
    setTimeout(() => {
      speakText(text, true);
      messageDiv.classList.add('speaking');
    }, 100);
  }
}

// ===== COMMAND MENU SYSTEM =====
export function createCommandMenu() {
  const commandMenu = document.createElement('div');
  commandMenu.className = 'command-menu';
  commandMenu.id = 'command-menu';
  
  let commandMenuCollapsed = false;
  try {
    commandMenuCollapsed = localStorage.getItem('commandMenuCollapsed') === 'true';
  } catch (e) {
    commandMenuCollapsed = false;
  }
  if (commandMenuCollapsed) {
    commandMenu.classList.add('collapsed');
  }
  
  commandMenu.setAttribute('aria-expanded', 'false');

  commandMenu.innerHTML = `
    <div class="command-menu-header">
      <span class="command-menu-title">Quick Commands</span>
      <button class="command-menu-toggle">▼</button>
    </div>
    <div class="command-menu-content">
      <div class="command-item" data-command="/start marm" title="Activate MARM protocol">
        <div class="command-name">/start marm</div>
      </div>
      <div class="command-item" data-command="/refresh marm" title="Refresh session state">
        <div class="command-name">/refresh marm</div>
      </div>
      <div class="command-item" data-command="/log session:" title="Name your session">
        <div class="command-name">/log session:</div>
      </div>
      <div class="command-item" data-command="/log entry " title="Log entry [Date-Summary-Result]">
        <div class="command-name">/log entry</div>
      </div>
      <div class="command-item" data-command="/contextual reply" title="Generate response with reasoning">
        <div class="command-name">/contextual reply</div>
      </div>
      <div class="command-item" data-command="/show reasoning" title="Display logic behind last response">
        <div class="command-name">/show reasoning</div>
      </div>
      <div class="command-item" data-command="/compile " title="Compile session summary">
        <div class="command-name">/compile</div>
      </div>
      <div class="command-item notebook-item" title="Manage your knowledge library">
        <div class="command-name">/notebook</div>
        <div class="notebook-submenu" id="notebook-submenu" style="display: none;">
          <div class="submenu-item" data-command="/notebook key:" title="Store information">key:</div>
          <div class="submenu-item" data-command="/notebook get:" title="Retrieve specific entry">get:</div>
          <div class="submenu-item" data-command="/notebook show:" title="Display all entries">show:</div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(commandMenu);
  
  commandMenu.addEventListener('click', (e) => {
    if (e.target.closest('.command-menu-header')) {
      toggleCommandMenu();
    } else if (e.target.closest('.submenu-item')) {
      const command = e.target.closest('.submenu-item').getAttribute('data-command');
      if (command) insertCommand(command);
    } else if (e.target.closest('.notebook-item')) {
      handleNotebookClick(e);
      return;
    } else if (e.target.closest('.command-item')) {
      const command = e.target.closest('.command-item').getAttribute('data-command');
      if (command) insertCommand(command);
    }
  });
}

export function toggleCommandMenu() {
  const menu = document.getElementById('command-menu');
  if (!menu) return;
  menu.classList.toggle('collapsed');
  
  localStorage.setItem('commandMenuCollapsed', menu.classList.contains('collapsed'));
}

export function handleNotebookClick(event) {
  event.stopPropagation();
  const submenu = document.getElementById('notebook-submenu');
  if (!submenu) return;
  const isVisible = submenu.style.display === 'block';
  
  document.querySelectorAll('.notebook-submenu').forEach(menu => {
    menu.style.display = 'none';
  });
  
  submenu.style.display = isVisible ? 'none' : 'block';
}

export function insertCommand(command) {
  const input = document.getElementById('user-input');
  if (!input) return;
  input.value = command;
  input.focus();
  
  const submenu = document.getElementById('notebook-submenu');
  if (submenu) {
    submenu.style.display = 'none';
  }
  
  // Auto-close command menu on mobile after selection
  const commandMenu = document.getElementById('command-menu');
  if (commandMenu && window.innerWidth <= 600) {
    commandMenu.classList.add('collapsed');
    localStorage.setItem('commandMenuCollapsed', 'true');
  }
  
  if (command.endsWith(' ')) {
    input.setSelectionRange(input.value.length, input.value.length);
  }
}

// ===== MODAL SETUP =====
export function setupHelpModal() {
  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('help-modal');
  const closeHelp = document.getElementById('close-help');
  const markdownModal = document.getElementById('markdown-modal');
  const closeMarkdown = document.getElementById('close-markdown');
  const markdownContent = document.getElementById('markdown-content');
  const markdownTitle = document.getElementById('markdown-title');

  if (helpBtn && helpModal && closeHelp) {
    helpBtn.addEventListener('click', () => helpModal.classList.remove('hidden'));
    closeHelp.addEventListener('click', () => helpModal.classList.add('hidden'));
    document.addEventListener('click', (e) => {
      if (e.target === helpModal) helpModal.classList.add('hidden');
    });
  }

  if (markdownModal && closeMarkdown) {
    closeMarkdown.addEventListener('click', () => markdownModal.classList.add('hidden'));
    document.addEventListener('click', (e) => {
      if (e.target === markdownModal) markdownModal.classList.add('hidden');
    });
  }

  document.addEventListener('click', async (e) => {
    if (e.target.closest('.doc-link')) {
      e.preventDefault();
      const docLink = e.target.closest('.doc-link');
      const docFile = docLink.getAttribute('data-doc');
      
      if (docFile && markdownModal && markdownContent && markdownTitle) {
        markdownModal.classList.remove('hidden');
        markdownContent.innerHTML = '<div class="loading-spinner">Loading...</div>';
        
        const titles = {
          'handbook.md': '📘 MARM Handbook',
          'faq.md': '❓ Frequently Asked Questions',
          'description.md': '📄 Project Description',
          'roadmap.md': '🗺️ Development Roadmap'
        };
        markdownTitle.textContent = titles[docFile] || 'Documentation';
        
        try {
          const response = await fetch(`data/${docFile}`);
          if (!response.ok) throw new Error('Failed to load document');
          
          const markdownText = await response.text();
          const htmlContent = marked.parse(markdownText);
          markdownContent.innerHTML = htmlContent;
        } catch (error) {
          markdownContent.innerHTML = `
            <div class="error-message">
              <h3>❌ Failed to load document</h3>
              <p>Sorry, we couldn't load the ${docFile} file. Please try again later.</p>
              <p><small>Error: ${error.message}</small></p>
            </div>
          `;
        }
      }
    }
  });
  
  if (helpBtn) {
    helpBtn.addEventListener('click', () => {
      setTimeout(() => {
        addVoiceToggleToHelp();
      }, 100);
    });
  }
}

// ===== UI SETUP FUNCTIONS =====
export function setupDarkMode() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let userPreference = null;
  try {
    userPreference = localStorage.getItem('darkMode');
  } catch (e) {
    userPreference = null;
  }
  
  let shouldBeDark = false;
  if (userPreference !== null) {
    shouldBeDark = userPreference === '1';
  } else {
    shouldBeDark = prefersDark;
  }
  
  if (shouldBeDark) {
    document.body.classList.add('dark-mode');
  }
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (userPreference === null) {
      if (e.matches) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  });
}

export function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      toggleCommandMenu();
    }
  });
}

export function setupAutoExpandingTextarea() {
  const userInput = document.getElementById('user-input');
  if (!userInput) return;

  userInput.addEventListener('input', () => {
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
  });

  userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      document.getElementById('chat-form').requestSubmit();
    }
  });
}

export function setupTokenCounter() {
} 
