import { useState } from "react";

function Journal() {
  const [message, setMessage] = useState("");
  const [entryText, setEntryText] = useState("");
  const [entries, setEntries] = useState(() => {
    return JSON.parse(localStorage.getItem("journalEntries")) || [];
  });
  const [expandedEntry, setExpandedEntry] = useState(null);

  const handleSave = () => {
    const newEntry = {
      id: Date.now(),
      content: entryText.trim(),
    };
    if (newEntry.content.length === 0) {
      setMessage(
        "I know you have thoughts, let them out! Don't be shy, just write whatever comes to mind.",
      );
      setTimeout(() => {
        setMessage("");
      }, 2500);
      return;
    }
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setEntryText("");
    setMessage("Entry saved successfully!");
    setTimeout(() => {
      setMessage("");
    }, 2500);
  };
  const handleDelete = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
    setMessage("Entry deleted successfully!");
    setTimeout(() => {
      setMessage("");
    }, 2500);
  };
  const handleExpand = (id) => {
    if (expandedEntry === id) {
      setExpandedEntry(null);
    } else {
      setExpandedEntry(id);
    }
  };
  return (
    <section className="page-section journal-page">
      <h2>Sleep Journal</h2>
      <p>What's on your mind today?</p>
      <textarea
        value={entryText}
        onChange={(event) => setEntryText(event.target.value)}
        placeholder="Dump all your thoughts and feelings here..."
      ></textarea>
      <button onClick={handleSave}>Save Entry</button>
      {message && message[0] === "I" && (
        <p className="message" style={{ color: "#6c802a" }}>
          {message}
        </p>
      )}
      {message && message[0] === "E" && (
        <p className="message" style={{ color: "green" }}>
          {message}
        </p>
      )}
      <br />
      <br />
      <br />
      <h3>Previous Entries</h3>
      {entries.length === 0 && (
        <p>Nothing here yet! Just thoughts, waiting to be formed...</p>
      )}
      <div className="container">
        {entries
          .slice()
          .reverse()
          .map((entry) => {
            const isExpanded = expandedEntry === entry.id;
            return (
              <div
                key={entry.id}
                className={
                  expandedEntry === entry.id
                    ? "entry-card-expanded"
                    : "entry-card"
                }
              >
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(entry.id)}
                >
                  x
                </button>
                <p>{new Date(entry.id).toLocaleDateString()}</p>
                {isExpanded ? (
                  <p>{entry.content}</p>
                ) : (
                  <p>{entry.content.slice(0, 150)}</p>
                )}
                {entry.content.length > 150 && (
                  <button
                    className="expand-btn"
                    onClick={() => handleExpand(entry.id)}
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default Journal;
