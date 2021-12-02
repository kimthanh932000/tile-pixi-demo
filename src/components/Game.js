import React, { useRef, useEffect } from "react";
import * as pixi from "pixi.js";
import TileUtilities from "pixi-tile-utilities";

const Game = () => {

	const ref = useRef(null);
	const PIXI = pixi

	useEffect(() => {
		const app = new PIXI.Application({
			width: 800,
			height: 600,
			backgroundColor: "0xAAAAAA",
		});
		let tu = new TileUtilities(PIXI)

		// Add app to DOM
		ref.current.appendChild(app.view);

		const showProgress = (e) => {
			console.log(e.progress)
		}

		const reportError = (e) => {
			console.log('ERROR: ', e)
		}

		const doneLoading = (e) => {
			console.log('DONE LOADING!', PIXI.loader.resources['image'])
			let world = tu.makeIsoTiledWorld('map', PIXI.loader.resources['image'].texture)
		}

		PIXI.loader.add('map', '/assets/map/Isometricmap.json')
		PIXI.loader.add('image', '/assets/images/Iso.png')


		PIXI.loader.onProgress.add(showProgress)
        PIXI.loader.onComplete.add(doneLoading)
        PIXI.loader.onError.add(reportError)

        PIXI.loader.load()

		// Start the PixiJS app
		// app.start();

		return () => {
			// On unload completely destroy the application and all of it's children
			app.destroy(true, true);
		};
	}, []);

	return <div ref={ref}></div>;
};

export default Game;
