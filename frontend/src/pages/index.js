import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import EmailView from "../components/EmailView";
import ComposeEmailModal from "../components/ComposeEmailModal";
import { Box, Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
  const [emails, setEmails] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [openCompose, setOpenCompose] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  useEffect(() => {
    fetch("/api/emails")
      .then(res => res.json())
      .then(data => {
        setEmails(data);
        setSelectedId(data[0]?.id);
      });
  }, []);

  const selectedEmail = emails.find(email => email.id === selectedId);

  // Add the email to list on send (simulate DB save)
  const handleSend = (newEmail) => {
    setEmails(emails => [
      {
        id: emails.length + 1,
        from: "me@example.com",
        subject: newEmail.subject,
        snippet: newEmail.body.slice(0, 50),
        body: newEmail.body,
        to: newEmail.to,
        cc: newEmail.cc,
        bcc: newEmail.bcc,
      },
      ...emails,
    ]);
    setSelectedId(emails.length + 1);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", background: "#f5f6fa", position: "relative" }}>
      <Sidebar emails={emails} selectedId={selectedId} onSelect={setSelectedId} />
      <EmailView email={selectedEmail} />

      {/* Compose Button - only show if modal is NOT open */}
      {!isComposeOpen && (
        <Fab
          color="primary"
          aria-label="compose"
          sx={{
            position: "fixed",
            bottom: 36, 
            right: 36,
            zIndex: 1200
          }}
          onClick={() => setIsComposeOpen(true)}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Floating Compose Modal */}
      <ComposeEmailModal
        open={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
      onSend={() => setIsComposeOpen(false)} 
      />
    </Box>
  );
}
