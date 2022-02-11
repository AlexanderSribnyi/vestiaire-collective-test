import {useEffect, useState} from 'react';
import {Avatar, Box, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import data from '../products.json'
import {developmentConditions} from '../constants';
import {getTimeFromDateToNow} from "../helpers";


export const Development = () => {
    const [conditionIndex, setConditionIndex] = useState(0)
    const [resultList, setResultList] = useState(data.products)

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'brand',
            headerName: 'Brand',
        },
        {
            field: 'seller',
            headerName: 'Seller',
            flex: 1,
            renderCell: (params) => <Box>
                {`${params.value.name} (${params.value.country})`}
            </Box>
        },
        {
            field: 'price',
            headerName: 'Price',
            renderCell: (params) => <Box>
                {params.value.price}
            </Box>
        },
        {
            field: 'deposited_on',
            description: 'We want to display how many days/month/year since each products has been deposited on the website',
            headerName: 'Deposited',
            flex: 1,
            renderCell: (params) => <Box>
                {getTimeFromDateToNow(params.value)}
            </Box>
        },
        {
            field: 'shippable_countries',
            headerName: 'Shippable in',
            flex: 1,
            renderCell: (params) => <Box>
                {params.value.toString().replace(/,/g, ", ")}
            </Box>
        },
    ]

    const handleConditionIndexChange = (event, newValue) => {
        setConditionIndex(newValue);
    };

    useEffect(() => {
        let result = data.products;
        const condition = developmentConditions[conditionIndex];
        if (condition.condition) {
            result = result.filter(condition.condition)
        }
        if (condition.mutate) {
            result = result.map(condition.mutate)
        }
        if (condition.order) {
            result = result.sort(condition.order)
        }
        setResultList(result)
    }, [conditionIndex])

    return <Box sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }}>
        <Box sx={{
            display: 'flex',
            mt: 3
        }}>
            {developmentConditions.map((item, index) =>
                <Avatar
                    key={`condition-${index}`}
                    sx={{
                        backgroundColor: conditionIndex === index ? 'primary.light' : 'gray.light',
                        mr: 1,
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: conditionIndex === index ? 'primary.light' : 'gray',
                        },
                    }}
                    onClick={e => handleConditionIndexChange(e, index)}
                >
                    { index + 1 }
                </Avatar>
            )}
        </Box>
        <Typography sx={{ my: 2 }}>{developmentConditions[conditionIndex].description}</Typography>
        <Box sx={{
            flex: 1
        }}>
            <Box sx={{
                height: '100%'
            }}>
                <DataGrid
                    hideFooter
                    hideFooterPagination
                    disableColumnMenu
                    columnBuffer={0}
                    rows={resultList}
                    columns={columns}
                />
            </Box>
        </Box>
    </Box>
}