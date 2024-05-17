import { Box, Button, Skeleton, Typography } from "@mui/material"
import React from "react"

interface FilterButtonProps {
    active?: boolean
    content: string
    onClickFilter: () => void
    loading?: boolean
}

export const FilterButton: React.FC<FilterButtonProps> = ({ active, loading, content, onClickFilter }) => {
    return (
        <>
            {loading ? (
                <Skeleton
                    variant="rectangular"
                    sx={{
                        minWidth: "10vw",
                        width: "10vw",
                        borderRadius: "2vw",
                        paddingX: "0.5vw",
                    }}
                />
            ) : (
                <>
                    <Button
                        variant={active ? "contained" : "outlined"}
                        onClick={() => onClickFilter()}
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
            )}
        </>
    )
}
