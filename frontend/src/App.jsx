import React, { useState } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: #0a0a0f;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Syne', sans-serif;
  }

  .app-bg {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0a0a0f;
    position: relative;
    overflow: hidden;
  }

  .app-bg::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 50% at 20% 10%, rgba(99, 255, 180, 0.07) 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 90%, rgba(99, 180, 255, 0.06) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .grid-overlay {
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  .card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 520px;
    margin: 24px;
    background: rgba(16, 16, 24, 0.85);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 48px 44px 44px;
    backdrop-filter: blur(24px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.04),
      0 32px 80px rgba(0,0,0,0.5),
      0 4px 24px rgba(0,0,0,0.3);
    animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(99, 255, 180, 0.08);
    border: 1px solid rgba(99, 255, 180, 0.2);
    color: #63ffb4;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 999px;
    margin-bottom: 20px;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    background: #63ffb4;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.8); }
  }

  .title {
    font-size: 36px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .title span {
    color: #63ffb4;
  }

  .subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.38);
    margin-bottom: 36px;
    font-family: 'DM Mono', monospace;
    font-weight: 400;
    letter-spacing: 0.01em;
  }

  .input-group {
    position: relative;
    margin-bottom: 14px;
  }

  .input-label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    margin-bottom: 8px;
  }

  .url-input {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 14px 16px;
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    color: #e8e8f0;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
    caret-color: #63ffb4;
  }

  .url-input::placeholder {
    color: rgba(255,255,255,0.2);
  }

  .url-input:focus {
    border-color: rgba(99, 255, 180, 0.4);
    background: rgba(99, 255, 180, 0.04);
    box-shadow: 0 0 0 3px rgba(99, 255, 180, 0.07);
  }

  .submit-btn {
    width: 100%;
    padding: 15px;
    background: #63ffb4;
    color: #080f0a;
    border: none;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
    box-shadow: 0 4px 20px rgba(99, 255, 180, 0.2);
    position: relative;
    overflow: hidden;
  }

  .submit-btn:hover {
    background: #7fffc0;
    transform: translateY(-1px);
    box-shadow: 0 8px 28px rgba(99, 255, 180, 0.32);
  }

  .submit-btn:active {
    transform: translateY(0);
  }

  .submit-btn.loading {
    pointer-events: none;
    opacity: 0.7;
  }

  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(8,15,10,0.3);
    border-top-color: #080f0a;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-right: 8px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .error-box {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 80, 80, 0.08);
    border: 1px solid rgba(255, 80, 80, 0.22);
    border-radius: 10px;
    padding: 12px 14px;
    margin-top: 16px;
    color: #ff8080;
    font-size: 13px;
    font-family: 'DM Mono', monospace;
    animation: fadeUp 0.25s ease both;
  }

  .error-icon {
    font-size: 15px;
    flex-shrink: 0;
  }

  .result-card {
    margin-top: 24px;
    background: rgba(99, 255, 180, 0.04);
    border: 1px solid rgba(99, 255, 180, 0.15);
    border-radius: 14px;
    padding: 18px 20px;
    animation: fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .result-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: rgba(99, 255, 180, 0.5);
    margin-bottom: 8px;
  }

  .result-url {
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    color: #63ffb4;
    word-break: break-all;
    line-height: 1.5;
    margin-bottom: 14px;
    font-weight: 500;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 11px;
    background: transparent;
    border: 1px solid rgba(99, 255, 180, 0.25);
    border-radius: 9px;
    color: #63ffb4;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s, transform 0.12s;
  }

  .copy-btn:hover {
    background: rgba(99, 255, 180, 0.09);
    border-color: rgba(99, 255, 180, 0.45);
    transform: translateY(-1px);
  }

  .copy-btn.copied {
    background: rgba(99, 255, 180, 0.12);
    border-color: rgba(99, 255, 180, 0.5);
    color: #63ffb4;
  }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.05);
    margin: 32px 0 28px;
  }

  .footer-text {
    text-align: center;
    font-size: 11px;
    color: rgba(255,255,255,0.18);
    font-family: 'DM Mono', monospace;
    letter-spacing: 0.05em;
  }
`;

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCopied(false);
    setShortUrl('');
    setLoading(true);

    fetch("http://localhost:3000/create/shorturl", {
      method: "POST",
      body: JSON.stringify({ url: originalUrl }),
      headers: { "Content-Type": "application/json" }
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to shorten URL");
        setShortUrl(data.short_url);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000/${shortUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy link");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app-bg">
        <div className="grid-overlay" />
        <div className="card">
          <div className="badge">
            <span className="badge-dot" />
            URL Shortener
          </div>

          <h1 className="title">
            Shrink any<br /><span>link instantly</span>
          </h1>
          <p className="subtitle">paste → shorten → share</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="url-input">Destination URL</label>
              <input
                id="url-input"
                className="url-input"
                type="url"
                placeholder="https://example.com/very-long-url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`submit-btn${loading ? ' loading' : ''}`}
            >
              {loading ? (
                <><span className="spinner" />Shortening…</>
              ) : (
                'Shorten URL →'
              )}
            </button>
          </form>

          {error && (
            <div className="error-box">
              <span className="error-icon">⚠</span>
              {error}
            </div>
          )}

          {shortUrl && (
            <div className="result-card">
              <div className="result-label">Your short link</div>
              <div className="result-url">{`http://localhost:3000/${shortUrl}`}</div>
              <button
                className={`copy-btn${copied ? ' copied' : ''}`}
                onClick={handleCopy}
              >
                {copied ? '✓ Copied to clipboard' : '⧉ Copy link'}
              </button>
            </div>
          )}

          <div className="divider" />
          <p className="footer-text">links never expire · no account needed</p>
        </div>
      </div>
    </>
  );
}

export default App;