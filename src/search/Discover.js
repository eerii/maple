import React, { useEffect, useState } from 'react'

import styles from '../config/Styles'
import { getCategories } from '../config/Categories'
import times from 'lodash.times'
import axios from 'axios'

const { Background, CategoryStyle, CardStyle, CardSlider } = styles
const [codes, names, colors] = getCategories()

const startRadius = 10

const load = true

const Card = ({
	show,
	name,
	username,
	language,
	otherLanguages,
	funfact,
	bio,
	offer
}) => {
	const handleClick = () => {
		console.log('clicked')
	}

	return (
		<CardStyle
			onClick={() => handleClick()}
			style={{
				margin: '8px',
				display: `${show ? 'block' : 'none'}`,
				minWidth: '300px',
				cursor: 'pointer'
			}}
		>
			<div
				style={{
					boxShadow: '0 3px rgba(199,199,217,0.5)',
					borderRadius: '16px',
					padding: '20px'
				}}
			>
				<h2 style={{ margin: '0 0 4px 0' }}>{name}</h2>
				<h4 style={{ margin: '0' }}>{`@${username}`}</h4>
			</div>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexWrap: 'wrap',
					marginTop: '16px',
					height: '78px',
					overflow: 'hidden'
				}}
			>
				{times(offer.length, i => (
					<div key={'circle' + i}>
						<CategoryStyle
							style={{ margin: '4px', cursor: 'default' }}
							color={colors.filter((c, j) => codes[j] === offer[i])}
							active={true}
							radius={6}
						>
							<p style={{ margin: '0', color: 'white', fontSize: '12px' }}>
								{names
									.filter((n, j) => codes[j] === offer[i])[0]
									.replace(':', ' ')}
							</p>
						</CategoryStyle>
					</div>
				))}
			</div>

			<div
				style={{ textAlign: 'left', padding: '0 16px', marginBottom: '16px' }}
			>
				<p style={{ margin: '4px', marginTop: '16px' }}>
					<b>Language:</b> {language}
				</p>
				{otherLanguages && otherLanguages[0] !== '' && (
					<p
						style={{
							margin: '4px',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap'
						}}
					>
						<b>Other Languages:</b> {otherLanguages.join(', ').split(0, -2)}
					</p>
				)}
				<p style={{ margin: '4px', marginTop: '16px' }}>
					<b>Fun Fact:</b> {funfact}
				</p>
				<p
					style={{
						margin: '4px',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap'
					}}
				>
					<b>Bio:</b> {bio}
				</p>
			</div>
		</CardStyle>
	)
}

const Discover = ({ loggedIn }) => {
	const [active, setActive] = useState(-1)
	const [selected, setSelected] = useState(-1)
	const [users, setUsers] = useState(null)
	const [need, setNeed] = useState(null)

	useEffect(() => {
		(async () => {
			try {
				if (load && loggedIn) {
					const localUsers = localStorage.getItem('DiscoverUsers')
					const localNeed = localStorage.getItem('DiscoverNeed')
					if (localUsers !== null) {
						setUsers(JSON.parse(localUsers))
						if (localNeed !== null) {
							setNeed(JSON.parse(localNeed))
						}
					} else {
						console.log('Retrieving list of users...')

						const token = localStorage.getItem('Token')
						if (token === null) {
							console.log('ERROR: NOT AUTHORIZED')
						}

						const headers = {
							Authorization: `Bearer ${token}`
						}

						const get = await axios.get(
							process.env.REACT_APP_URL + '/api/discover',
							{ headers: headers }
						)

						setUsers(get.data.rows)
						localStorage.setItem('DiscoverUsers', JSON.stringify(get.data.rows))

						setNeed(get.data.need)
						localStorage.setItem('DiscoverNeed', JSON.stringify(get.data.need))
					}
				}
			} catch (e) {
				console.log(e)
			}
		})()
	}, [loggedIn])

	const handleMouse = (i, enter) => {
		setActive(enter ? i : -1)
	}

	const handleClick = i => {
		if (i !== need.length) {
			setSelected(selected === i ? -1 : i)
		}
	}

	return (
		<Background
			style={{
				paddingTop: '15vh',
				paddingBottom: '15vh',
				minHeight: '65vh',
				paddingLeft: 0,
				paddingRight: 0
			}}
		>
			<div style={{ paddingLeft: '10vw', paddingRight: '10vw' }}>
				<h1 style={{ marginLeft: '8px', marginBottom: '4px' }}>Discover</h1>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						{need !== null &&
							times(need.length + 1, i => (
								<div style={{ marginRight: '8px' }} key={'circle' + i}>
									<CategoryStyle
										style={{
											margin: `${4 -
												((active === i && selected === -1) || selected === i
													? 2
													: 0)}px ${4 -
												((active === i && selected === -1) || selected === i
													? 4
													: 0)}px`
										}}
										color={colors.filter((c, j) => codes[j] === need[i])}
										active={
											i === need.length
												? false
												: active === -1 && selected === -1
													? true
													: active === i || selected === i
										}
										radius={
											startRadius +
											((active === i && selected === -1) || selected === i
												? 2
												: 0)
										}
										onMouseOver={() => handleMouse(i, true)}
										onMouseOut={() => handleMouse(i, false)}
										onClick={() => handleClick(i)}
									>
										<h4 style={{ margin: '0', color: 'white' }}>
											{i === need.length
												? '+'
												: names
													.filter((n, j) => codes[j] === need[i])[0]
													.replace(':', ' ')}
										</h4>
									</CategoryStyle>
								</div>
							))}
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<div style={{ marginRight: '8px' }} key={'lang'}>
							<CategoryStyle
								style={{ margin: '4px' }}
								active={false}
								radius={startRadius}
								//onMouseOver={() => handleMouse(i, true)}
								//onMouseOut={() => handleMouse(i, false)}
								/*onClick={() => handleClick(i)}*/
							>
								<h4 style={{ margin: '0', color: 'white' }}>Language</h4>
							</CategoryStyle>
						</div>
					</div>
				</div>
			</div>
			<div style={{ overflow: 'hidden', marginTop: '32px' }}>
				<CardSlider>
					<div style={{ paddingLeft: '10vw' }} />
					{users &&
						times(users.length, i => {
							const filter =
								JSON.parse(users[i].offer).filter(o => {
									if (selected !== -1) {
										if (selected < need.length) {
											/*if (active !== -1 && active < need.length) {
                                            return need[active] === o
                                        }*/
											return need[selected] === o
										} else {
											return false
										}
									}
									/*if (active !== -1) { TODO: ADD ANIMATION FOR THIS TO LOOK GOOD
                                    if (active < need.length) {
                                        return need[active] === o
                                    } else {
                                        return false
                                    }
                                }*/
									return true
								}).length > 0
							return (
								<Card
									show={filter}
									name={users[i].name}
									username={users[i].username}
									key={'card' + users[i].username}
									offer={JSON.parse(users[i].offer)}
									language={users[i].language}
									otherLanguages={JSON.parse(
										users[i].otherlanguages.replace('{', '[').replace('}', ']')
									)}
									funfact={users[i].funfact}
									bio={users[i].bio}
								/>
							)
						})}
					<Card
						show={true}
						name={'Test'}
						username={'test'}
						key={'cardtest'}
						offer={['A', 'O', 'K', 'L']}
						language={'Test'}
						otherLanguages={['']}
						funfact={'I\'m a test user!'}
						bio={'Bio'}
					/>
					<div style={{ paddingRight: '10vw' }} />
				</CardSlider>
			</div>
		</Background>
	)
}

export default Discover
