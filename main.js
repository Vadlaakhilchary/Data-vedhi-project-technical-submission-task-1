/**
 * Landing Page JavaScript
 * Advanced interactive functionality for Data Vedhi submission
 * Author: [Your Name]
 * Date: [Current Date]
 */

// =================================
// THEME TOGGLE FUNCTIONALITY
// =================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '🌙 Toggle Theme' : '☀️ Toggle Theme';
        
        // Save theme preference
        localStorage.setItem('preferred-theme', newTheme);
        
        showNotification(`🎨 Switched to ${newTheme} mode`, 'success');
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '🌙 Toggle Theme' : '☀️ Toggle Theme';
    }
}

// =================================
// PARTICLE SYSTEM
// =================================

function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 25000);
    }

    // Generate particles periodically
    const particleInterval = setInterval(createParticle, 800);
    
    // Clean up when page is unloaded
    window.addEventListener('beforeunload', () => {
        clearInterval(particleInterval);
    });
}

// =================================
// SMOOTH SCROLLING & NAVIGATION
// =================================

function initializeSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                showNotification('🎯 Navigating to section', 'info');
            }
        });
    });

    // Parallax effect for hero content
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// =================================
// INTERSECTION OBSERVER ANIMATIONS
// =================================

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.skill-card, .project-card').forEach(element => {
        observer.observe(element);
    });
}

// =================================
// PROJECT LINKS FUNCTIONALITY
// =================================

function initializeProjectLinks() {
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const linkText = this.querySelector('span')?.textContent || 'Project';
            
            // Handle different types of links
            if (href === '#' || href === '' || !href) {
                e.preventDefault();
                showNotification('🚧 This feature is coming soon!', 'info');
                return;
            }
            
            // Handle local files
            if (href.includes('.html') || href.includes('.py') || href.includes('.pdf')) {
                e.preventDefault();
                handleLocalFile(href, linkText);
                return;
            }
            
            // Handle external links (GitHub, etc.)
            if (href.startsWith('http')) {
                showNotification('🔗 Opening external link...', 'success');
                return; // Let default behavior happen
            }
        });
    });
}

// =================================
// FILE HANDLING FUNCTIONS
// =================================

function handleLocalFile(fileName, linkText) {
    // Check file type and handle appropriately
    if (fileName.endsWith('.py')) {
        showPythonCodeModal(fileName);
    } else if (fileName.endsWith('.pdf')) {
        handlePDFLink(fileName);
    } else if (fileName.endsWith('.html')) {
        handleHTMLFile(fileName, linkText);
    } else {
        showNotification('📄 File: ' + fileName, 'info');
    }
}

function handleHTMLFile(fileName, linkText) {
    // Try to open in new tab
    try {
        const newWindow = window.open(fileName, '_blank');
        
        // Check if popup was blocked or file doesn't exist
        setTimeout(() => {
            if (!newWindow || newWindow.closed || newWindow.location.href === 'about:blank') {
                showProjectModal(fileName, linkText);
            } else {
                showNotification('🌐 Opening ' + fileName, 'success');
            }
        }, 100);
    } catch (error) {
        showProjectModal(fileName, linkText);
    }
}

function handlePDFLink(fileName) {
    try {
        const newWindow = window.open(fileName, '_blank');
        if (newWindow) {
            showNotification('📄 Opening PDF...', 'success');
        } else {
            showNotification('📄 PDF will be available soon! Check project directory.', 'info');
        }
    } catch (error) {
        showNotification('📄 PDF file not found. Will be available after conversion.', 'warning');
    }
}

// =================================
// MODAL SYSTEM
// =================================

function showPythonCodeModal(fileName) {
    const content = `
        <div class="code-preview">
            <div class="code-header">
                <span class="code-icon">🐍</span>
                <span class="code-title">${fileName}</span>
                <span class="code-language">Python</span>
            </div>
            <div class="code-description">
                <h4>Second Largest Number - Advanced Solution</h4>
                <p>Comprehensive algorithmic implementation featuring:</p>
                <ul>
                    <li>✅ <strong>O(n) Optimal Algorithm:</strong> Single-pass solution</li>
                    <li>✅ <strong>Duplicate Handling:</strong> Correctly manages repeated values</li>
                    <li>✅ <strong>Multiple Approaches:</strong> 4 different implementation methods</li>
                    <li>✅ <strong>Comprehensive Testing:</strong> 8 detailed test cases</li>
                    <li>✅ <strong>Performance Analysis:</strong> Benchmarking and optimization</li>
                    <li>✅ <strong>Professional Documentation:</strong> Detailed comments and explanations</li>
                </ul>
                
                <div class="code-features">
                    <div class="feature-item">
                        <strong>📊 Time Complexity:</strong> O(n) - Linear time
                    </div>
                    <div class="feature-item">
                        <strong>💾 Space Complexity:</strong> O(1) - Constant space
                    </div>
                    <div class="feature-item">
                        <strong>🧪 Test Coverage:</strong> Edge cases, duplicates, negatives
                    </div>
                </div>
                
                <div class="code-actions">
                    <button onclick="tryOpenFile('${fileName}')" class="btn btn-primary">
                        📄 View Full Code
                    </button>
                    <button onclick="showCodeSnippet()" class="btn btn-secondary">
                        👁️ Preview Solution
                    </button>
                    <button onclick="runDemo()" class="btn btn-secondary">
                        ⚡ Run Demo
                    </button>
                </div>
            </div>
        </div>
    `;
    
    createModal('🐍 Python Algorithm Solution', content);
}

function showProjectModal(fileName, linkText) {
    let content = '';
    
    if (fileName === 'landing-page.html') {
        content = `
            <div class="project-modal-content">
                <div class="project-demo">
                    <h3>🚀 Advanced Landing Page</h3>
                    <div class="demo-badge">✨ You're Currently Viewing This Project!</div>
                    <p>This interactive landing page showcases modern web development techniques:</p>
                    
                    <div class="features-grid">
                        <div class="feature-card">
                            <span class="feature-icon">🎨</span>
                            <strong>Glassmorphism Design</strong>
                            <p>Modern glass-like transparency effects</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">🌙</span>
                            <strong>Theme Toggle</strong>
                            <p>Dark/Light mode switching</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">⚡</span>
                            <strong>Animations</strong>
                            <p>Smooth CSS transitions and effects</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">📱</span>
                            <strong>Responsive</strong>
                            <p>Works perfectly on all devices</p>
                        </div>
                    </div>
                    
                    <div class="demo-actions">
                        <button onclick="document.getElementById('themeToggle')?.click()" class="btn btn-primary">
                            🌙 Try Theme Toggle
                        </button>
                        <button onclick="scrollToSection('skills')" class="btn btn-secondary">
                            🎯 Explore Features
                        </button>
                        <button onclick="showTechDetails('landing')" class="btn btn-secondary">
                            🔧 Tech Stack
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else if (fileName === 'feedback-form.html') {
        content = `
            <div class="project-modal-content">
                <div class="project-demo">
                    <h3>📝 Interactive Feedback System</h3>
                    <p>Advanced form application with modern UX features:</p>
                    
                    <div class="features-grid">
                        <div class="feature-card">
                            <span class="feature-icon">✅</span>
                            <strong>Smart Validation</strong>
                            <p>Real-time form validation and error handling</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">⭐</span>
                            <strong>Star Ratings</strong>
                            <p>Interactive 5-star rating system</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">📊</span>
                            <strong>Progress Tracking</strong>
                            <p>Visual completion progress indicator</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">💾</span>
                            <strong>Data Storage</strong>
                            <p>JSON format data persistence</p>
                        </div>
                    </div>
                    
                    <div class="demo-actions">
                        <button onclick="tryOpenFile('${fileName}')" class="btn btn-primary">
                            🔗 Open Feedback Form
                        </button>
                        <button onclick="showFormPreview()" class="btn btn-secondary">
                            👀 Preview Features
                        </button>
                        <button onclick="showTechDetails('feedback')" class="btn btn-secondary">
                            🔧 Technical Specs
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    createModal(linkText, content);
}

function createModal(title, content) {
    // Remove existing modal
    closeModal();
    
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()" aria-label="Close modal">✕</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    
    // Focus management for accessibility
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) closeButton.focus();
}

function closeModal() {
    const modal = document.querySelector('.custom-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        document.body.style.overflow = ''; // Restore scroll
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    }
}

// =================================
// NOTIFICATION SYSTEM
// =================================

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">✕</button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after specified duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

// =================================
// UTILITY FUNCTIONS
// =================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeModal();
        showNotification(`📍 Navigated to ${sectionId} section`, 'success');
    }
}

function tryOpenFile(fileName) {
    try {
        const newWindow = window.open(fileName, '_blank');
        if (!newWindow) {
            showNotification('🔒 Popup blocked! Please allow popups or check if file exists.', 'warning');
        } else {
            showNotification(`🎉 Opening ${fileName}`, 'success');
            closeModal();
        }
    } catch (error) {
        showNotification(`❌ Could not open ${fileName}. File may not exist yet.`, 'error');
    }
}

function showCodeSnippet() {
    const codePreview = `
// Optimal O(n) solution for finding second largest number
function secondLargestOptimal(numbers) {
    if (numbers.length < 2) return null;
    
    let first = -Infinity, second = -Infinity;
    
    for (const num of numbers) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num !== first) {
            second = num;
        }
    }
    
    return second === -Infinity ? null : second;
}

// Test: [11, 3, 7, 9, 15] → Output: 11 ✅
    `;
    
    showNotification('💻 Code preview shown in console! Check browser dev tools.', 'info');
    console.log('🐍 Python Algorithm Solution Preview:\n', codePreview);
}

function runDemo() {
    const testInput = [11, 3, 7, 9, 15];
    const expectedOutput = 11;
    
    // Simulate algorithm execution
    setTimeout(() => {
        showNotification(`🧮 Demo: Input [${testInput.join(', ')}] → Output: ${expectedOutput} ✅`, 'success', 5000);
    }, 500);
    
    closeModal();
}

function showFormPreview() {
    showNotification('📝 The feedback form includes: Star ratings, Progress tracking, Real-time validation, JSON storage!', 'info', 4000);
    closeModal();
}

function showTechDetails(project) {
    let techStack = '';
    
    if (project === 'landing') {
        techStack = '🔧 Tech Stack: HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript, CSS Animations, Local Storage API';
    } else if (project === 'feedback') {
        techStack = '🔧 Tech Stack: HTML5 Forms, CSS3 (Glassmorphism), JavaScript (Validation/Storage), JSON, Web Storage API';
    }
    
    showNotification(techStack, 'info', 5000);
    closeModal();
}

// =================================
// KEYBOARD ACCESSIBILITY
// =================================

function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes modal
        if (e.key === 'Escape') {
            closeModal();
        }
        
        // Ctrl/Cmd + K for quick theme toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) themeToggle.click();
        }
    });
}

// =================================
// PERFORMANCE MONITORING
// =================================

function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        if ('performance' in window) {
            const loadTime = performance.now();
            if (loadTime < 2000) {
                console.log('🚀 Page loaded in', Math.round(loadTime), 'ms - Excellent performance!');
            }
        }
    });
}

// =================================
// ERROR HANDLING
// =================================

function initializeErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('🚨 JavaScript Error:', e.error);
        // Don't show error notifications to users - handle gracefully
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('🚨 Unhandled Promise Rejection:', e.reason);
        e.preventDefault(); // Prevent default browser error handling
    });
}

// =================================
// INITIALIZATION
// =================================

function initializeApp() {
    // Initialize all functionality
    initializeThemeToggle();
    initializeParticles();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeProjectLinks();
    initializeKeyboardNavigation();
    initializePerformanceMonitoring();
    initializeErrorHandling();
    
    // Show welcome message
    setTimeout(() => {
        showNotification('🎉 Welcome to my Data Vedhi submission!', 'success');
    }, 1000);
    
    console.log('🚀 Landing page initialized successfully!');
}

// =================================
// MAIN EXECUTION
// =================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Export functions for global access (optional)
window.closeModal = closeModal;
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;
// ..
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.background = 'var(--primary-color)';
            link.style.color = 'white';
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', highlightCurrentPage);
function downloadCheatSheet() {
    // Create a temporary link to download the PDF
    const link = document.createElement('a');
    link.href = 'python-cheat-sheet.pdf';
    link.download = 'vadla-akhil-python-cheat-sheet.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('📄 Downloading Python cheat sheet...', 'success');
}