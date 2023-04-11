import { proofsAPI } from "../../api/proofsAPI";

const SET_TALENT_PROOFS = "talentProofs/SET-TALENT-PROOFS";
const SET_TOTAL_PAGES = "talentProofs/SET-TOTAL-PAGES";
const DELETE_TALENT_PROOF = "talentProofs/DELETE-TALENT-PROOF";
const SET_STATUS = "talentProofs/SET-STATUS";
const SET_IS_LOADING = "talentProofs/SET-IS-LOADING";
const EDIT_PROOF = "talentProofs/EDIT-PROOF";

const initialState = {
    talentProofs: [],
    totalPages: 1,
    status: "PUBLISHED",
    isLoading: false
};

const talentProofsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TALENT_PROOFS:
        case SET_TOTAL_PAGES:
        case SET_STATUS:
        case SET_IS_LOADING:
            return {
                ...state,
                ...action.payload
            };
        case DELETE_TALENT_PROOF:
            const updatedProofs = state.talentProofs.filter(
                proof => proof.id !== action.payload.proofId
            );
            return {
                ...state,
                talentProofs: updatedProofs
            };
        case EDIT_PROOF:
            const newTalentProofs = [];

            state.talentProofs.forEach(proof => {
                if (action.proof.id === proof.id) {
                    if (action.proof.status === proof.status || state.status === "ALL") {
                        newTalentProofs.push(action.proof);
                    }
                } else {
                    newTalentProofs.push(proof);
                }
            })

            return {
                ...state,
                talentProofs: newTalentProofs
            };
        default:
            return state;
    }
};

export const setTalentProofs = talentProofs => ({
    type: SET_TALENT_PROOFS,
    payload: { talentProofs }
});
export const deleteTalentProof = proofId => ({
    type: DELETE_TALENT_PROOF,
    payload: { proofId }
});
const setTotalPages = totalPages => ({
    type: SET_TOTAL_PAGES,
    payload: { totalPages }
});
export const setStatus = status => ({
    type: SET_STATUS,
    payload: { status }
});
const setIsLoading = isLoading => ({
    type: SET_IS_LOADING,
    payload: { isLoading }
});
const editProof = proof => ({
    type: EDIT_PROOF,
    proof
});

export const addTalentProofThunk = data => async (dispatch, getState) => {
    const id = getState().auth.id;
    const token = getState().auth.token;
    const status = getState().talentProofs.status;

    try {
        await proofsAPI.addProof(id, token, data);
        if (data.status === status || status === "ALL") {
            const response = await proofsAPI.getTalentProofs(
                token,
                id,
                "date",
                data.status,
                "desc",
                0,
                1
            );
            dispatch(
                setTalentProofs([
                    ...response.proofs,
                    ...getState().talentProofs.talentProofs
                ])
            );
        }
    } catch (err) {
        console.log(err);
    }
};

export const getTalentProofsThunk =
    (id, sort, status, type, page, amount, clear) =>
    async (dispatch, getState) => {
        const token = getState().auth.token;

        try {
            dispatch(setIsLoading(true));
            const response = await proofsAPI.getTalentProofs(
                token,
                id,
                sort,
                status,
                type,
                page,
                amount
            );
            dispatch(setTotalPages(Math.ceil(response.totalAmount / amount)));
            if (clear) {
                dispatch(setTalentProofs([...response.proofs]));
            } else {
                dispatch(
                    setTalentProofs([
                        ...getState().talentProofs.talentProofs,
                        ...response.proofs
                    ])
                );
            }
            dispatch(setIsLoading(false));
        } catch (err) {
            console.log(err);
        }
    };

export const deleteTalentProofThunk = proofId => async (dispatch, getState) => {
    const talentId = getState().auth.id;
    const token = getState().auth.token;

    try {
        await proofsAPI.deleteProof(talentId, proofId, token);
        dispatch(deleteTalentProof(proofId));
    } catch (err) {
        console.log(err);
    }
};

export const editProofThunk = (proofId, data) => async (dispatch, getState) => {
    const token = getState().auth.token;
    const talentId = getState().auth.id;
    try {
        const response = await proofsAPI.editProof(talentId, proofId, data, token);
        dispatch(editProof(response));
    } catch (err) {
        console.log(err);
    }
};

export default talentProofsReducer;