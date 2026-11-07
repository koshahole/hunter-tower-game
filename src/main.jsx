import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Hunter Tower Error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh bg-neo-yellow flex items-center justify-center p-4">
          <div className="bg-white border-4 border-black p-5 shadow-brutal-lg max-w-sm w-full text-center">
            <span className="text-4xl block mb-2">⚠️</span>
            <h2 className="font-arcade text-sm uppercase mb-2 text-black">
              ОШИБКА ЗАГРУЗКИ ИГРЫ
            </h2>
            <p className="text-xs font-bold text-slate-700 mb-3 bg-slate-100 p-2 border border-black break-words">
              {this.state.error?.message || 'Неизвестная ошибка'}
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 bg-neo-pink text-white border-3 border-black font-arcade text-xs shadow-brutal active:translate-x-[1px] active:translate-y-[1px] uppercase"
            >
              СБРОСИТЬ И ПЕРЕЗАПУСТИТЬ
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
