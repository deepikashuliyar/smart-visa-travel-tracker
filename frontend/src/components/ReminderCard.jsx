function ReminderCard({ title, description, reminderDate, type, isCompleted }) {
  return (
    <div className="reminder-card">
      <div className="reminder-card-header">
        <h3>{title}</h3>

        <span className={`reminder-type ${type?.toLowerCase()}`}>
          {type}
        </span>
      </div>

      <p>{description}</p>

      <p>
        <strong>Reminder Date:</strong> {reminderDate}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {isCompleted ? "Completed" : "Pending"}
      </p>
    </div>
  );
}

export default ReminderCard;