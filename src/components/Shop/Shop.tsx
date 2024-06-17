import React from 'react'
import './Shop.css'

interface ShopProps {
	currency: number
	onBuySkin: (skin: string, cost: number) => void
}

const Shop: React.FC<ShopProps> = ({ currency, onBuySkin }) => {
	const skins = [
		{ name: 'Красный', skin: 'red', cost: 100 },
		{ name: 'Зелёный', skin: 'green', cost: 100 },
		{ name: 'Синий', skin: 'blue', cost: 100 },
		{
			name: 'Градиент 1',
			skin: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			cost: 200,
		},
		{
			name: 'Градиент 2',
			skin: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
			cost: 400,
		},
	]

	return (
		<div className='shop'>
			<h2>Магазин скинов</h2>
			<div className='skins'>
				{skins.map(skin => (
					<div
						key={skin.name}
						className='skin'
						onClick={() => onBuySkin(skin.skin, skin.cost)}
						style={{ background: skin.skin }}
					>
						{skin.name} - {skin.cost} монет
					</div>
				))}
			</div>
			<div className='currency-display'>Текущая валюта: {currency}</div>
		</div>
	)
}

export default Shop
