import React from 'react'
import './Upgrade.css'

interface UpgradeProps {
	currency: number
	upgradeLevel: number
	onUpgrade: (cost: number, increment: number) => void
	autoFarmLevel: number
	autoFarmInterval: number
	onAutoFarmUpgrade: (cost: number, increment: number) => void
}

const Upgrade: React.FC<UpgradeProps> = ({
	currency,
	upgradeLevel,
	onUpgrade,
	autoFarmLevel,
	autoFarmInterval,
	onAutoFarmUpgrade,
}) => {
	const getUpgradeCost = (level: number) => level * 50 // Стоимость увеличивается с каждым уровнем
	const getIncrement = (level: number) => level // Прирост на каждом уровне равен текущему уровню

	const getAutoFarmUpgradeCost = (level: number) => level * 100 // Стоимость увеличивается с каждым уровнем
	const getAutoFarmIncrement = (level: number) => 500 // Уменьшение интервала на каждом уровне

	const nextAutoFarmCost = getAutoFarmUpgradeCost(autoFarmLevel + 1)
	const nextAutoFarmIncrement = getAutoFarmIncrement(autoFarmLevel + 1)

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
			<div className='current-level'>
				Уровень авто-фарминга: {autoFarmLevel}
			</div>
			<div className='upgrade'>
				<div className='upgrade-details'>
					<span>Следующий уровень авто-фарминга: {autoFarmLevel + 5}</span>
					<span>Стоимость: {nextAutoFarmCost} монет</span>
					<span>Скорость: каждые {autoFarmInterval / 2} секунд</span>
				</div>
				<button
					className={`upgrade-button ${
						currency >= nextAutoFarmCost ? 'available' : 'unavailable'
					}`}
					onClick={() => {
						if (currency >= nextAutoFarmCost) {
							onAutoFarmUpgrade(nextAutoFarmCost, nextAutoFarmIncrement)
						}
					}}
					disabled={currency < nextAutoFarmCost}
				>
					Прокачать авто-фарминг
				</button>
			</div>
			<div className='currency-display'>Текущая валюта: {currency}</div>
		</div>
	)
}

export default Upgrade
