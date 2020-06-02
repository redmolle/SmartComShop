export const columns = [
	{
		field: "id",
		label: "ID",
		isVisible: false,
		type: "string",
		isReqiered: true,
		minWidth: 170,
	},
	{
		field: "name",
		label: "Название",
		isVisible: true,
		type: "string",
		isReqiered: true,
		minWidth: 170,
	},
	{
		field: "code",
		label: "Код",
		isVisible: true,
		type: "string",
		minWidth: 100,
		isReqiered: true,
	},
	{
		field: "category",
		label: "Категория",
		isVisible: true,
		type: "string",
		minWidth: 170,
		isRequired: true,
	},
	{
		field: "price",
		label: "Цена",
		isVisible: true,
		type: "number",
		minWidth: 170,
		isRequired: true,
		format: (value) => Number(value),
	},
];

export const initialFieldValues = {
    name: '',
    category: '',
    code: '',
    price: 100
}