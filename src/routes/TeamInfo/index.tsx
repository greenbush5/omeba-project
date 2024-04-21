import './TeamInfo.css';

import Avatar from './Avatar';
import Carousel from './Carousel';

const flickityOptions = {
	initialIndex: 1
};

const cards = [
	{ title: 'cloud', path: 'cloud.jpg' },
	{ title: 'tree', path: 'tree.jpg' },
	{ title: 'tree2', path: 'tree2.jpg' }
];

export default function TeamInfo() {
	return (
		<div id="TeamInfo">
			<Avatar />
			
			
			<div className="context"></div>
			<div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
				<Carousel
				flickityOptions={flickityOptions}
				imageCards={cards}
			/>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
	</div>
	);
}