'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/session', {
          method: 'GET',
          credentials: 'include'
        });

        const data = await response.json();
        if (!data.success) {
          window.location.href = '/';
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        window.location.href = '/';
      }
    };

    checkSession();
  }, []);

  const logout = () => {
    // Clear the session cookie by setting max-age=0
    document.cookie = "session=; Path=/; Max-Age=0; SameSite=Strict;";
    window.location.href = "/";
  };

  const handleViewDocument = async () => {
    setIsLoading(true);

    try {
      // Fetch document as blob
      const response = await fetch('/api/download', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();

      // Create temporary link to download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 500);

    } catch (e) {
      alert('Could not download document.');
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render anything until authentication is verified
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Adobe Cloud Dashboard</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      
      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          background: #f0f2f5;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .dashboard-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          position: relative;
        }
        .view-btn {
          margin-top: 1.5rem;
          padding: 0.7rem 1.2rem;
          font-size: 17px;
          border: none;
          background: #ff0000;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(200,0,0,0.08);
          display: inline-block;
          text-decoration: none;
          transition: background 0.2s;
        }
        .view-btn:hover {
          background: #cc0000;
        }
        .view-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .logout-btn {
          margin-top: 1rem;
          padding: 0.6rem 1.2rem;
          font-size: 16px;
          border: none;
          background: crimson;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .logout-btn:hover {
          background: darkred;
        }
        .loading-overlay {
          position: absolute;
          top: 0; 
          left: 0; 
          right: 0; 
          bottom: 0;
          background: rgba(255,255,255,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .loading-message {
          font-size: 1.3rem;
          font-weight: bold;
          color: #ff0000;
          letter-spacing: 1px;
          text-align: center;
        }
      `}</style>

      <div className="dashboard-container">
        <h1>📄 Welcome to Your Adobe Cloud Dashboard</h1>
        <p>This page is protected and only accessible after login.</p>
        
        <button 
          className="view-btn" 
          onClick={handleViewDocument}
          disabled={isLoading}
        >
          View Document
        </button>
        
        <br/>
        
        <button className="logout-btn" onClick={logout}>
          Log Out
        </button>

        {/* Loading overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-message">Loading document...</div>
          </div>
        )}
      </div>
    </>
  );
}