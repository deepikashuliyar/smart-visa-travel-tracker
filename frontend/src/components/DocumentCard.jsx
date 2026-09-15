function DocumentCard({ title, type, expiryDate, status }) {
  return (
    <div className="document-card">
      <div className="document-card-header">
        <h3>{title}</h3>
        <span className={`document-status ${status?.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <p>
        <strong>Type:</strong> {type}
      </p>

      <p>
        <strong>Expiry Date:</strong> {expiryDate}
      </p>
    </div>
  );
}

export default DocumentCard;