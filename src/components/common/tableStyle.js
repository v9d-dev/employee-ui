import { TableContainer, TableHead, TableCell } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "81vw",
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[300],
        paddingTop: '20px',
        padding: '0px 21px 66px 287px'
    },
}));
const StyledTableHead = withStyles({
    root: {
        border: '1px solid gray',
        backgroundColor: '#6f59f6',
    },
})(TableHead);
const StyledTableContainer = withStyles({
    root: {
        border: '1px solid gray',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
})(TableContainer);

const StyledTableCell = withStyles((theme) => ({
    root: {
        borderBottom: 'none',
        borderRight: '1px solid gray',
        svg: {
            cursor: 'pointer',
        },
        '& > button': {
            margin: 'auto',
        },
        '& > div': {
            margin: 'auto',
        },
    },
    head: {
        backgroundColor: '#007fff',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export {
    useStyles,
    StyledTableHead,
    StyledTableContainer,
    StyledTableCell,
}