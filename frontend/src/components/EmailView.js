import React from "react";
import { Box, Typography, Divider } from "@mui/material";

export default function EmailView({ email }) {
  if (!email) return (
    <Box sx={{ p: 4 }}>
      <Typography>Select an email to view.</Typography>
    </Box>
  );
  return (
    <Box sx={{
      flex: 1,
      p: 4,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      background: "#fff",
    }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
        {email.subject}
      </Typography>
      <Typography sx={{ color: "#888", mb: 2 }}>
        From: {email.from}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography>
        {email.body}
      </Typography>
    </Box>
  );
}
