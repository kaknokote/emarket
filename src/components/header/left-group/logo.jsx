import { BsRobot } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export const Logo = () => {
	return (
		<Link
			to="/"
			className="w-[350px] ml-5 flex flex-wrap gap-6 justify-center"
		>
			<BsRobot className="text-6xl" />
			<div className="text-5xl font-bold mt-1.5">EMARKET</div>
		</Link>
	);
};
