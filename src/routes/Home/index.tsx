import './Home.css';

import Avatar from './Avatar';
// import Slider from './Carousel';




export default function Home() {
	return (
		<div id='Home'>
			<div className='context' />
			<div className='area'>
				<Avatar href='/signup' />
				<div className="sld">
  <input type="radio" name="position" checked />
  <input type="radio" name="position" />
  <input type="radio" name="position" />
  <input type="radio" name="position" />
  <input type="radio" name="position" />
  <main id="carousel">
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    <div className="item"></div>
    </main>
</div>
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