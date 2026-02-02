export default function ErrorState({ message, onRetry }) {
  return (
    <div className="centerBox">
      <div style={{ marginBottom: 12 }}>❌ {message}</div>
      <button className="button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
