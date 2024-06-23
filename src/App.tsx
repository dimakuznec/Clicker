import React, { useEffect, useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import CoinFlipModal from './components/CoinFlipModal/CoinFlipModal'
import Home from './components/Home/Home'
import Shop from './components/Shop/Shop'
import Upgrade from './components/Upgrade/Upgrade'

const App: React.FC = () => {
	const [currency, setCurrency] = useState<number>(() => {
		const saved = localStorage.getItem('currency')
		return saved ? Number(saved) : 0
	})
	const [currentSkin, setCurrentSkin] = useState<string>(() => {
		const saved = localStorage.getItem('currentSkin')
		return saved || 'gray'
	})
	const [clickIncrement, setClickIncrement] = useState<number>(() => {
		const saved = localStorage.getItem('clickIncrement')
		return saved ? Number(saved) : 1
	})
	const [upgradeLevel, setUpgradeLevel] = useState<number>(() => {
		const saved = localStorage.getItem('upgradeLevel')
		return saved ? Number(saved) : 1
	})
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
	const [autoFarmLevel, setAutoFarmLevel] = useState<number>(() => {
		const saved = localStorage.getItem('autoFarmLevel')
		return saved ? Number(saved) : 1
	})
	const [showCoinFlipModal, setShowCoinFlipModal] = useState<boolean>(false)
	const [coinFlipTimer, setCoinFlipTimer] = useState<number>(() => {
		const saved = localStorage.getItem('coinFlipTimer')
		return saved ? Number(saved) : 300
	})
	const [clickAnimation, setClickAnimation] = useState<boolean>(false)
	const [ownedSkins, setOwnedSkins] = useState<string[]>(() => {
		const saved = localStorage.getItem('ownedSkins')
		return saved ? JSON.parse(saved) : []
	})

	// Сохранение состояния в localStorage при изменении
	useEffect(() => {
		localStorage.setItem('currency', currency.toString())
	}, [currency])

	useEffect(() => {
		localStorage.setItem('currentSkin', currentSkin)
	}, [currentSkin])

	useEffect(() => {
		localStorage.setItem('clickIncrement', clickIncrement.toString())
	}, [clickIncrement])

	useEffect(() => {
		localStorage.setItem('upgradeLevel', upgradeLevel.toString())
	}, [upgradeLevel])

	useEffect(() => {
		localStorage.setItem('autoFarmLevel', autoFarmLevel.toString())
	}, [autoFarmLevel])

	useEffect(() => {
		localStorage.setItem('ownedSkins', JSON.stringify(ownedSkins))
	}, [ownedSkins])

	useEffect(() => {
		localStorage.setItem('coinFlipTimer', coinFlipTimer.toString())
	}, [coinFlipTimer])

	const handleClick = () => {
		setCurrency(prevCurrency => prevCurrency + clickIncrement)
		setClickAnimation(true) // Запуск анимации
	}

	const handleBuySkin = (skin: string, cost: number) => {
		if (currency >= cost && !ownedSkins.includes(skin)) {
			setCurrency(prevCurrency => prevCurrency - cost)
			setOwnedSkins(prevSkins => [...prevSkins, skin])
			setCurrentSkin(skin) // Установка купленного скина как текущего
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

	// Эффект для таймера игры "Орёл и решка"
	useEffect(() => {
		const timerInterval = setInterval(() => {
			setCoinFlipTimer(prevTimer => prevTimer - 1)
		}, 1000)

		return () => clearInterval(timerInterval)
	}, [])

	// Обработка истечения таймера для игры "Орёл и решка"
	useEffect(() => {
		if (coinFlipTimer <= 0) {
			setShowCoinFlipModal(true) // Показать модальное окно для игры "Орёл и решка"
			setCoinFlipTimer(300) // Сбросить таймер на 5 минут (300 секунд)
		}
	}, [coinFlipTimer])

	// Эффект для автофарминга
	useEffect(() => {
		if (autoFarmLevel > 1) {
			const autoFarmInterval = setInterval(() => {
				setCurrency(prevCurrency => prevCurrency + autoFarmLevel)
			}, 1000)

			return () => clearInterval(autoFarmInterval)
		}
	}, [autoFarmLevel])

	// Эффект для анимации клика
	useEffect(() => {
		if (clickAnimation) {
			const animationTimeout = setTimeout(() => {
				setClickAnimation(false) // Остановка анимации
			}, 1000) // Длительность анимации должна соответствовать CSS анимации

			return () => clearTimeout(animationTimeout)
		}
	}, [clickAnimation])

	const handleCoinFlip = (choice: string) => {
		const result = Math.random() < 0.5 ? 'Орёл' : 'Решка'
		if (choice === result) {
			setCurrency(prevCurrency => prevCurrency + 50)
			setUpgradeLevel(prevLevel => prevLevel + 1)
			setAutoFarmLevel(prevLevel => prevLevel + 1)
			setClickIncrement(prevIncrement => prevIncrement + 1) // Увеличение increment при выигрыше
			toast.success('Вы выиграли! Уровень повышен и вы получили 50 монет.')
		} else {
			setUpgradeLevel(prevLevel => Math.max(1, prevLevel - 1))
			setAutoFarmLevel(prevLevel => Math.max(1, prevLevel - 1))
			setClickIncrement(prevIncrement => Math.max(1, prevIncrement - 1)) // Уменьшение increment при проигрыше
			toast.error('Вы проиграли! Уровень понижен.')
		}
		setShowCoinFlipModal(false) // Закрыть модальное окно игры "Орёл и решка" после окончания игры
	}

	const handleCloseModal = () => {
		setShowCoinFlipModal(false) // Закрыть модальное окно вручную по требованию
	}

	return (
		<Router>
			<div className='App'>
				<ToastContainer />
				<nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
					<div className='burger' onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
								onOpenCoinFlipModal={() => setShowCoinFlipModal(true)}
								clickIncrement={clickIncrement}
								clickAnimation={clickAnimation}
							/>
						}
					/>
					<Route
						path='/shop'
						element={
							<Shop
								currency={currency}
								onBuySkin={handleBuySkin}
								ownedSkins={ownedSkins}
								currentSkin={currentSkin}
								setCurrentSkin={setCurrentSkin}
							/>
						}
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
				{showCoinFlipModal && (
					<CoinFlipModal
						show={showCoinFlipModal}
						onClose={handleCloseModal}
						onPlay={handleCoinFlip}
					/>
				)}
			</div>
		</Router>
	)
}

export default App
