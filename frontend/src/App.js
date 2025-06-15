import React from 'react';
import { PerplexityChatUI } from '@perplexity/ui-library';

export default function App() {
  return (
    <div className="container">
      <PerplexityChatUI 
        apiEndpoint="/api/chat"
        theme="dark"
      />
    </div>
  );
}
