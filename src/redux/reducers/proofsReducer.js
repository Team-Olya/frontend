import { proofsAPI } from "../../api/proofsAPI";

const SET_TALENT_PROOFS = "proofs/SET-TALENT-PROOFS";
const SET_TOTAL_TALENT_PAGES = "proofs/SET-TOTAL-TALENT-PAGES";
const INCREMENT_TALENT_CURRENT_PAGE = "proofs/INCREMENT-TALENT-CURRENT-PAGE";
const CLEAR_TALENT_CURRENT_PAGE = "proofs/CLEAR-TALENT-CURRENT-PAGE";
const DELETE_TALENT_PROOF = "proofs/DELETE-TALENT-PROOF"

const initialState = {
    talentProofs: [],
    totalTalentPages: 1,
    talentCurrentPage: 0
};

const proofsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_TALENT_PROOFS:
        case SET_TOTAL_TALENT_PAGES:
            return {
                ...state,
                ...action.payload
            };
        case INCREMENT_TALENT_CURRENT_PAGE:
            return {
                ...state,
                talentCurrentPage: state.talentCurrentPage + 1
            };
        case CLEAR_TALENT_CURRENT_PAGE:
            return {
                ...state,
                talentCurrentPage: 0
            }
        case DELETE_TALENT_PROOF:
            const updatedProofs = state.talentProofs.filter(proof => proof.id !== action.payload.proofId);
            return {
                ...state,
                talentProofs: updatedProofs
            }
        default:
            return state;
    }
};

export const setTalentProofs = talentProofs => ({ type: SET_TALENT_PROOFS, payload: { talentProofs } });
export const incrementTalentCurrentPage = () => ({ type: INCREMENT_TALENT_CURRENT_PAGE });
export const clearTalentCurrentPage = () => ({ type: CLEAR_TALENT_CURRENT_PAGE  });
export const deleteTalentProof = proofId => ({ type: DELETE_TALENT_PROOF, payload: { proofId } });

const setTotalTalentPages = totalTalentPages => ({ type: SET_TOTAL_TALENT_PAGES, payload: { totalTalentPages } });

export const addTalentProofThunk = data => async (dispatch, getState) => {
    const id = getState().auth.id;
    const token = getState().auth.token;

    try {
        await proofsAPI.addProof(id, token, data);
    } catch (err) {
        console.log(err);
    }
};

export const getTalentProofsThunk = (id, sort, status, type, page, amount, renew = false) => async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
        const response = await proofsAPI.getTalentProofs(token, id, sort, status, type, page, amount);
        if (renew) {
            dispatch(setTalentProofs([...response.proofs, ...getState().proofs.talentProofs]));
        } else {
            dispatch(setTotalTalentPages(Math.ceil(response.totalAmount / amount)));
            dispatch(setTalentProofs([...getState().proofs.talentProofs, ...response.proofs]));
        }
    } catch (err) {
        console.log(err);
    }
};

export const deleteTalentProofThunk = (proofId)  => async (dispatch, getState) => {
    const talentId = getState().auth.talentId;
    const token = getState().auth.token;

    try{
        // await proofsAPI.deleteProof(talentId, proofId, token);
        dispatch(deleteTalentProof(proofId));
    } catch (err){
        console.log(err);
    }
}

export default proofsReducer;