import './Avatar.css';

import { useState } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default function Avatar() {
	const [url, setUrl] = useState('/images/default_pfp.png');

	// TODO: fix this
	async function getUrl() {
		try {
			const response = await axios.get('http://localhost:2346/users/me');
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
			    <img src={url} alt='Avatar' />
		    </div>
	);
}