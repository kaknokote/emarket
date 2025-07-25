export const Input = ({ type, placeholder }) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			className={`p-2 border rounded-md w-full mt-4`}
		/>
	);
};
