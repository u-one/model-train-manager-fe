import { GetServerSideProps } from "next";

import { styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { Product } from "../../../types/Product";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

type Props = {
    products: Product[]
}

const toChips = (tags: string) => {
    const tagArray = tags.split(",")
    return (
    <Stack direction="row" spacing={1}>
        {tagArray.map((tag) => (
            <Chip key={tag} label={tag} />
        ))}
    </Stack>
    )
}

const Product = (props: Props) => {
    const product = props.products[0]

    const rows = [
        {name: "メーカー", value: product.maker},
        {name: "品番", value: product.productCode},
        {name: "商品種別", value: product.productType},
        {name: "商品名", value: product.name},
        {name: "定価", value: product.price},
        {name: "JAN", value: product.jan},
        {name: "発売日", value: product.releaseDate},
        {name: "タグ", value: toChips(product.tags)},
        {name: "アイコン", value: product.icon},
    ]

    return (
        <div>
            <h1>Product</h1>
            <TableContainer sx={{maxWidth:650}} component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <StyledTableCell align="right">{row.name}</StyledTableCell>
                                <TableCell align="left">{row.value}</TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>

            </TableContainer>

            <Card sx={{maxWidth:650}}>
                <CardContent>
                    {product.detail}
                </CardContent>
            </Card>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async(context) => {
    const maker = context.query.maker
    const productCode = context.query.id
    
    const response = await fetch(`${process.env.API_ENDPOINT}/product/${maker}/${productCode}`)

    const props: Props = {
        products: await response.json(),
    }

    return {
        props: props,
    }
}

export default Product;
