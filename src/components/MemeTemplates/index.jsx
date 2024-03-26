import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Style.css'; // Import the CSS file with the defined classes

const MemeTemplates = ({ setMeme }) => {
    const [allMemes, setAllMemes] = useState([]);
    const [displayedMemes, setDisplayedMemes] = useState(8); // Initial displayed memes count

    useEffect(() => {
        const getMemes = async () => {
            try {
                const res = await fetch('https://api.imgflip.com/get_memes');
                const data = await res.json();
                setAllMemes(data.data.memes);
            } catch (error) {
                console.error(error);
            }
        };
        getMemes();
    }, []);

    const showMoreMemes = () => {
        setDisplayedMemes(displayedMemes + 8); // Show additional 8 memes
    };

    const showLessMemes = () => {
        setDisplayedMemes(8); // Show only initial 8 memes
    };

    return (
        <div className="container">
            <h1>Pick Your Meme Template</h1>
            <div className="Content">
                {allMemes.slice(0, displayedMemes).map((meme) => (
                    <div className="Template" key={meme.id}>
                        <Link to={`/meme/${meme.id}`} onClick={() => setMeme(meme)}>
                            <div className="imgWrapper">
                                <img src={meme.url} alt={meme.name} />
                            </div>
                        </Link>
                        <div className="row memeName">
                            <h4 className="col-10">{meme.name}</h4>
                            <i className="col-2 fa-regular fa-heart"></i>
                        </div>
                    </div>
                ))}
            </div>
            {displayedMemes < 9 ? (
                <button onClick={showMoreMemes}>Show More</button>
            ) : (<>
				<button onClick={showMoreMemes}>Show More</button>

                <button onClick={showLessMemes}>Show Less</button>
				</>
            )}
        </div>
    );
};

export default MemeTemplates;
