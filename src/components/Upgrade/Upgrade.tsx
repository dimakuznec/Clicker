import React from 'react'
import './Upgrade.css'

interface UpgradeProps {
	currency: number
	upgradeLevel: number
	onUpgrade: (cost: number, increment: number) => void
}

const Upgrade: React.FC<UpgradeProps> = ({
	currency,
	upgradeLevel,
	onUpgrade,
}) => {
	const getUpgradeCost = (level: number) => level * 50 // Стоимость увеличивается с каждым уровнем
	const getIncrement = (level: number) => level // Прирост на каждом уровне равен текущему уровню

	const currentCost = getUpgradeCost(upgradeLevel)
	const nextCost = getUpgradeCost(upgradeLevel + 1)
	const nextIncrement = getIncrement(upgradeLevel + 1)

	return (
		<div className='upgrade-container'>
			<h2>Прокачка</h2>
			<div className='current-level'>Текущий уровень: {upgradeLevel}</div>
			<div className='upgrade'>
				<div className='upgrade-details'>
					<span>Следующий уровень: {upgradeLevel + 1}</span>
					<span>Стоимость: {nextCost} монет</span>
					<span>Прирост: +{nextIncrement} за клик</span>
				</div>
				<button
					className={`upgrade-button ${
						currency >= nextCost ? 'available' : 'unavailable'
					}`}
					onClick={() => {
						if (currency >= nextCost) {
							onUpgrade(nextCost, nextIncrement)
						}
					}}
					disabled={currency < nextCost}
				>
					Прокачать
				</button>
			</div>
			<div className='currency-display'>Текущая валюта: {currency}</div>
		</div>
	)
}

export default Upgrade
