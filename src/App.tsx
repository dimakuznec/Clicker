import React, { useState } from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Shop from './components/Shop/Shop'
import Upgrade from './components/Upgrade/Upgrade'

const App: React.FC = () => {
	const [currency, setCurrency] = useState<number>(0)
	const [currentSkin, setCurrentSkin] = useState<string>('gray')
	const [clickIncrement, setClickIncrement] = useState<number>(1)
	const [upgradeLevel, setUpgradeLevel] = useState<number>(1)
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

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

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

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
						<Link to='/' onClick={toggleMenu}>
							Главная
						</Link>
						<Link to='/shop' onClick={toggleMenu}>
							Магазин
						</Link>
						<Link to='/upgrade' onClick={toggleMenu}>
							Прокачка
						</Link>
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
								tapCount={clickIncrement}
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
							/>
						}
					/>
				</Routes>
			</div>
		</Router>
	)
}

export default App
