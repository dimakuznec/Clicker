import React from 'react'
import './Upgrade.css'

interface UpgradeProps {
	currency: number
	upgradeLevel: number
	onUpgrade: (cost: number, increment: number) => void
	autoFarmLevel: number
	onAutoFarmUpgrade: (cost: number, increment: number) => void
}

const Upgrade: React.FC<UpgradeProps> = ({
	currency,
	upgradeLevel,
	onUpgrade,
	autoFarmLevel,
	onAutoFarmUpgrade,
}) => {
	const upgradeCost = 10 * upgradeLevel
	const autoFarmUpgradeCost = 50 * (autoFarmLevel + 1)

	return (
		<div className='upgrade-container'>
			<h2>Прокачка</h2>
			<div className='upgrade-option'>
				<button
					onClick={() => onUpgrade(upgradeCost, 1)}
					disabled={currency < upgradeCost}
				>
					Увеличить прирост за клик (Стоимость: {upgradeCost})
				</button>
			</div>
			<div className='upgrade-option'>
				<button
					onClick={() => onAutoFarmUpgrade(autoFarmUpgradeCost, 5)}
					disabled={currency < autoFarmUpgradeCost}
				>
					Увеличить пассивный доход (Стоимость: {autoFarmUpgradeCost})
				</button>
			</div>
		</div>
	)
}

export default Upgrade
