import React, { useState, useEffect } from 'react';
import './TeamInfo.css';
import axios from 'axios';
axios.defaults.withCredentials = true;

type User = {
	id: string
	username: string
	pfpUrl: string
	bio: string
};

export default function TeamInfo() {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	let participants: Omit<User, 'id'>[] = [];
	let userInfo: User = {
		id: 'Loading...',
		username: 'Loading...',
		pfpUrl: '/images/default_pfp.png',
		bio: 'Loading...'
	};

	// THIS CODE DOES NOT WORK
	// const [userInfo, setUserInfo] = useState<User>({ id: "unknown", username: 'Loading...', pfpUrl: '/images/default_pfp.png', bio: 'Loading...' });
	// const [participants, setParticipants] = useState<User[]>([]);

	// useEffect(() => {
	// 	async function fetchUserInfo() {
	// 		try {
	// 			const response = await axios.get('http://91.233.42.135:2346/users/me');
	// 			setUserInfo(response.data.value);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}
		
	// 	async function fetchParticipants() {
	// 		try {
	// 			const response = await axios.get(`http://91.233.42.135:2346/users/members/${userInfo.id}`);
	// 			setParticipants(response.data.value.members);
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	}

	// 	fetchUserInfo();
	// 	fetchParticipants();
	// }, [userInfo]);
	// THIS CODE DOES NOT WORK

	function setBio(bio: string) {
		try {
			axios.patch('http://91.233.42.135:2346/users/me', { bio });
		} catch (error) {
			console.error(error);
		}
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				if (typeof reader.result != 'string') {
					console.error('typeof reader.result is not string');
					return;
				}

				setSelectedImage(reader.result);
			}
		};

		if (e.target.files == null) {
			console.error('e.target.files is null');
			return;
		}

		reader.readAsDataURL(e.target.files[0]);
	};
	
	const handleEditBio = () => {
		const newBio = prompt('Enter new information about yourself:');

		if (newBio !== null) {
			setBio(newBio);
		}
	};

	return (
		<div className="TeamInfo">
			<div className="header">
				Header
			</div>
			<div className="main-content">
				<div className="editor">
					<input type="file" onChange={handleImageChange} />
					{selectedImage && <img src={selectedImage} alt="Selected" />}
				</div>

				<div className="info">
					<div className="participant-list">
						<h2>Participants</h2>

						<ul>
						{participants.map((participant, index) => (
							<li key={index}>
								<img src={participant.pfpUrl} alt={participant.username} />
								{participant.username}
							</li>
						))}
						</ul>
					</div>

					<div className="about-me">
						<h2>About Me</h2>
						<p>{userInfo.bio}</p>
					</div>

				</div>

				<button className="edit-button" onClick={handleEditBio}>Edit</button>
			</div>
		</div>
	);
}