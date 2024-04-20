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

export default function Carousel(options: CarouselOptions) {
	return (
		<Flickity
			className='slider'
			elementType='div'
			disableImagesLoaded={false}
			options={options.flickityOptions}
			reloadOnUpdate
			static
        >
			{options.imageCards.map((imageCard, index) => {
					return (
						<div key={index} className='plate'>
							<h2>{imageCard.title}</h2>
							<div style={{
								backgroundImage: `url('/images/${imageCard.path}')`
							}} className="image-div" />
						</div>
					);
			})}
		</Flickity>
	);
}