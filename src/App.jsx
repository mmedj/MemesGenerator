import React, { useEffect, useState } from 'react'

// React Router
import { Routes, Route, useLocation, useMatch } from 'react-router-dom'

// Components
import Navbar from './components/Navbar'
import MemeTemplates from './components/MemeTemplates'
import Meme from './components/Meme'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'

// Styles
import GlobalStyle from './GlobalStyle'

const App = () => {
	const [allMemes, setAllMemes] = useState([])
	const [meme, setMeme] = useState(JSON.parse(localStorage.getItem('MEME')))
	const [isVisible, setIsVisible] = useState(false)
	const location = useLocation()




	return (
		<>
			<Navbar />
			<div style={{height:"100px"}}></div>

			<Routes>
				{useMatch('/') && (
					<Route
						index
						path='/'
						element={<MemeTemplates allMemes={allMemes} setMeme={setMeme} />}
					/>
				)}
				<Route path='/meme/:id' element={<Meme meme={meme} setMeme={setMeme} />} />
			</Routes>
			{isVisible && <ScrollToTop />}
			<GlobalStyle />
		</>
	)
}

export default App
