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

import { TrainModel } from "../../types/TrainModel";


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
    item: TrainModel
}

const toChips = (tags: string) => {
    if (tags == null) {
        return null
    }
    const tagArray = tags.split(",")
    return (
    <Stack direction="row" spacing={1}>
        {tagArray.map((tag) => (
            <Chip key={tag} label={tag} />
        ))}
    </Stack>
    )
}

const InventoryItem = (props: Props) => {
    const item = props.item

    const rows = [
        {name: "メーカー", value: item.maker},
        {name: "分類", value: item.category},
        {name: "系統", value: item.series},
        {name: "名称", value: item.name},
        {name: "購入価格(税抜)", value: item.obtainedPrice},
        {name: "購入価格(税込)", value: item.obtainedPriceWithTax},
        {name: "取得場所", value: item.obtainedPlace},
        {name: "取得日", value: item.obtainedDate},
        {name: "取得タイプ", value: item.obtainedType},
        {name: "管理ID", value: item.manageId},
        {name: "商品種別", value: item.productType},
        {name: "商品名", value: item.productName},
        {name: "定価", value: item.price},
        {name: "JAN", value: item.jan},
        {name: "タグ", value: toChips(item.tags)},
    ]

    return (
        <div>
            <h1>Item</h1>
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
                    {item.comment}
                </CardContent>
            </Card>

            <TableContainer sx={{maxWidth:650}} component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableBody>
                        {item.images.map((image) => (
                            <TableRow key={image.id}>
                                <TableCell align="left">
                                    <img src={image.url} width="300px" />
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async(context) => {
    const itemId = context.query.Id
    
    const response = await fetch(`${process.env.API_ENDPOINT}/inventory/${itemId}`)

    console.log(response)

    const props: Props = {
        item: await response.json(),
    }

    return {
        props: props,
    }
}

export default InventoryItem;
