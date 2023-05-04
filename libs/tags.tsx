import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { blue,lightGreen,deepOrange,lightBlue,indigo,lime } from '@mui/material/colors';



export const toTagChips = (tags: string) => {
    const tagArray = tags.split(",")
    return (
    <Stack sx={{maxWidth:100}} direction="row" spacing={1}>
        {
            tagArray
                .filter((tag) => (tag.length != 0))
                .map((tag) => (
                    <Chip label={tag} />
                ))
        }
    </Stack>
    )
}

const tagToColor = (tag: string) => {
    switch (tag) {
        case "新幹線":
            return "default"
        case "在来線":
            return "default"
        case "気動車":
            return "default"
        case "客車":
            return "default"
        case "貨物":
            return "default"
        case "機関車":
            return "default"
        case "私鉄":
            return "default"
        default:
            return "default"

    }
}