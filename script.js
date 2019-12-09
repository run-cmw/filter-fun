var canvas = document.getElementById("canvas");
var fileInput = null;
var imageOriginal = null;
var imageOriginal2 = null;
var imageOriginal3 = null;
var imageOriginal4 = null;
var imageOriginal5 = null;
var imageOriginal6 = null;
var imageOriginal7 = null;
var imageOriginal8 = null;
var imageOriginal9 = null;
var imageOriginal10 = null;
var imageOutput = null;
var errorMessage = "Image not loaded.";

/**
* Uploads image chosen via file input.
*/
function uploadImage() {
	fileInput = document.getElementById("fileInput");
	imageOriginal = new SimpleImage(fileInput);
	imageOriginal2 = new SimpleImage(fileInput);
	imageOriginal3 = new SimpleImage(fileInput);
	imageOriginal4 = new SimpleImage(fileInput);
	imageOriginal5 = new SimpleImage(fileInput);
	imageOriginal6 = new SimpleImage(fileInput);
  imageOriginal7 = new SimpleImage(fileInput);
  imageOriginal8 = new SimpleImage(fileInput);
  imageOriginal9 = new SimpleImage(fileInput);
  imageOriginal10 = new SimpleImage(fileInput);
  
	imageOriginal.drawTo(canvas);
}

/**
 * Helper to check if image is loaded.
 * @returns {true} if loaded and false otherwise.
 */
function isLoaded() {
  if (imageOutput == null || !imageOutput.complete()) {
    return false;
  } else {
    return true;
  }
}

/**
 * Image modifier: Helper to convert pixels to grayscale.
 */
function filterGray() {
	for(var pixel of imageOutput.values()) {
    var rgbAverage = Math.round((pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3);
    pixel.setRed(rgbAverage);
    pixel.setGreen(rgbAverage);
    pixel.setBlue(rgbAverage);
	}
}

/**
 * Image uploader: Applies grayscale filter and draws to canvas. Alerts if no image is loaded.
 */
function doGrayscale() {
	imageOutput = imageOriginal2;
  
	if (isLoaded()) {
		filterGray();
		imageOutput.drawTo(canvas);
	} else {
		alert(errorMessage);
	}
}

/**
 * Image modifier: Helper to convert pixels to sepia.
 */
function filterSepia() {
	for(var pixel of imageOutput.values()) {
    var red = pixel.getRed();
    var green = pixel.getGreen();
    var blue = pixel.getBlue();
    var tRed = Math.round((red * 0.393) + (green * 0.769) + (blue * 0.189)); // formula for sepia tones
    var tGreen = Math.round((red * 0.349) + (green * 0.686) + (blue * 0.168));
    var tBlue = Math.round((red * 0.272) + (green * 0.534) + (blue * 0.131));
    
    if (tRed > 255) {
      pixel.setRed(255);
    } else {
      pixel.setRed(tRed);
    }
    
    if (tGreen > 255) {
      pixel.setGreen(255);
    } else {
      pixel.setGreen(tGreen);
    }
    
    if (tBlue > 255) {
      pixel.setBlue(255);
    } else {
      pixel.setBlue(tBlue);
    }
  }
}

/**
 * Image uploader: Applies sepia tone filter and draws to canvas. Alerts if no image is loaded.
 */
function doSepiaTone() {
	imageOutput = imageOriginal7;
  
	if (isLoaded()) {
		filterSepia();
		imageOutput.drawTo(canvas);
	} else {
		alert(errorMessage);
	}
}

/**
 * Image modifier: Helper to convert pixels to horizontal rainbow.
 */
function filterHorizontalRainbow() {
	const HEIGHT = imageOutput.getHeight();
  const ONE_SEVENTH = (1/7) * HEIGHT; // Divide into sevenths because using 7 rainbows colors: roygbiv
	const TWO_SEVENTHS = (2/7) * HEIGHT;
	const THREE_SEVENTHS = (3/7) * HEIGHT;
	const FOUR_SEVENTHS = (4/7) * HEIGHT;
	const FIVE_SEVENTHS = (5/7) * HEIGHT;
	const SIX_SEVENTHS = (6/7) * HEIGHT;
  
	for (var pixel of imageOutput.values()) {
    var rgbAverage = Math.round((pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3);
    var yCoordinate = pixel.getY();
  
    if (yCoordinate < ONE_SEVENTH) {
      if (rgbAverage < 128) { // red
        pixel.setRed(rgbAverage * 2);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen((rgbAverage * 2) - 255);
        pixel.setBlue((rgbAverage * 2) - 255);
      }
    } else if (yCoordinate >= ONE_SEVENTH && yCoordinate < TWO_SEVENTHS) {
      if (rgbAverage < 128) { // orange
        pixel.setRed(rgbAverage * 2);
        pixel.setGreen(Math.round(rgbAverage * 0.8));
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen((Math.round(rgbAverage * 1.2)) - 51);
        pixel.setBlue((rgbAverage * 2) - 255);
      }
    } else if (yCoordinate >= TWO_SEVENTHS && yCoordinate < THREE_SEVENTHS) {
      if (rgbAverage < 128) { // yellow
        pixel.setRed(rgbAverage * 2);
        pixel.setGreen(rgbAverage * 2);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue((rgbAverage * 2) - 255);
      }
    } else if (yCoordinate >= THREE_SEVENTHS && yCoordinate < FOUR_SEVENTHS) {
      if (rgbAverage < 128) { // green
        pixel.setRed(0);
        pixel.setGreen(rgbAverage * 2);
        pixel.setBlue(0);
      } else {
        pixel.setRed((rgbAverage * 2) - 255);
        pixel.setGreen(255);
        pixel.setBlue((rgbAverage * 2) - 255);
      }
    } else if (yCoordinate >= FOUR_SEVENTHS && yCoordinate < FIVE_SEVENTHS) {
      if (rgbAverage < 128) { // blue
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(rgbAverage * 2);
      } else {
        pixel.setRed((rgbAverage * 2) - 255);
        pixel.setGreen((rgbAverage * 2) - 255);
        pixel.setBlue(255);
      }
    } else if (yCoordinate >= FIVE_SEVENTHS && yCoordinate < SIX_SEVENTHS) {
      if (rgbAverage < 128) { // indigo
        pixel.setRed(Math.round(rgbAverage * 0.8));
        pixel.setGreen(0);
        pixel.setBlue(rgbAverage * 2);
      } else {
        pixel.setRed((Math.round(rgbAverage * 1.2)) - 51);
        pixel.setGreen((rgbAverage * 2) - 255);
        pixel.setBlue(255);
      }
    } else {
      if (rgbAverage < 128) { // violet
        pixel.setRed(Math.round(rgbAverage * 1.6));
        pixel.setGreen(0);
        pixel.setBlue(Math.round(rgbAverage * 1.6));
      } else {
        pixel.setRed((Math.round(rgbAverage * 0.4)) + 153);
        pixel.setGreen((rgbAverage * 2) - 255);
        pixel.setBlue((Math.round(rgbAverage * 0.4)) + 153);
      }
    }
	}
}

/**
 * Image uploader: Applies horizontal rainbow filter and draws to canvas. Alerts if no image is loaded.
 */
function doHorizontalRainbow() {
	imageOutput = imageOriginal3;
  
	if (isLoaded()) {
		filterHorizontalRainbow();
    imageOutput.drawTo(canvas);
	} else {
		alert(errorMessage);
	}
}

/**
 * Image modifier: Helper to convert pixels to vertical rainbow.
 */
function filterVerticalRainbow() {
	const WIDTH = imageOutput.getWidth();
	const ONE_SEVENTH = (1/7) * WIDTH; // Divide into sevenths because using 7 rainbows colors: roygbiv
	const TWO_SEVENTHS = (2/7) * WIDTH;
	const THREE_SEVENTHS = (3/7) * WIDTH;
	const FOUR_SEVENTHS = (4/7) * WIDTH;
	const FIVE_SEVENTHS = (5/7) * WIDTH;
	const SIX_SEVENTHS = (6/7) * WIDTH;

	for (var pixel of imageOutput.values()) {
    var xCoordinate = pixel.getX();
    var rgbAverage = Math.round((pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3);
  
    if (xCoordinate < ONE_SEVENTH) {
      if (rgbAverage < 128) { // red
        pixel.setRed(rgbAverage * 2);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen((rgbAverage * 2) - 255);
        pixel.setBlue((rgbAverage * 2) - 255);
      }
    } else if (xCoordinate >= ONE_SEVENTH && xCoordinate < TWO_SEVENTHS) {
      if (rgbAverage < 128) { // orange
        pixel.setRed(rgbAverage * 2);
        pixel.setGreen(Math.round(rgbAverage * 0.8));
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen((Math.round(rgbAverage * 1.2)) - 51);
        pixel.setBlue((rgbAverage * 2) - 255);
      }
    } else if (xCoordinate >= TWO_SEVENTHS && xCoordinate < THREE_SEVENTHS) {
      if (rgbAverage < 128) { // yellow
        pixel.setRed(rgbAverage * 2);
        pixel.setGreen(rgbAverage * 2);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue((rgbAverage * 2) - 255);
      }
    } else if (xCoordinate >= THREE_SEVENTHS && xCoordinate < FOUR_SEVENTHS) {
      if (rgbAverage < 128) { // green
        pixel.setRed(0);
        pixel.setGreen(rgbAverage * 2);
        pixel.setBlue(0);
      } else {
        pixel.setRed((rgbAverage * 2) - 255);
        pixel.setGreen(255);
        pixel.setBlue((rgbAverage * 2) - 255);
      }
    } else if (xCoordinate >= FOUR_SEVENTHS && xCoordinate < FIVE_SEVENTHS) {
      if (rgbAverage < 128) { // blue
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(rgbAverage * 2);
      } else {
        pixel.setRed((rgbAverage * 2) - 255);
        pixel.setGreen((rgbAverage * 2) - 255);
        pixel.setBlue(255);
      }
    } else if (xCoordinate >= FIVE_SEVENTHS && xCoordinate < SIX_SEVENTHS) {
      if (rgbAverage < 128) { // indigo
        pixel.setRed(Math.round(rgbAverage * 0.8));
        pixel.setGreen(0);
        pixel.setBlue(rgbAverage * 2);
      } else {
        pixel.setRed((Math.round(rgbAverage * 1.2)) - 51);
        pixel.setGreen((rgbAverage * 2) - 255);
        pixel.setBlue(255);
      }
    } else {
      if (rgbAverage < 128) { // violet
        pixel.setRed(Math.round(rgbAverage * 1.6));
        pixel.setGreen(0);
        pixel.setBlue(Math.round(rgbAverage * 1.6));
      } else {
        pixel.setRed((Math.round(rgbAverage * 0.4)) + 153);
        pixel.setGreen((rgbAverage * 2) - 255);
        pixel.setBlue((Math.round(rgbAverage * 0.4)) + 153);
      }
    }
	}
}

/**
 * Image uploader: Applies vertical rainbow filter and draws to canvas. Alerts if no image is loaded.
 */
function doVerticalRainbow() {
  imageOutput = imageOriginal4;
  
	if (isLoaded()) {
		filterVerticalRainbow();
    imageOutput.drawTo(canvas);
	} else {
		alert(errorMessage);
	}
}

/**
 * Image modifier: Helper to convert pixels to red.
 */
function filterRed() {
	for(var pixel of imageOutput.values()) {
    var rgbAverage = Math.round((pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3);
  
    if (rgbAverage < 128) {
      pixel.setRed(rgbAverage * 2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen((rgbAverage * 2) - 255);
      pixel.setBlue((rgbAverage * 2) - 255) 
    }
  }
}

/**
 * Image uploader: Applies red filter and draws to canvas. Alerts if no image is loaded.
 */
function doRed() {
	imageOutput = imageOriginal5;
  
	if (isLoaded()) {
		filterRed();
    imageOutput.drawTo(canvas);
	} else {
		alert(errorMessage);
	}
}

/**
 * Image modifier: Helper to convert pixels to teal.
 */
function filterTeal() {
	for(var pixel of imageOutput.values()) {
    var rgbAverage = Math.round((pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3);
    var red = 17; // teal rgb values
    var green = 170;
    var blue = 153;
  
    if (rgbAverage < 128) {
      pixel.setRed(rgbAverage * (Math.round(red / 127.5)));
      pixel.setGreen(rgbAverage * (Math.round(green / 127.5)));
      pixel.setBlue(rgbAverage * (Math.round(blue / 127.5)));
    } else {
      pixel.setRed((rgbAverage * (2 - (Math.round(red/127.5)))) * ((2 * red) - 255));
      pixel.setGreen((rgbAverage * (2 - (Math.round(green/127.5)))) * ((2 * green) - 255));
      pixel.setBlue((rgbAverage * (2 - (Math.round(blue/127.5)))) * ((2 * blue) - 255)) 
    }
  }
}

/**
 * Image uploader: Applies teal filter and draws to canvas. Alerts if no image is loaded.
 */
function doTeal() {
	imageOutput = imageOriginal6;
  
	if (isLoaded()) {
		filterTeal();
    imageOutput.drawTo(canvas);
	} else {
		alert(errorMessage);
	}
}

/**
 * Image modifier: Helper to swap pixels with nearby (no more than 10 pixels away) pixels.
 */
function swapPixels(x, y) {
  const WIDTH = imageOutput.getWidth();
  const MAX_PIXEL_DISTANCE = 10;
  var randomPixel = Math.floor(Math.random() * MAX_PIXEL_DISTANCE + 1);
   
  if (((x + randomPixel) > (WIDTH - 1)) && ((y - randomPixel) < 0)) { // if random pixel is greater than width and less than height
    var safeXY = imageOutput.getPixel(WIDTH - 1, 0);
    imageOutput.setPixel(x, y, safeXY);
  } else if ((x + randomPixel) > (WIDTH - 1)) { // if random pixel is greater than width
    var safeX = imageOutput.getPixel(WIDTH - 1, y - randomPixel);
    imageOutput.setPixel(x, y, safeX);
  } else if ((y - randomPixel) < 0) { // if random pixel is less than height
    var safeY = imageOutput.getPixel(x + randomPixel, 0);
    imageOutput.setPixel(x, y, safeY);
  } else { // random pizel is within width and height
    var newPixel = imageOutput.getPixel(x + randomPixel, y - randomPixel);
    imageOutput.setPixel(x, y, newPixel);
  }
}

/**
 * Image modifier: Helper to randomly decide when to blur/swap pixels.
 */
function filterBlur() {
  var imageCopy = imageOriginal10;
  
	for(var pixel of imageOutput.values()) {
    var randomSelection = Math.random();
    var x = pixel.getX();
    var y = pixel.getY();
    var imageCopyPixel = imageCopy.getPixel(x, y);
    
    if (randomSelection > 0.5) {
      pixel.setAllFrom(imageCopyPixel);
      // console.log("Original pixel!");
    } else {
      swapPixels(x, y);
      // console.log("Swap pixel!");
    }
	}
}

/**
 * Image uploader: Applies blur filter and draws to canvas. Alerts if no image is loaded.
 */
function doBlur() {
	imageOutput = imageOriginal9;
  
	if (isLoaded()) {
		filterBlur();
		imageOutput.drawTo(canvas);
	} else {
		alert(errorMessage);
	}
}

/**
 * Image modifier: Helper to convert some pixels to window.
 */
function filterWindow(pixel) {
  pixel.setRed(192); // silver
  pixel.setGreen(192);
  pixel.setBlue(192);
}

/**
 * Image uploader: Applies window filter and draws to canvas. Alerts if no image is loaded.
 */
function doWindowView() {
  imageOutput = imageOriginal8;
  
  if (isLoaded()) {
    for(var pixel of imageOutput.values()) {
      const WIDTH = imageOutput.getWidth();
      const HEIGHT = imageOutput.getHeight();
      var xCoordinate = pixel.getX();
      var yCoordinate = pixel.getY();
      var lineThickness = Math.round(WIDTH * .03);
    
      // border lines
      if (xCoordinate < lineThickness) {
        filterWindow(pixel);
      } 
      if (yCoordinate < lineThickness) {
        filterWindow(pixel);
      }
      if (xCoordinate > (WIDTH - lineThickness)) {
        filterWindow(pixel);
      } 
      if (yCoordinate > (HEIGHT - lineThickness)) {
        filterWindow(pixel);
      }
      // inner lines
      if (xCoordinate > ((WIDTH / 2) - (lineThickness / 2)) && xCoordinate < ((WIDTH / 2) + (lineThickness / 2))) {
        filterWindow(pixel);
      }
      if (yCoordinate > ((HEIGHT / 2) - (lineThickness / 2)) && yCoordinate < ((HEIGHT / 2) + (lineThickness / 2))) {
        filterWindow(pixel);
      }
    }
    imageOutput.drawTo(canvas);
  } else {
    alert(errorMessage);
  }
  
}

/**
 * Draws original image to canvas. Also resets copies of original images so filter is applied to clean slate. 
 * Alerts if no image is loaded.
 */
function resetImage() { 
  if(isLoaded()) {
    imageOutput = imageOriginal;
	  imageOriginal2 = new SimpleImage(fileInput);
    imageOriginal3 = new SimpleImage(fileInput);
    imageOriginal4 = new SimpleImage(fileInput);
    imageOriginal5 = new SimpleImage(fileInput);
    imageOriginal6 = new SimpleImage(fileInput);
    imageOriginal7 = new SimpleImage(fileInput);
    imageOriginal8 = new SimpleImage(fileInput);
    imageOriginal9 = new SimpleImage(fileInput);
    imageOriginal10 = new SimpleImage(fileInput);
    imageOutput.drawTo(canvas);
  } else {
    alert(errorMessage);
  }
}