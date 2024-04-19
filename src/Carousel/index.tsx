// import React;

import Flickity, { FlickityOptions } from 'react-flickity-component';
import './flickity.css';
import './Carousel.css';

type CarouselOptions = {
	flickityOptions: FlickityOptions
	imageCards: ImageCard[]
};

type ImageCard = {
	title: string
	path: string
};

function Carousel(options: CarouselOptions) {
	return (
		<Flickity
			className='Slider'
			elementType='div'
			disableImagesLoaded={false}
			options={options.flickityOptions}
			reloadOnUpdate
			static
        >
			{options.imageCards.map((imageCard, index) => {
					return (
						<div key={index} className='Plate'>
							<h2>{imageCard.title}</h2>
							<div style={{
								backgroundImage: `url('/images/${imageCard.path}')`
							}} className="imageCard-imageDiv"></div>
						</div>
					);
			})}
		</Flickity>
	);
}

export default Carousel;