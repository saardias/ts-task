import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import { Pagination, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';



import HistoryListItem from "../SideBar/HistoryListItem";
import SideBar from "../SideBar/SideBar";
import Layout from "../hoc/Layout";
import AppBar from "../ui/AppBar";
import Alert from '../ui/Alert';
import { drawerWidth } from "../../constants/theme";
import TextInput from "../ui/TextInput";
import { recordSearchForResults, searchForResults } from "../../store/features/search-feature";
import { addQuery, fetchSearchHistory } from "../../store/features/serach-history";
import { ListContainer } from "../common/StyledComponents";
import LinkCard from "../ui/LinkCard";

const MainContainer = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const limit = 10;

const HomePage = () => {
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);
    const searchHistory = useSelector(state => state.searchHistory);
    const [open, setOpen] = useState(true);
    const [showError, setShowError] = useState(false);
    const [showEmptyMessage, setShowEmptyMessage] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        dispatch(fetchSearchHistory())
    }, [])

    const onSubmitSearch = () => {
        fetchSearchResults(searchText, 1);
    };

    const fetchSearchResults = (text, page) => {
        dispatch(recordSearchForResults(text, page, limit)).then((data) => {
            if (data.payload.error) {
                setShowError(true);
                return;
            }
            setShowEmptyMessage(data.payload.results.length === 0);
            dispatch(addQuery({
                id: text + new Date().getMilliseconds(),
                query: text
            }))
        })
    }

    const handleErrorClose = (event, reason) => {
        setShowError(false);
    };

    const fetchResultsOnly = (text, page = 1, limit) => {
        dispatch(searchForResults(text, page, limit)).then((data) => {
            if (data.payload.error) {
                setShowError(true);
                return;
            }
            setShowEmptyMessage(page === 1 && data.payload.results.length === 0);

        })
    }

    const onPageClicked = (event, value) => {
        fetchResultsOnly(search.currentQuery, value, limit);
    }

    const onHistoryItemClick = (text) => {
        setSearchText(text);
        fetchResultsOnly(text, 1, limit);
    }

    return (
        <Layout>
            <AppBar
                title={'Search'}
                open={open}
                setOpen={setOpen} />

            <SideBar
                open={open}
                setOpen={setOpen}
                title={'History'}>
                <List component="nav" style={{ width: '100%', paddingTop: 0 }}>
                    {searchHistory?.history.map((item) =>
                        <HistoryListItem
                            key={item.id}
                            text={item.query}
                            onClick={() => {
                                onHistoryItemClick(item.query)
                            }}
                        />)}
                </List>
            </SideBar>

            <MainContainer open={open}>
                <ListContainer >
                    <TextInput
                        label={'Search here'}
                        value={searchText}
                        setValue={setSearchText}
                        onSubmit={onSubmitSearch} />
                    {
                        search.loading ?
                            <CircularProgress
                                style={{ marginTop: '20px' }} />

                            : null
                    }
                    <List style={{ overflow: 'scroll', padding: '10px 20px' }}>
                        {
                            showEmptyMessage ?
                                <Typography>No Results found</Typography>
                                : null
                        }
                        {search?.results.map((result) =>
                            <LinkCard
                                key={result.url}
                                link={result.url}
                                text={result.title}
                                query={search.currentQuery} />
                        )}
                    </List>
                    {
                        Math.ceil(search.metadata.total / limit) === 0 ? null :
                            <Pagination
                                page={search.metadata.page}
                                onChange={onPageClicked}
                                count={Math.ceil(search.metadata.total / limit)}
                                variant='outlined' />
                    }
                </ListContainer>
                <Snackbar open={showError} autoHideDuration={3000} onClose={handleErrorClose}>
                    <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                        {search.error?.message}
                    </Alert>
                </Snackbar>
            </MainContainer>
        </Layout >
    );
};

export default HomePage;
