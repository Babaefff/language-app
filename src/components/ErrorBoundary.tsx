import { Component, type ReactNode } from 'react';

/** Shows what went wrong instead of a blank page, with a way back. */
export class ErrorBoundary extends Component<{ children: ReactNode; onReset: () => void }, { error: Error | null }> {
  state = { error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="page narrow">
        <div className="card">
          <h2>Something went wrong on this screen</h2>
          <p className="muted small">Your progress is safe. Please send this message to the developer:</p>
          <pre className="error-text">{error.message}</pre>
          <button className="btn primary" onClick={() => { this.setState({ error: null }); this.props.onReset(); }}>Back to home</button>
        </div>
      </div>
    );
  }
}
