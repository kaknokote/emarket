export const ProductCard = ({ product }) => {
	return (
		<div className="w-[280px] h-[370px] mt-2.5 bg-white rounded-lg  overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
			<img
				src={product.imageUrl}
				className="w-full h-[220px] pt-3.5 object-contain"
				alt={product.name}
			/>
			<div className="p-4 flex flex-col justify-center bg-gray-100 mt-auto ">
				<h3
					className="text-lg text-gray-800 truncate"
					title={product.name}
				>
					{product.name}
				</h3>
				<p className="text-xl font-bold">{product.price}₽</p>
			</div>
		</div>
	);
};
