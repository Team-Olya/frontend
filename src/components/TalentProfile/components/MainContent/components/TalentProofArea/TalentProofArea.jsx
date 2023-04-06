import { Box, Button, Grid, LinearProgress } from "@mui/material";
import { TalentProof } from "./components/TalentProof";
import { useEffect, useState } from "react";
import { CreateProofForm } from "../../../../../Forms/CreateProofForm/CreateProofForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getTalentProofsThunk, incrementTalentCurrentPage, setTalentProofs, clearTalentCurrentPage } from "../../../../../../redux/reducers/proofsReducer";
import InfiniteScroll from "react-infinite-scroll-component";

function TalentProofArea() {
	const id = useSelector(store => store.auth.id);
	const proofs = useSelector(store => store.proofs.talentProofs);
	const totalPages = useSelector(store => store.proofs.totalTalentPages);
	const [currentPage, setCurrentPage] = useState(0);

	const dispatch = useDispatch();
	const { talentId } = useParams();
	const location = useLocation();

	const fetchMoreData = () => {
		dispatch(getTalentProofsThunk(talentId, "date", (talentId === id ? "ALL": "PUBLISHED"), "desc", currentPage, 5));
		setCurrentPage(prev => prev + 1);
	};
	
	useEffect(() => {
		dispatch(setTalentProofs([]));
		setCurrentPage(prev => 0);
		fetchMoreData();
		console.log("DONE");
	}, [location]);

	if (!proofs) {
		return <LinearProgress />;
	}

	return (
		<>
			<Box mt={2}>
				{id === Number(talentId) ? <CreateProofForm /> : null}
				<InfiniteScroll
					dataLength={proofs.length}
					next={fetchMoreData}
					hasMore={totalPages - 1 >= currentPage}
					loader={<h1>loading...</h1>}
					endMessage={<h1>You ve reached the end</h1>}
				>
					{proofs.map((element) => {
						return (
							<Grid item key={element.id}>
								<TalentProof {...element} />
							</Grid>
						);
					})}
				</InfiniteScroll>
			</Box>
		</>
	);
}

export { TalentProofArea };
