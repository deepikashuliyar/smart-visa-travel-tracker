function ExpiryCard({ title, expiryDate, daysLeft, status }) {
  return (
    <div className="expiry-card">
      <div className="expiry-card-header">
        <h3>{title}</h3>

        <span className={`expiry-status ${status?.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <p>
        <strong>Expiry Date:</strong> {expiryDate}
      </p>

      <p>
        <strong>Days Left:</strong> {daysLeft}
      </p>
    </div>
  );
}

export default ExpiryCard;