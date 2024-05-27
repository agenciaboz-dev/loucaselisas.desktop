import { Box, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react"

interface ISearchBar {
    handleSearch: (value: string) => void
}

export const SearchBar: React.FC<ISearchBar> = ({ handleSearch }) => {
    const [searchValue, setSearchValue] = useState("")

    const onChange = (value: string) => {
        setSearchValue(value)
        handleSearch(value)
    }

    return (
        <Box>
            <TextField
                placeholder="Explorar"
                fullWidth
                variant="outlined"
                size="small"
                value={searchValue}
                onChange={(e) => onChange(e.target.value)}
                InputProps={{
                    startAdornment: <MenuIcon />,
                    endAdornment: <SearchIcon />,
                    sx: {
                        gap: "1vw",
                        borderRadius: "2vw",
                        backgroundColor: "secondary.main",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "transparent",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#88827C",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#88827C",
                        },
                    },
                }}
            />
        </Box>
    )
}
