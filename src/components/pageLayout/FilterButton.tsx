import { Box, Button, Typography } from "@mui/material"
import React from "react"

interface FilterButtonProps {
    active?: boolean
    content: string
    onClickCategory: () => void
}

export const FilterButton: React.FC<FilterButtonProps> = ({ active, content, onClickCategory }) => {
    return (
        <>
            <Button
                variant={active ? "contained" : "outlined"}
                onClick={() => onClickCategory()}
                sx={{
                    minWidth: "10vw",
                    width: "10vw",
                    borderRadius: "2vw",
                    paddingX: "0.5vw",
                }}
            >
                <Box
                    sx={{
                        justifyContent: "center",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: "8vw",
                    }}
                >
                    {content}
                </Box>
            </Button>
        </>
    )
}
