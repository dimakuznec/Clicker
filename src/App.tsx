import React, { useEffect, useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import CoinFlipModal from './components/CoinFlipModal/CoinFlipModal'
import Home from './components/Home/Home'
import Shop from './components/Shop/Shop'
import Upgrade from './components/Upgrade/Upgrade'

const App: React.FC = () => {
	const [currency, setCurrency] = useState<number>(0)
	const [currentSkin, setCurrentSkin] = useState<string>('gray')
	const [clickIncrement, setClickIncrement] = useState<number>(1)
	const [upgradeLevel, setUpgradeLevel] = useState<number>(1)
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const [autoFarmLevel, setAutoFarmLevel] = useState<number>(0)
	const [showCoinFlipModal, setShowCoinFlipModal] = useState<boolean>(false)
	const [coinFlipTimer, setCoinFlipTimer] = useState<number>(3600) // 1 час = 3600 секунд
	const [coinFlipResult, setCoinFlipResult] = useState<string | null>(null) // Добавлено для хранения результата игры

	const handleClick = () => {
		setCurrency(prevCurrency => prevCurrency + clickIncrement)
	}

	const handleBuySkin = (skin: string, cost: number) => {
		if (currency >= cost) {
			setCurrency(prevCurrency => prevCurrency - cost)
			setCurrentSkin(skin)
		}
	}

	const handleUpgrade = (cost: number, increment: number) => {
		if (currency >= cost) {
			setCurrency(prevCurrency => prevCurrency - cost)
			setClickIncrement(prevIncrement => prevIncrement + increment)
			setUpgradeLevel(prevLevel => prevLevel + 1)
		}
	}

	const handleAutoFarmUpgrade = (cost: number, increment: number) => {
		if (currency >= cost) {
			setCurrency(prevCurrency => prevCurrency - cost)
			setAutoFarmLevel(prevLevel => prevLevel + 1)
		}
	}

	useEffect(() => {
		if (autoFarmLevel > 0) {
			const interval = setInterval(() => {
				setCurrency(prevCurrency => prevCurrency + 5 * autoFarmLevel)
			}, 5000) // Начисление каждые 5 секунд

			return () => clearInterval(interval)
		}
	}, [autoFarmLevel])

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleCoinFlip = (choice: string) => {
		const result = Math.random() < 0.5 ? 'Орёл' : 'Решка'
		if (choice === result) {
			setCurrency(prevCurrency => prevCurrency + 5)
			setUpgradeLevel(prevLevel => prevLevel + 1)
			setCoinFlipResult('win')
		} else {
			setUpgradeLevel(prevLevel => Math.max(1, prevLevel - 1))
			setCoinFlipResult('lose')
		}
		setShowCoinFlipModal(true)
		setCoinFlipTimer(3600) // Сбросить таймер на 1 час
	}

	useEffect(() => {
		const timerInterval = setInterval(() => {
			setCoinFlipTimer(prevTimer => prevTimer - 1)
		}, 1000)

		const coinFlipInterval = setInterval(() => {
			setShowCoinFlipModal(true)
		}, 3600000) // 1 час = 3600000 миллисекунд

		return () => {
			clearInterval(timerInterval)
			clearInterval(coinFlipInterval)
		}
	}, [])

	useEffect(() => {
		if (coinFlipTimer <= 0) {
			setShowCoinFlipModal(true)
			setCoinFlipTimer(3600) // Сбросить таймер на 1 час
		}
	}, [coinFlipTimer])

	return (
		<Router>
			<div className='App'>
				<nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
					<div className='burger' onClick={toggleMenu}>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div className={`nav-links ${isMenuOpen ? 'show' : ''}`}>
						<Link to='/'>Главная</Link>
						<Link to='/shop'>Магазин</Link>
						<Link to='/upgrade'>Прокачка</Link>
					</div>
				</nav>
				<Routes>
					<Route
						path='/'
						element={
							<Home
								currency={currency}
								currentSkin={currentSkin}
								handleClick={handleClick}
								upgradeLevel={upgradeLevel}
								autoFarmLevel={autoFarmLevel}
							/>
						}
					/>
					<Route
						path='/shop'
						element={<Shop currency={currency} onBuySkin={handleBuySkin} />}
					/>
					<Route
						path='/upgrade'
						element={
							<Upgrade
								currency={currency}
								upgradeLevel={upgradeLevel}
								onUpgrade={handleUpgrade}
								autoFarmLevel={autoFarmLevel}
								onAutoFarmUpgrade={handleAutoFarmUpgrade}
							/>
						}
					/>
				</Routes>
				<CoinFlipModal
					show={showCoinFlipModal}
					onClose={() => setShowCoinFlipModal(false)}
					onPlay={handleCoinFlip}
					result={coinFlipResult} // Передача результата в модальное окно
				/>
			</div>
		</Router>
	)
}

export default App
