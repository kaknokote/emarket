import { Logo } from './left-group/logo';
import { RightGroup } from './right-group/right-group';

export const Header = () => {
	return (
		<div className="flex flex-wrap justify-between">
			<Logo />
			<RightGroup />
		</div>
	);
};
