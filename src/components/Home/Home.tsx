// components/Home/Home.tsx
import React, { useEffect, useState } from 'react'
import { TbCurrencyMonero } from 'react-icons/tb'
import imgRub from './../../assets/free-icon-ruble.png'
import './Home.css'

interface HomeProps {
	currency: number
	currentSkin: string
	handleClick: () => void
	upgradeLevel: number
	tapCount: number
	coinFlipTimer: number
}

const Home: React.FC<HomeProps> = ({
	currency,
	currentSkin,
	handleClick,
	upgradeLevel,
	tapCount,
	coinFlipTimer,
}) => {
	const [showPlus, setShowPlus] = useState(false)
	const [increment, setIncrement] = useState<number>(tapCount)

	useEffect(() => {
		setIncrement(tapCount)
	}, [tapCount])

	const handleButtonClick = () => {
		handleClick()
		setShowPlus(true)
		setTimeout(() => {
			setShowPlus(false)
		}, 1000) // Анимация длится 1 секунду
	}

	const formatTime = (seconds: number) => {
		const h = Math.floor(seconds / 3600)
		const m = Math.floor((seconds % 3600) / 60)
		const s = Math.floor(seconds % 60)
		return `${h.toString().padStart(2, '0')}:${m
			.toString()
			.padStart(2, '0')}:${s.toString().padStart(2, '0')}`
	}

	return (
		<div className='home-container'>
			<div className='timer'>
				Время до следующей игры: {formatTime(coinFlipTimer)}
			</div>
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
		</div>
	)
}

export default Home
