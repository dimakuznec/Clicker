import React, { useEffect, useState } from 'react'
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
	const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
	const [result, setResult] = useState<string | null>(null)
	const [message, setMessage] = useState<string>('')

	useEffect(() => {
		if (!show) {
			setSelectedChoice(null)
			setResult(null)
			setMessage('')
		}
	}, [show])

	const handlePlay = (choice: string) => {
		if (!selectedChoice) {
			setSelectedChoice(choice)
			onPlay(choice)
			const gameResult = Math.random() < 0.5 ? 'Орёл' : 'Решка'
			setResult(gameResult)
			setMessage(
				choice === gameResult
					? 'Вы выиграли! Уровень повышен и вы получили 50 монет.'
					: 'Вы проиграли! Уровень понижен.'
			)
		}
	}

	const handleClose = () => {
		onClose()
	}

	return (
		<div className={`coin-flip-modal-overlay ${show ? 'show' : ''}`}>
			<div className='coin-flip-modal'>
				<button className='close-button' onClick={handleClose}>
					×
				</button>
				<h2>Игра "Орёл и Решка"</h2>
				<div>
					<button
						onClick={() => handlePlay('Орёл')}
						disabled={!!selectedChoice}
					>
						Орёл
					</button>
					<button
						onClick={() => handlePlay('Решка')}
						disabled={!!selectedChoice}
					>
						Решка
					</button>
				</div>
				{selectedChoice && (
					<div className='result'>
						<p className={selectedChoice === result ? 'win' : 'lose'}>
							{message}
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default CoinFlipModal
