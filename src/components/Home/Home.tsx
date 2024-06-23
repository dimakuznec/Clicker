import React from 'react'
import Coin from './../../assets/free-icon-ruble.png'
import M from './../../assets/m.jpg'
import './Home.css'

interface HomeProps {
	currency: number
	currentSkin: string
	handleClick: () => void
	upgradeLevel: number
	autoFarmLevel: number
	onOpenCoinFlipModal: () => void
	clickIncrement: number
	clickAnimation: boolean
}

const Home: React.FC<HomeProps> = ({
	currency,
	currentSkin,
	handleClick,
	upgradeLevel,
	autoFarmLevel,
	onOpenCoinFlipModal,
	clickIncrement,
	clickAnimation,
}) => {
	return (
		<div className='home-container'>
			<div className='counter'>
				<div className='icon'>
					<img src={Coin} alt='Coin' className='imgCoins' />
				</div>
				<div className='count'>{currency}</div>
			</div>
			<div
				className={`clickable-container ${clickAnimation ? 'show' : ''}`}
				onClick={handleClick}
				style={{ background: currentSkin }}
			>
				<div className='clickable-button'>
					<div className='clickable-icon'>
						<img className='Mimg' src={M} alt='MImg' />
					</div>
					{clickAnimation && (
						<div className={`plus-one ${clickIncrement > 0 ? 'win' : 'lose'}`}>
							+{clickIncrement}
						</div>
					)}
				</div>
			</div>
			<div className='display'>
				<div className='upgrade-level'>Уровень прокачки: {upgradeLevel}</div>
				<div className='upgrade-level'>Уровень автофарма: {autoFarmLevel}</div>
				<button className='button-game' onClick={onOpenCoinFlipModal}>
					Игра "Орёл и решка"
				</button>
			</div>
		</div>
	)
}

export default Home
