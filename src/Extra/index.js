import {useState} from "react";
import {Box, Button, TextField} from "@mui/material";

const initialPlayingField = [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
]

const makeRows = grid => {
    let result = []
    for (let i = 0; i < 9; i++) {
        let row = []
        for (let j = i * 9; j < (i + 1) * 9; j++) {
            row.push(grid[j])
        }
        result.push(row)
    }
    return result;
}

export const Extra = () => {
    const [playingField, setPlayingField] = useState([...makeRows(initialPlayingField)])

    const clearPlayingField = () => {
        setPlayingField([...makeRows(initialPlayingField)])
    }

    const setPlayingFieldCell = (x, y, value) => {
        const temp = [...playingField]
        const newValue = Number(value[value.length - 1])
        temp[x][y] = checkIsPossible(x, y, newValue, temp) ? newValue : 0
        setPlayingField([...temp])
    }

    // Getting existing digits from the row of the current position
    const getRowValues = (x, y, grid) => {
        let values = []
        for (let j = 0; j < 9; j++) {
            if (grid[x][j] !== 0 && y !== j) {
                values.push(grid[x][j])
            }
        }
        return values
    }

    // Getting existing digits from the column of the current position
    const getColValues = (x, y, grid) => {
        let values = []
        for (let i = 0; i < 9; i++) {
            if (grid[i][y] !== 0 && x !== i) {
                values.push(grid[i][y])
            }
        }
        return values
    }

    // Getting existing digits from the 3x-block of the current position
    const getBlockValues = (x, y, grid) => {
        const values = [];
        const iStart = Math.trunc(x / 3) * 3;
        const jStart = Math.trunc(y / 3) * 3;

        for (let i = iStart; i < iStart + 3; i++) {
            for (let j = jStart; j < jStart + 3; j++) {
                if (grid[i][j] !== 0 && !(x === i && y === j)) {
                    values.push(grid[i][j])
                }
            }
        }
        return values
    }

    // Check if the digit on current position is available to be put in cell
    const checkIsPossible = (x, y, value, grid) => {
        if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(value)) {
            return false
        }

        const existingValues = [
            ...new Set([
                ...getRowValues(x, y, grid),
                ...getColValues(x, y, grid),
                ...getBlockValues(x, y, grid),
            ])
        ]

        return !existingValues.includes(value)
    }

    // Filling playing field by the digits
    const resolveSudoku = (grid) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === 0) {
                    for (let variant = 1; variant <= 9; variant++) {
                        if (checkIsPossible(i, j, variant, grid)) {
                            grid[i][j] = variant
                            if (resolveSudoku(grid)) {
                                return true
                            }
                            grid[i][j] = 0
                        }
                    }
                    return false
                }
            }
        }
        return true
    }

    const executeResolving = () => {
        const grid = [...playingField]
        resolveSudoku(grid)
        setPlayingField([...grid])
    }

    return <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Box sx={{ mb: 3 }}>
            {playingField.map((row, i) =>
                <Box
                    key={`row-${i}`}
                    sx={{
                        display: 'flex'
                    }}
                >
                    {row.map((cell, j) =>
                        <Box
                            key={`cell-${i}-${j}`}
                            sx={{
                                m: 1,
                                width: 40,
                                height: 40,
                                '&:nth-child(3)': {
                                    borderRight: '3px solid black'
                                },
                                '&:nth-child(7)': {
                                    borderLeft: '3px solid black'
                                },
                                ...(i === 2 &&  { borderBottom: '3px solid black' }),
                                ...(i === 6 &&  { borderTop: '3px solid black' })
                            }}
                        >
                            <TextField
                                size={'small'}
                                id="outlined-basic"
                                variant="outlined"
                                value={cell === 0 ? '' : cell}
                                onChange={(e) => setPlayingFieldCell(i, j, e.target.value)}
                            />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: 200}}>
            <Button sx={{ width: 80 }} variant={`outlined`} onClick={clearPlayingField}>Clear</Button>
            <Button sx={{ width: 80 }} variant={`contained`} onClick={executeResolving}>Resolve</Button>
        </Box>
    </Box>
}