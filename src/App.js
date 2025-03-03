import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import './App.css';

// Función para generar una paleta de colores aleatoria
const generateRandomPalette = () => {
  const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
  return [randomColor(), randomColor(), randomColor(), randomColor(), randomColor()];
};

function App() {
  const [color, setColor] = useState('#ff0000'); // Color seleccionado
  const [secondColor, setSecondColor] = useState('#0000ff'); // Segundo color para combinar
  const [favorites, setFavorites] = useState([]); // Colores favoritos
  const [showFavorites, setShowFavorites] = useState(false); // Para mostrar/ocultar los favoritos
  const [randomPalette, setRandomPalette] = useState(generateRandomPalette()); // Paleta aleatoria

  // Cambiar el color seleccionado
  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };

  // Cambiar el segundo color
  const handleSecondColorChange = (color) => {
    setSecondColor(color.hex);
  };

  // Función para combinar dos colores
  const blendColors = (color1, color2) => {
    const hexToRgb = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return { r, g, b };
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const blendedRgb = {
      r: Math.round((rgb1.r + rgb2.r) / 2),
      g: Math.round((rgb1.g + rgb2.g) / 2),
      b: Math.round((rgb1.b + rgb2.b) / 2)
    };

    return `rgb(${blendedRgb.r}, ${blendedRgb.g}, ${blendedRgb.b})`;
  };

  // Guardar un color en los favoritos
  const saveFavorite = () => {
    if (!favorites.includes(color)) {
      setFavorites([...favorites, color]);
    }
  };

  // Eliminar color de favoritos
  const removeFavorite = (colorToRemove) => {
    setFavorites(favorites.filter(fav => fav !== colorToRemove));
  };

  // Obtener color de texto en función del color de fondo
  const getTextColor = (color) => {
    const hex = color.replace('#', '');
    const rgb = parseInt(hex, 16);
    const brightness = (rgb >> 16) + ((rgb >> 8) & 0x00FF) + (rgb & 0x0000FF);
    return brightness > 128 ? 'black' : 'white';
  };

  return (
    <div className="App">
      <header>
        <h1>Estudio de Color</h1>
        <p>Explora combinaciones de colores, guarda tus favoritos y descubre nuevas paletas.</p>
      </header>

      <div className="color-picker-section">
        <div className="color-picker">
          <h2>Selecciona tu color</h2>
          <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
        </div>

        <div className="color-picker">
          <h2>Selecciona un segundo color</h2>
          <ChromePicker color={secondColor} onChangeComplete={handleSecondColorChange} />
        </div>

        <div className="save-color">
          <button onClick={saveFavorite}>Guardar en Favoritos</button>
        </div>
      </div>

      <div className="color-display">
        <div className="color-box" style={{ backgroundColor: color, color: getTextColor(color) }}>
          <p>Color seleccionado: {color}</p>
        </div>

        <div className="color-box" style={{ backgroundColor: secondColor, color: getTextColor(secondColor) }}>
          <p>Segundo color seleccionado: {secondColor}</p>
        </div>

        <div className="color-box" style={{ backgroundColor: blendColors(color, secondColor), color: getTextColor(blendColors(color, secondColor)) }}>
          <p>Color combinado: {blendColors(color, secondColor)}</p>
        </div>
      </div>

      <div className="random-palettes">
        <h2>Paletas de colores aleatorias</h2>
        <div className="palette-container">
          {randomPalette.map((color, index) => (
            <div key={index} className="palette" style={{ backgroundColor: color }}>
              <p>{color}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setRandomPalette(generateRandomPalette())}>Generar nueva paleta</button>
      </div>

      <div className="favorite-colors">
        <button onClick={() => setShowFavorites(!showFavorites)}>
          {showFavorites ? 'Ocultar Favoritos' : 'Mostrar Favoritos'}
        </button>

        {showFavorites && (
          <div className="favorites-list">
            {favorites.length === 0 ? (
              <p>No tienes colores favoritos aún.</p>
            ) : (
              favorites.map((favColor, index) => (
                <div key={index} className="favorite-color" style={{ backgroundColor: favColor }}>
                  <span>{favColor}</span>
                  <button onClick={() => removeFavorite(favColor)}>Eliminar</button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
