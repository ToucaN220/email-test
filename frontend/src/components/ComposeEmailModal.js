import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Box, Paper,
    IconButton, TextField, Button, InputAdornment, Typography, Fade, Tooltip
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function FloatingComposeModal({ open, onClose }) {
    const [to, setTo] = useState("");
    const [cc, setCc] = useState("");
    const [bcc, setBcc] = useState("");
    const [showCc, setShowCc] = useState(false);
    const [showBcc, setShowBcc] = useState(false);
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [aiModalOpen, setAiModalOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleAIDraft = async () => {
        setIsGenerating(true);
        const res = await fetch("/api/ai-draft", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: aiPrompt })
        });
        const data = await res.json();
        setSubject(data.subject);
        setBody(data.body);
        setIsGenerating(false);
        setAiModalOpen(false);
    };

    return (
        <>
            <Fade in={open} unmountOnExit>
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 36,
                        right: 36,
                        width: { xs: "98vw", sm: 420, md: 480 },
                        minHeight: 320,
                        maxHeight: "90vh",
                        zIndex: 1500,
                        borderRadius: "18px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 1.5px 6px #aaa",
                        bgcolor: "#fff",
                    }}
                >
                    <Paper elevation={0} sx={{
                        p: 0, borderRadius: "18px", height: "100%", display: "flex", flexDirection: "column"
                    }}>
                        {/* Header */}
                        <Box sx={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            px: 2, py: 1.2, borderBottom: "1px solid #f2f2f2"
                        }}>
                            <Typography fontWeight={600} fontSize={17}>
                                New Message
                            </Typography>
                            <IconButton size="small" onClick={onClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        {/* Content */}
                        <Box sx={{ p: 2, pt: 1.5, flex: 1, overflow: "auto" }}>
                            <TextField
                                fullWidth
                                value={to}
                                onChange={e => setTo(e.target.value)}
                                variant="outlined"
                                placeholder="To"
                                size="small"
                                sx={{
                                    mb: 1,
                                    bgcolor: "#fafbfc",
                                    borderRadius: 1.2,
                                    "& .MuiOutlinedInput-root": { fontSize: 15, pl: 1.2, pr: 1.2, py: 0.4, minHeight: 36 }
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ gap: 1 }}>
                                            {!showCc && (
                                                <Typography
                                                    variant="body2"
                                                    color="primary"
                                                    sx={{ mr: 1, cursor: "pointer", fontSize: 14 }}
                                                    onClick={() => setShowCc(true)}
                                                >
                                                    Cc
                                                </Typography>
                                            )}
                                            {!showBcc && (
                                                <Typography
                                                    variant="body2"
                                                    color="primary"
                                                    sx={{ cursor: "pointer", fontSize: 14 }}
                                                    onClick={() => setShowBcc(true)}
                                                >
                                                    Bcc
                                                </Typography>
                                            )}
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {showCc && (
                                <TextField
                                    fullWidth
                                    value={cc}
                                    onChange={e => setCc(e.target.value)}
                                    variant="outlined"
                                    placeholder="Cc"
                                    size="small"
                                    sx={{
                                        mb: 1,
                                        bgcolor: "#fafbfc",
                                        borderRadius: 1.2,
                                        "& .MuiOutlinedInput-root": { fontSize: 15, pl: 1.2, pr: 1.2, py: 0.4, minHeight: 36 }
                                    }}
                                />
                            )}
                            {showBcc && (
                                <TextField
                                    fullWidth
                                    value={bcc}
                                    onChange={e => setBcc(e.target.value)}
                                    variant="outlined"
                                    placeholder="Bcc"
                                    size="small"
                                    sx={{
                                        mb: 1,
                                        bgcolor: "#fafbfc",
                                        borderRadius: 1.2,
                                        "& .MuiOutlinedInput-root": { fontSize: 15, pl: 1.2, pr: 1.2, py: 0.4, minHeight: 36 }
                                    }}
                                />
                            )}
                            {/* SUBJECT FIELD + AI BUTTON */}
                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                <TextField
                                    fullWidth
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                    variant="outlined"
                                    placeholder="Subject"
                                    size="small"
                                    sx={{
                                        mb: 1,
                                        bgcolor: "#fafbfc",
                                        borderRadius: 1.2,
                                        "& .MuiOutlinedInput-root": { fontSize: 15, pl: 1.2, pr: 1.2, py: 0.4, minHeight: 36 }
                                    }}
                                />
                            </Box>
                            <TextField
                                fullWidth
                                value={body}
                                onChange={e => setBody(e.target.value)}
                                variant="outlined"
                                placeholder="Message"
                                multiline
                                minRows={9}
                                size="small"
                                sx={{
                                    mb: 1,
                                    bgcolor: "#fafbfc",
                                    borderRadius: 1.2,
                                    "& .MuiOutlinedInput-root": { fontSize: 15, pl: 3, pr: 1.2, py: 1.4 }
                                }}
                            />
                        </Box>
                        {/* Actions */}
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 2,
                            py: 1,
                            borderTop: "1px solid #f2f2f2",
                            justifyContent: "flex-end",
                            gap: 1
                        }}>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{ minWidth: 0, fontWeight: 500, fontSize: 15, px: 2, textTransform: "none" }}
                                onClick={() => setAiModalOpen(true)}
                            >
                                AI ✨
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                sx={{ px: 3, borderRadius: 3 }}
                            >
                                Send
                            </Button>
                        </Box>

                    </Paper>
                </Box>

            </Fade>
            {/* AI Prompt Modal */}
            <Dialog open={aiModalOpen} onClose={() => setAiModalOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Describe your email</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        fullWidth
                        value={aiPrompt}
                        onChange={e => setAiPrompt(e.target.value)}
                        placeholder="e.g. Meeting request for Tuesday"
                        label="What's the email about?"
                        disabled={isGenerating}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAiModalOpen(false)} disabled={isGenerating}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleAIDraft}
                        disabled={isGenerating || !aiPrompt}
                    >
                        {isGenerating ? "Generating..." : "Generate"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
