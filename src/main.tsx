
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add custom CSS for button animations
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  .animate-pulse-on-hover:hover {
    animation: pulse 0.5s ease-in-out infinite;
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  .bg-gradient-button {
    background: linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%);
  }
  .hover-3d-rotate {
    transition: transform 0.3s ease;
  }
  .hover-3d-rotate:hover {
    transform: perspective(1000px) rotateY(10deg);
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
