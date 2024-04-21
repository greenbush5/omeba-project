import './Home.css';

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

export default function Home() {
	return (
		<div id='Home'>
			<div className='context' />
			<div className='area'>
				<Avatar href='/signup' />

				<Carousel
					flickityOptions={flickityOptions}
					imageCards={cards}
				/>

				<ul className='circles'>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
    		</div>
		</div>
	);
}