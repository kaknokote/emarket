export const Input = ({ type, placeholder, onChange }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			onChange={onChange}
			className={`p-2 border rounded-md w-full mt-4`}
		/>
	);
};
