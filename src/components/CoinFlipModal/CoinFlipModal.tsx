import React from 'react'
import './CoinFlipModal.css'

interface CoinFlipModalProps {
	show: boolean
	onClose: () => void
	onPlay: (choice: string) => void
	result: string | null
}

const CoinFlipModal: React.FC<CoinFlipModalProps> = ({
	show,
	onClose,
	onPlay,
	result,
}) => {
	const handlePlay = (choice: string) => {
		onPlay(choice)
	}

	return (
		<>
			{show && (
				<div className='coin-flip-modal'>
					<div className='modal-content'>
						<h2>Игра "Орёл и решка"</h2>
						<p>Выберите сторону монетки:</p>
						<div className='button-container'>
							<button
								className='choice-button'
								onClick={() => handlePlay('Орёл')}
							>
								Орёл
							</button>
							<button
								className='choice-button'
								onClick={() => handlePlay('Решка')}
							>
								Решка
							</button>
						</div>
						{result === 'win' && (
							<p className='result-message win'>Вы победили!</p>
						)}
						{result === 'lose' && (
							<p className='result-message lose'>Вы проиграли!</p>
						)}
						<button className='close-button' onClick={onClose}>
							Закрыть
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default CoinFlipModal
