import { Box, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export const SearchBar: React.FC = () => {
    return (
        <Box>
            <TextField
                placeholder="Explorar"
                fullWidth
                variant="outlined"
                size="small"
                InputProps={{
                    startAdornment: <MenuIcon />,
                    endAdornment: <SearchIcon />,
                    sx: {
                        gap: "1vw",
                        borderRadius: "2vw",
                        backgroundColor: "secondary.main",
                    },
                }}
            />
        </Box>
    );
};
