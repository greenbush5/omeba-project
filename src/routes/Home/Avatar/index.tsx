import './Avatar.css';

import { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

type AvatarProps = {
	href: string
};

export default function Avatar(props: AvatarProps) {
	const [url, setUrl] = useState('/images/default_pfp.png');

	// TODO: fix this
	async function getUrl() {
		try {
			const response = await axios.get('http://91.233.42.135:2346/users/me');
			console.log(response.data);

			if (response.data.pfpUrl) {
				setUrl(response.data.pfpUrl);
			}
		} catch (error) {
			console.error(error);
		}
	}

	getUrl();

	return (
		<div className='avatar'>
			<a href={props.href}>
				<img src={url} alt='Avatar' draggable='false' />
			</a>
		</div>
	);
}