import Header from "./components/Header";

import initialEmails from "./data/emails";

import "./App.css";
import { useState } from "react";

type Email = {
  id: number,
  sender: string,
  title: string,
  starred: boolean,
  read:boolean,
}

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)

  function toggleRead(email: Email) {
    const emailsCopy: Email[] = structuredClone(emails)
    const match = emailsCopy.find(target => target.id === email.id)!

    match.read = !match.read
    setEmails(emailsCopy)
  }

  function toggleStarred(email: Email) {
    const emailsCopy: Email[] = structuredClone(emails)
    const match = emailsCopy.find(target => target.id === email.id)!
    match.starred = !match.starred
    setEmails(emailsCopy)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => setEmails((email) =>initialEmails)}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            onClick={() => setEmails((email) =>initialEmails)}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
            onChange={()=> {}}
            />
          </li>
        </ul>
      </nav>
      <main className={"emails"}>
        {emails.map(email => (
          <div className={email.read ? 'email read' : 'email unread'}>
            <input className="read-checkbox"
              type='checkbox'
              checked={email.read}
              onClick={() => {
                toggleRead(email)
              }}
            />
            <input className="star-checkbox"
              type='checkbox'
              checked={email.starred}
              onClick={() => { toggleStarred(email) }}/>
            <span>{email.sender}</span>
            <span className="title">{email.title}</span>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;