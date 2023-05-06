import { useState, useEffect } from "react"
import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Link from 'next/link'


import { Product } from "../types/Product";
import { modelTrainApi } from "../libs/webapiClient";

import { toTagChips } from "@/libs/tags";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


type ProductsResponse = Product[]

const Products = () => {
    const [products, setProducts] = useState<ProductsResponse>()

    useEffect(() => {
        modelTrainApi.get<ProductsResponse>("/products").then((response) => {
            setProducts(response.data)
        }).catch((error) => {
            console.error("Request URL: ", error.config.url);
            console.error("Error: ", error);
        });
    }, [])

    return (
        <div>
            <h1>Products</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">メーカー</StyledTableCell>
                            <StyledTableCell align="right">品番</StyledTableCell>
                            <StyledTableCell align="right">商品種別</StyledTableCell>
                            <StyledTableCell align="right">商品名</StyledTableCell>
                            <StyledTableCell align="right">定価</StyledTableCell>
                            <StyledTableCell align="right">JAN</StyledTableCell>
                            <StyledTableCell align="right">発売日</StyledTableCell>
                            <StyledTableCell align="right">タグ</StyledTableCell>
                            <StyledTableCell align="right">アイコン</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.filter((product) => (product.productType!=3)).map((product) => (
                            <StyledTableRow key={product.productCode}>
                                <TableCell align="right">{product.maker}</TableCell>
                                <TableCell align="right">{product.productCode}</TableCell>
                                <TableCell align="right">{product.productType}</TableCell>
                                <TableCell align="right">{product.name}</TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell align="right">{product.jan}</TableCell>
                                <TableCell align="right">{product.releaseDate}</TableCell>
                                <TableCell align="right">{toTagChips(product.tags)}</TableCell>
                                <TableCell align="right">{product.icon}</TableCell>
                                <TableCell align="right">
                                    <Link href={`/product/${product.maker}/${product.productCode}`}>詳細</Link>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>

            </TableContainer>

        </div>
    );
};

export default Products;
