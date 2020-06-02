import { ACTION_TYPES } from "../actions/CatalogActions";

const initialState = {
	list: [],
	page: 0,
	totalCount: 0,
};

export const CatalogReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPES.FETCH_ALL:
        case ACTION_TYPES.FETCH_BY_PAGE:
		case ACTION_TYPES.ORDERED_FETCH:
		case ACTION_TYPES.ENHANCED_FETCH:
            console.log('22222')
            console.log(action)
			return {
				...state,
				list: action.payload.data,
				page: action.payload.pageIndex,
				totalCount: action.payload.count,
			};
		case ACTION_TYPES.FETCH_BY_ID:
			return{
				item:action.payload
			}
		case ACTION_TYPES.CREATE:
			return {
				...state,
				list: [...action.payload],
			};
		case ACTION_TYPES.UPDATE:
			return {
				...state,
				list: state.list.map((x) =>
					x.id === action.payload.id ? action.payload : x
				),
			};
		case ACTION_TYPES.DELETE:
			return {
				...state,
				list: state.list.filter((x) => x.id !== action.payload),
			};

		default:
			return state;
	}
};
