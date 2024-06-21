import React, { useEffect, useState } from 'react'
import { TbCurrencyMonero } from 'react-icons/tb'
import imgRub from './../../assets/free-icon-ruble.png'
import './Home.css'

interface HomeProps {
	currency: number
	currentSkin: string
	handleClick: () => void
	upgradeLevel: number
	autoFarmLevel: number
}

const Home: React.FC<HomeProps> = ({
	currency,
	currentSkin,
	handleClick,
	upgradeLevel,
	autoFarmLevel,
}) => {
	const [showPlus, setShowPlus] = useState(false)
	const [increment, setIncrement] = useState<number>(1)

	useEffect(() => {
		setIncrement(upgradeLevel)
	}, [upgradeLevel])

	const handleButtonClick = () => {
		handleClick()
		setShowPlus(true)
		setTimeout(() => {
			setShowPlus(false)
		}, 1000) // Анимация длится 1 секунду
	}

	return (
		<div className='home-container'>
			<div className='display'>
				<div className='counter'>
					<img className='imgRub' src={imgRub} alt='' />
					<span className='count'>{currency}</span>
				</div>
			</div>
			<div className='clickable-container'>
				<button className='clickable-button' onClick={handleButtonClick}>
					<TbCurrencyMonero
						className='clickable-icon'
						style={{
							background: currentSkin,
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
						}}
					/>
					{showPlus && <div className='plus-one'>+{increment}</div>}
				</button>
			</div>
			<div className='upgrade-level'>Уровень прокачки: {upgradeLevel}</div>
			<div className='auto-farm-level'>
				Уровень авто-начисления: {autoFarmLevel}
			</div>
		</div>
	)
}

export default Home
