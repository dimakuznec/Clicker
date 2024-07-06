import React, { useEffect, useState } from 'react'
import { BsLightningChargeFill } from 'react-icons/bs'
import ClickAnimation from '../ClickAnimation/ClickAnimation'
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
	hasPlayedCoinFlip: boolean
	onNotification: (message: string) => void
}

const Home: React.FC<HomeProps> = ({
	currency,
	currentSkin,
	handleClick,
	upgradeLevel,
	autoFarmLevel,
	onOpenCoinFlipModal,
	hasPlayedCoinFlip,
	onNotification,
}) => {
	const [energy, setEnergy] = useState<number>(() => {
		const savedEnergy = localStorage.getItem('energy')
		return savedEnergy ? JSON.parse(savedEnergy) : 100
	})
	const [clickAnimations, setClickAnimations] = useState<
		{ id: number; clicks: number; position: { x: number; y: number } }[]
	>([])
	const maxEnergy = 100
	const energyRegenRate = 1 // Energy regen per second
	const clickEnergyCost = 10
	const baseClickValue = 1

	useEffect(() => {
		const regenInterval = setInterval(() => {
			setEnergy(prevEnergy => {
				const newEnergy = Math.min(maxEnergy, prevEnergy + energyRegenRate)
				localStorage.setItem('energy', JSON.stringify(newEnergy))
				return newEnergy
			})
		}, 1000)

		return () => clearInterval(regenInterval)
	}, [])

	useEffect(() => {
		localStorage.setItem('energy', JSON.stringify(energy))
	}, [energy])

	const handleButtonClick = (e: React.MouseEvent) => {
		if (energy >= clickEnergyCost) {
			const clickIncrement =
				upgradeLevel === 1
					? baseClickValue
					: baseClickValue * (upgradeLevel * 1.5) // Увеличение кликов пропорционально уровню прокачки
			handleClick()
			setEnergy(prevEnergy => {
				const newEnergy = prevEnergy - clickEnergyCost
				localStorage.setItem('energy', JSON.stringify(newEnergy))
				return newEnergy
			})

			const newClickAnimation = {
				id: Date.now(),
				clicks: clickIncrement,
				position: { x: e.clientX, y: e.clientY },
			}
			setClickAnimations(prevAnimations => [
				...prevAnimations,
				newClickAnimation,
			])
			setTimeout(() => {
				setClickAnimations(prevAnimations =>
					prevAnimations.filter(
						animation => animation.id !== newClickAnimation.id
					)
				)
			}, 1000)
		} else {
			onNotification('Недостаточно энергии для клика!')
		}
	}

	const handleOpenModal = () => {
		if (!hasPlayedCoinFlip) {
			onOpenCoinFlipModal()
		} else {
			onNotification('Вы уже сыграли в "Орёл и Решка".')
		}
	}

	return (
		<div className='home-container'>
			{/* <h2>Главная страница</h2> */}
			<div className='counter'>
				<div>
					<img className='imgCoins' src={Coin} alt='' />
				</div>
				<p className='coin-rub'>{currency}</p>
				{/* <p>Текущий скин: {currentSkin}</p> */}
			</div>
			<button
				className='ButtonClick'
				onClick={handleButtonClick}
				disabled={energy < clickEnergyCost}
				style={{ background: currentSkin }}
			>
				<div>
					<img className='Mimg' src={M} alt='' />
				</div>
			</button>
			<div className='Energy'>
				<BsLightningChargeFill className='EnergyImg' /> {energy}%
			</div>
			<button className='Coin-Flip-Button' onClick={handleOpenModal}>
				Играть в "Орёл и Решка"
			</button>
			<p className='text'>Уровень прокачки: {upgradeLevel}</p>
			<p className='text'>Уровень автофарминга: {autoFarmLevel}</p>
			{clickAnimations.map(animation => (
				<ClickAnimation
					key={animation.id}
					clicks={animation.clicks}
					position={animation.position}
				/>
			))}
		</div>
	)
}

export default Home
