import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import CustomButton from '../../common/customButton';
import { Container, Typography, Table, TableBody, TableRow, TablePagination, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../../../src/global.css';
import PreviewIcon from '@mui/icons-material/Preview';
import Filter from '../../Layout/FilterSearchBar/Filter';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { updateName, updateTechStack } from '../../store/pocFilter';
import { getApiUrl } from '../../common/helper';
import FormDialog from '../../common/formDialog';
import { useStyles, StyledTableHead, StyledTableContainer, StyledTableCell } from "../../common/tableStyle";

export default function POC(props) {
	const [page, setPage] = useState(0);
	const [rowPerPage, setRowPerPage] = useState(15);
	const [rows, setRows] = useState([]);
	const [flag, setFlag] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [csvFile, setCsvFile] = useState([]);
	const classes = useStyles();
	const dispatch = useDispatch();
	const filterData = useSelector((state) => state.pocFilterReducer);
	const employeeDetail = useSelector((state) => state.employeeReducer);

	const onChangePage = (event, newPage) => {
		setPage(newPage);
	};

	useEffect(() => {
		loadUsers();
	}, [filterData, props.authCtx]);

	// useEffect(() => {
	// 	if (csvFile.length > 0) {
	// 		loadUsers();
	// 	}
	// }, [csvFile]);

	const loadUsers = async () => {
		const url =
			employeeDetail.roles === 'EMPLOYEE'
				? `poc/employee/${props.authCtx.employeeID}`
				: 'poc';

		const result = await axios.get(`http://localhost:4000/${url}`, {
			params: {
				username: props.authCtx.employeeID,
				password: props.authCtx.token,
				filters: {
					...filterData,
				},
			},
		});

		setRows(result.data);
	};

	const deleteUser = async (id) => {
		await axios.delete(`http://localhost:4000/poc/${id}`, {
			params: {
				username: props.authCtx.employeeID,
				password: props.authCtx.token,
			},
		});
		loadUsers();
		// window.location.reload();
	};

	const onChangeRowsPerPage = (event) => {
		setRowPerPage(event.target.value);
	};
	const history = useHistory();
	const navigateTo = () => history.push('/POC/Add');

	const importCsvData = () => {
		const apiUrl = getApiUrl();
		let formData = new FormData();
		formData.append('file', csvFile);
		console.log({ apiUrl });
		axios
			.post(`http://localhost:4000/poc/importpoc`, formData, {
				params: {
					username: props.authCtx.employeeID,
					password: props.authCtx.token,
				},
			})
			.then((res) => {
				loadUsers();
				setCsvFile([]);
				setOpenDialog(false);
			})
			.catch((err) => {
				setOpenDialog(false);
			});
	};

	const dialogHandler = (isOpen) => {
		setOpenDialog(isOpen);
		if (!isOpen) {
			setCsvFile([]);
		}
	};

	const onFileChange = (event) => {
		//console.log({ eventData: event.target.files[0] });
		setCsvFile(event.target.files[0]);
	};

	const getCsvReport = function () {
		const resData = rows.map((row) => ({
			name: row.name,
			techStack: row.techStack,
			description: row.description,
			startDate: row.startDate,
			finishDate: row.finishDate,
			githubUrl: row.githubUrl,
			demoUrl: row.demoUrl,
			employeeId: row.employeeId,
		}));

		const download = function (resData) {
			const blob = new Blob([resData], { type: 'text/csv' });
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.setAttribute('hidden', '');
			a.setAttribute('href', url);
			a.setAttribute('download', 'poc.csv');
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		};

		const objectToCsv = function (resData) {
			console.log('ssssssssssssssssss resData', resData);
			const csvRows = [];
			const headers = Object.keys(resData[0]);
			csvRows.push(headers.join(','));

			for (const row of resData) {
				const values = headers.map((header) => {
					//Dont remove this commented line----
					// const escaped= (''+row[header]).replace(/"/g,'\\"');
					// return `"${escaped}"`;
					return row[header];
				});
				csvRows.push(values.join(','));
			}
			return csvRows.join('\n');
		};
		const csvData = objectToCsv(resData);
		download(csvData);
	};

	const filterHandler = (type, filterValue) => {
		if (type === 'name') {
			dispatch(updateName({ name: filterValue }));
			setFlag(!flag);
		}
		if (type === 'techStack') {
			dispatch(updateTechStack({ techStack: filterValue }));
			setFlag(!flag);
		}
	};

	return (
		<>
			<FormDialog
				dialogHandler={dialogHandler}
				openDialog={openDialog}
				heading='Import POC data'
				dialogInfo='Select CSV file to import data'
				handleOnImport={importCsvData}
				onFileChange={onFileChange}
			/>
			<Stack spacing={2} direction='row'>
				<Typography variant='h4' style={{ marginRight: '60rem', color: '#5B5d5F' }}>
					POC List Table
				</Typography>
				<CustomButton onClick={navigateTo}>ADD POC</CustomButton>
				<CustomButton onClick={() => dialogHandler(true)}>IMPORT</CustomButton>
				<CustomButton onClick={getCsvReport}>EXPORT</CustomButton>
			</Stack>
			<paper>
				<Container className={classes.root}>
					{employeeDetail.roles !== 'EMPLOYEE' && (
						<Typography style={{ display: 'flex' }}>
							<Filter filterName='Name' type='name' filterData={filterHandler} />
							<Filter
								filterName='TechStack'
								type='techStack'
								filterData={filterHandler}
							/>
						</Typography>
					)}
					<StyledTableContainer>
						<div className='main_table'>
							<Table>
								<StyledTableHead>
									<TableRow>
										<StyledTableCell>Name</StyledTableCell>
										<StyledTableCell>Tech Stack</StyledTableCell>
										<StyledTableCell>Description</StyledTableCell>
										<StyledTableCell>Start Date</StyledTableCell>
										<StyledTableCell>Finsih Date</StyledTableCell>
										<StyledTableCell>Github URL</StyledTableCell>
										<StyledTableCell>Demo URL</StyledTableCell>
										{/* <StyledTableCell>Employee ID</StyledTableCell> */}
										<StyledTableCell>Actions</StyledTableCell>
									</TableRow>
								</StyledTableHead>
								<TableBody>
									{rows
										.slice(page * rowPerPage, page * rowPerPage + rowPerPage)
										.map((user) => (
											<TableRow key={rows.name}>
												<StyledTableCell>{user.name}</StyledTableCell>
												<StyledTableCell>
													{user.techStack.toString().replace(',', ', ')}
												</StyledTableCell>
												<StyledTableCell>
													{user.description}
												</StyledTableCell>
												<StyledTableCell>
													<Moment format='DD/MM/YYYY'>
														{user.startDate}
													</Moment>
												</StyledTableCell>
												<StyledTableCell>
													<Moment format='DD/MM/YYYY'>
														{user.finishDate}
													</Moment>
												</StyledTableCell>
												<StyledTableCell>{user.githubUrl}</StyledTableCell>
												<StyledTableCell>{user.demoUrl}</StyledTableCell>
												{/* <StyledTableCell>
													{user.employee_id}
												</StyledTableCell> */}
												<StyledTableCell>
													<Link
														class='btn btn-primary mr-2'
														to={`/POC/view/${user.id}`}
													>
														<PreviewIcon color='action' />
													</Link>
													<Link
														class='btn btn-outline-primary mr-2'
														to={`/POC/edit/${user.id}`}
													>
														<EditIcon color='action' />
													</Link>

													<Link
														onClick={() => deleteUser(user.id)}
														to='#'
													>
														<DeleteIcon color='action' />
													</Link>
												</StyledTableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</div>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 15, 20, 25]}
								count={rows.length}
								rowsPerPage={rowPerPage}
								page={page}
								onChangePage={onChangePage}
								onChangeRowsPerPage={onChangeRowsPerPage}
							/>
						</TableRow>
					</StyledTableContainer>
				</Container>
			</paper>
		</>
	);
}
