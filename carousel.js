'use strict';

class Carousel {
  constructor(el) {
    this.el = el;
    this.carouselOptions = ['previous', 'add', 'play', 'next'];
    this.carouselData = [
      {
        'id': '1',
        'src': 'amber draft-1.png',
      },
      {
        'id': '2',
        'src': 'Amber1.JPG',
      },
      {
        'id': '3',
        'src': 'Amber2.PNG',
      },
      {
        'id': '4',
        'src': 'Amber3.PNG',
      },
      {
        'id': '5',
        'src': 'Ardwyn.PNG',
      },
      {
        'id': '6',
        'src': 'Aspen1.PNG',
      },
      {
        'id': '7',
        'src': 'Blaze1.PNG',
      },
      {
        'id': '8',
        'src': 'blink train-1.png',
      },
      {
        'id': '9',
        'src': 'Bri.JPG',
      },
      {
        'id': '10',
        'src': 'Cece.JPG',
      },
      {
        'id': '11',
        'src': 'Cleo1.PNG',
      },
      {
        'id': '12',
        'src': 'ezzy sketch that never got finished (1)-1.png',
      },
      {
        'id': '13',
        'src': 'Faye1.PNG',
      },
      {
        'id': '14',
        'src': 'Felicity1.PNG',
      },
      {
        'id': '15',
        'src': 'Gwen1.PNG',
      },
      {
        'id': '16',
        'src': 'Gwen2.PNG',
      },
      {
        'id': '17',
        'src': 'Harmonials_.png',
      },
      {
        'id': '18',
        'src': 'Harper1.JPG',
      },
      {
        'id': '19',
        'src': 'Harper2.PNG',
      },
      {
        'id': '20',
        'src': 'Harper3.PNG',
      },
      {
        'id': '21',
        'src': 'isla zorin head of guard sketch-1.png',
      },
      {
        'id': '22',
        'src': 'June1.PNG',
      },
      {
        'id': '23',
        'src': 'June2.PNG',
      },
      {
        'id': '24',
        'src': 'juniper and liana-1.png',
      },
      {
        'id': '25',
        'src': 'juniper and liana-2.png',
      },
      {
        'id': '26',
        'src': 'liana progression concept-1.png',
      },
      {
        'id': '27',
        'src': 'Liana1.JPEG',
      },
      {
        'id': '28',
        'src': 'Liana2.PNG',
      },
      {
        'id': '29',
        'src': 'Liana3.PNG',
      },
      {
        'id': '30',
        'src': 'Liana4.JPG',
      },
      {
        'id': '31',
        'src': 'Liana5.JPG',
      },
      {
        'id': '32',
        'src': 'more whp sorta world stuff-1.png',
      },
      {
        'id': '33',
        'src': 'old aspen and felicity draft ref body-1.png',
      },
      {
        'id': '34',
        'src': 'old sabel-1.png',
      },
      {
        'id': '35',
        'src': 'oldversion.JPG',
      },
      {
        'id': '36',
        'src': 'Osiris.PNG',
      },
      {
        'id': '37',
        'src': 'pegasus2.PNG',
      },
      {
        'id': '38',
        'src': 'sortaLiana.png',
      },
      {
        'id': '39',
        'src': 'symbol1.PNG',
      },
      {
        'id': '40',
        'src': 'symbol2.PNG',
      },
      {
        'id': '41',
        'src': 'symbol3.PNG',
      },
      {
        'id': '42',
        'src': 'whp stuff-1.png',
      },
      {
        'id': '43',
        'src': 'whp v1 😬-1.png',
      },
      {
        'id': '44',
        'src': 'whp v1-1.png',
      },
      {
        'id': '45',
        'src': 'whp worldbuilding stuffs-01.png',
      },
      {
        'id': '46',
        'src': 'whp worldbuilding stuffs-07.png',
      },
      {
        'id': '47',
        'src': 'whp worldbuilding stuffs-08.png',
      },
      {
        'id': '48',
        'src': 'whp worldbuilding stuffs-09.png',
      },
      {
        'id': '49',
        'src': 'whp worldbuilding stuffs-10.png',
      },
      {
        'id': '50',
        'src': 'whp worldbuilding stuffs-11.png',
      },
      {
        'id': '51',
        'src': 'whp worldbuilding stuffs-12.png',
      },
      {
        'id': '52',
        'src': 'whp worldbuilding stuffs-14.png',
      },
      {
        'id': '53',
        'src': 'whp worldbuilding stuffs-16.png',
      },
      {
        'id': '54',
        'src': 'whp worldbuilding stuffs-17.png',
      },
      {
        'id': '55',
        'src': 'whp worldbuilding stuffs-18.png',
      },
      {
        'id': '56',
        'src': 'whp worldbuilding stuffs-19.png',
      },
      {
        'id': '57',
        'src': 'whpoldish.PNG',
      },
      {
        'id': '58',
        'src': 'wings.PNG',
      },
      {
        'id': '59',
        'src': 'with her blurred lines-1.png',
      }
    ];
    this.carouselInView = [1, 2, 3, 4, 5];
    this.carouselContainer;
    this.carouselPlayState;
  }

  mounted() {
    this.setupCarousel();
  }

  // Build carousel html
  setupCarousel() {
    const container = document.createElement('div');
    const controls = document.createElement('div');

    // Add container for carousel items and controls
    this.el.append(container, controls);
    container.className = 'carousel-container';
    controls.className = 'carousel-controls';

    // Take dataset array and append items to container
    this.carouselData.forEach((item, index) => {
      const carouselItem = item.src ? document.createElement('img') : document.createElement('div');

      container.append(carouselItem);
      
      // Add item attributes
      carouselItem.className = `carousel-item carousel-item-${index + 1}`;
      carouselItem.src = item.src;
      carouselItem.setAttribute('loading', 'lazy');
      // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
      carouselItem.setAttribute('data-index', `${index + 1}`);
    });

    this.carouselOptions.forEach((option) => {
      if (option != 'add') {
        const btn = document.createElement('button');
        const axSpan = document.createElement('span');
  
        // Add accessibilty spans to button
        axSpan.innerText = option;
        axSpan.className = 'ax-hidden';
        btn.append(axSpan);
  
        // Add button attributes
        btn.className = `carousel-control carousel-control-${option}`;
        btn.setAttribute('data-name', option);
  
        // Add carousel control options
        controls.append(btn);
      }
    });

    // After rendering carousel to our DOM, setup carousel controls' event listeners
    this.setControls([...controls.children]);

    // Set container property
    this.carouselContainer = container;
  }

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = (event) => {
        event.preventDefault();

        // Manage control actions, update our carousel data first then with a callback update our DOM
        this.controlManager(control.dataset.name);
      };
    });
  }

  controlManager(control) {
    if (control === 'previous') return this.previous();
    if (control === 'next') return this.next();
   /* if (control === 'add') return this.add();*/
    if (control === 'play') return this.play();

    return;
  }

  previous() {
    // Update order of items in data array to be shown in carousel
    this.carouselData.unshift(this.carouselData.pop());

    // Push the first item to the end of the array so that the previous item is front and center
    this.carouselInView.push(this.carouselInView.shift());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  next() {
    // Update order of items in data array to be shown in carousel
    this.carouselData.push(this.carouselData.shift());

    // Take the last item and add it to the beginning of the array so that the next item is front and center
    this.carouselInView.unshift(this.carouselInView.pop());

    // Update the css class for each carousel item in view
    this.carouselInView.forEach((item, index) => {
      this.carouselContainer.children[index].className = `carousel-item carousel-item-${item}`;
    });

    // Using the first 5 items in data array update content of carousel items in view
    this.carouselData.slice(0, 5).forEach((data, index) => {
      document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
    });
  }

  /* add() {
    const newItem = {
      'id': '',
      'src': '',
    };
    const lastItem = this.carouselData.length;
    const lastIndex = this.carouselData.findIndex(item => item.id == lastItem);
    
    // Assign properties for new carousel item
    Object.assign(newItem, {
      id: `${lastItem + 1}`,
      src: `http://fakeimg.pl/300/?text=${lastItem + 1}`
    });

    // Then add it to the "last" item in our carouselData
    this.carouselData.splice(lastIndex + 1, 0, newItem);

    // Shift carousel to display new item
    this.next();
  } */

  play() {
    const playBtn = document.querySelector('.carousel-control-play');
    const startPlaying = () => this.next();

    if (playBtn.classList.contains('playing')) {
      // Remove class to return to play button state/appearance
      playBtn.classList.remove('playing');

      // Remove setInterval
      clearInterval(this.carouselPlayState); 
      this.carouselPlayState = null; 
    } else {
      // Add class to change to pause button state/appearance
      playBtn.classList.add('playing');

      // First run initial next method
      this.next();

      // Use play state prop to store interval ID and run next method on a 1.5 second interval
      this.carouselPlayState = setInterval(startPlaying, 1500);
    };
  }

}

// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
const el = document.querySelector('.carousel');
// Create a new carousel object
const exampleCarousel = new Carousel(el);
// Setup carousel and methods
exampleCarousel.mounted();

//el: whp drafts
