// components/CoinFlipModal/CoinFlipModal.tsx
import React, { useState } from 'react'
import './CoinFlipModal.css'

interface CoinFlipModalProps {
	show: boolean
	onClose: () => void
	onPlay: (choice: string) => void
}

const CoinFlipModal: React.FC<CoinFlipModalProps> = ({
	show,
	onClose,
	onPlay,
}) => {
	const [choice, setChoice] = useState<string | null>(null)

	const handleChoice = (selectedChoice: string) => {
		setChoice(selectedChoice)
	}

	const handlePlay = () => {
		if (choice) {
			onPlay(choice)
			setChoice(null)
		}
	}

	if (!show) return null

	return (
		<div className='modal-overlay'>
			<div className='modal-content'>
				<h2>Игра "Орёл и Решка"</h2>
				<p>
					Выберите "Орёл" или "Решка" и получите шанс выиграть монеты и
					повышение уровня. Если проиграете, уровень прокачки клика будет
					снижен.
				</p>
				<div className='choice-buttons'>
					<button
						onClick={() => handleChoice('Орёл')}
						className={choice === 'Орёл' ? 'selected' : ''}
					>
						Орёл
					</button>
					<button
						onClick={() => handleChoice('Решка')}
						className={choice === 'Решка' ? 'selected' : ''}
					>
						Решка
					</button>
				</div>
				<div className='modal-buttons'>
					<button onClick={handlePlay} disabled={!choice}>
						Играть
					</button>
					<button onClick={onClose}>Отказаться</button>
				</div>
			</div>
		</div>
	)
}

export default CoinFlipModal
