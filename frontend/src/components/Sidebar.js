import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

export default function Sidebar({ emails, selectedId, onSelect }) {
  return (
    <Box
      sx={{
        width: 320,
        background: "#fff",
        borderRight: "1px solid #eee",
        overflowY: "auto",
      }}
    >
      <Typography variant="h6" sx={{ p: 2, fontWeight: 600 }}>
        Inbox
      </Typography>
      <Divider />
      <List>
        {emails.map((email) => (
          <ListItem
            button
            key={email.id}
            selected={selectedId === email.id}
            onClick={() => onSelect(email.id)}
            alignItems="flex-start"
            sx={{
              py: 2,
              px: 2.5,
              borderBottom: "1px solid #f5f5f7",
              "&.Mui-selected": {
                background: "#eaf2ff",
                fontWeight: 600,
              },
              "&:hover": {
                background: "#f5f7fa",
              },
              transition: "background 0.2s",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 17,
                  mb: 0.5,
                  color: "#222",
                  maxWidth: 220,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {email.subject}
              </Typography>
              <Typography
                sx={{
                  color: "#888",
                  fontSize: 14,
                  lineHeight: 1.3,
                  maxWidth: 220,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  mb: 0.5,
                }}
              >
                {email.body ? email.body.replace(/\n/g, " ").slice(0, 50) : ""}
              </Typography>
              <Typography
                sx={{
                  color: "#b0b0b0",
                  fontSize: 13,
                  lineHeight: 1.1,
                  maxWidth: 220,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {email.to || "Unknown"}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
