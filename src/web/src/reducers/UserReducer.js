import { ACTION_TYPES } from "../actions/UserActions";

const initialState = {
	token:''
};

export const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.TOKEN:
			return{
                ...state,
				token:action.payload.access_token
            }
        case ACTION_TYPES.CLEAR:
            return{
                ...state,
                token:initialState.token,
            }
		default:
			return state;
	}
};
