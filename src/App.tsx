import Carousel from './Carousel';
import './App.css';

const flickityOptions = {
	initialIndex: 1
};

const cards = [
	{ title: 'cloud', path: 'cloud.jpg' },
	{ title: 'tree', path: 'tree.jpg' },
	{ title: 'tree2', path: 'tree2.jpg' }
];

function App() {
	return (
		<div className='App'>
			<Carousel
				flickityOptions={flickityOptions}
				imageCards={cards}
			/>
		</div>
		
	)
}
export default App;