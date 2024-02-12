'use strict';

class Carousel {

  constructor(carous, carou) {
    this.el = carous;
    this.carouselData = carou;
    this.carouselInView = [1, 2, 3, 4, 5];
    this.carouselContainer;
    this.carouselPlayState;
    this.carouselOptions = ['previous', 'add', 'play', 'next'];
    console.log(this);
    console.log(this.el);
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
    this.forEachsetControls([...controls.children]);

    // Set container property
    this.carouselContainer = container;
  }

  forEachsetControls(controls) {
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
      this.el.querySelector(`.carousel-item-${index + 1}`).src = data.src;
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
      this.el.querySelector(`.carousel-item-${index + 1}`).src = data.src;
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
    console.log("carousel: " + JSON.stringify(this));
    const playBtn = this.el.querySelector('.carousel-control-play');
    const startPlaying = () => this.next();

    console.log(playBtn.classList);
    if (playBtn.classList.contains('playing')) {
      // Remove class to return to play button state/appearance
      playBtn.classList.remove('playing');
      console.log("heyyy the if is working");

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
const whp = document.querySelector('.carousel');
const dd = document.querySelector('.carousel2');
const wd = document.querySelector('.carousel3');
const wb = document.querySelector('.carousel4');
const fl = document.querySelector('.carousel5');
const wd2 = document.querySelector('.carousel6');
// Create a new carousel object

let carousel1 = [
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
    'src': 'cece.JPG',
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
  },
  {
    'id': '60',
    'src': 'hand.PNG',
  },
  {
    'id': '61',
    'src': 'Miri1.PNG',
  },
  {
    'id': '62',
    'src': 'lic.jpg',
  },
  {
    'id': '63',
    'src': 'muralwhpsketch.jpg',
  },
  {
    'id': '64',
    'src': 'whp pets.jpg',
  },
  {
    'id': '65',
    'src': 'bedroomsketch.jpg',
  },
  {
    'id': '66',
    'src': 'june sketch.jpg',
  },
  {
    'id': '67',
    'src': 'whblsketch.jpg',
  },
  {
    'id': '68',
    'src': 'ardwyn1.jpg',
  },
  {
    'id': '69',
    'src': 'ardwyn2.jpg',
  },
  {
    'id': '70',
    'src': 'ardwyn3.jpg',
  },
  {
    'id': '71',
    'src': 'ardwyn4.jpg',
  },
  {
    'id': '72',
    'src': 'ardwyn5.jpg',
  },
  {
    'id': '73',
    'src': 'ardwyn6.jpg',
  },
  {
    'id': '74',
    'src': 'ardwyn7.jpg',
  },
  {
    'id': '75',
    'src': 'ardwyn8.jpg',
  },
  {
    'id': '76',
    'src': 'ardwyn9.jpg',
  },
  {
    'id': '77',
    'src': 'mtainsley.jpg',
  },
  {
    'id': '78',
    'src': 'june3.jpg',
  },
  {
    'id': '79',
    'src': 'Juniper_Blythe.PNG',
  },
  {
    'id': '80',
    'src': 'gwenandbri.png',
  }
];

let carousel2 =  [{
  'id': '1',
  'src': 'A_New_Start.png',
},
{
  'id': '2',
  'src': 'abstractdoodle.png',
},
{
  'id': '3',
  'src': 'abstractsortaelephant.jpg',
},
{
  'id': '4',
  'src': 'along.png',
},
{
  'id': '5',
  'src': 'strawberrygirldoodle.png',
},
{
  'id': '6',
  'src': 'art perspective project-1.png',
},
{
  'id': '7',
  'src': 'autumn-1.png',
},
{
  'id': '8',
  'src': 'awe.JPG',
},
{
  'id': '9',
  'src': 'birdiee-1.png',
},
{
  'id': '10',
  'src': 'bluewingmagazine.jpg',
},
{
  'id': '11',
  'src': 'break.png',
},
{
  'id': '12',
  'src': 'classroom.JPEG',
},
{
  'id': '13',
  'src': 'cloudy soars spark-1.png',
},
{
  'id': '14',
  'src': 'dogdoodle.png',
},
{
  'id': '15',
  'src': 'doggo-1.png',
},
{
  'id': '16',
  'src': 'dogish.JPG',
},
{
  'id': '17',
  'src': 'doodles.JPG',
},
{
  'id': '18',
  'src': 'doryarmy.png',
},
{
  'id': '19',
  'src': 'elsaa!!-1.png',
},
{
  'id': '20',
  'src': 'emoji maker-1.png',
},
{
  'id': '21',
  'src': 'fall.jpg',
},
{
  'id': '22',
  'src': 'famous painting redo I think…-1.png',
},
{
  'id': '23',
  'src': 'fishie.png',
},
{
  'id': '24',
  'src': 'fishies.JPG',
},
{
  'id': '25',
  'src': 'fox1.JPG',
},
{
  'id': '26',
  'src': 'fox2.jpg',
},
{
  'id': '27',
  'src': 'fox3.JPG',
},
{
  'id': '28',
  'src': 'froggyplanet.heic',
},
{
  'id': '29',
  'src': 'girl1.PNG',
},
{
  'id': '30',
  'src': 'girl2.PNG',
},
{
  'id': '31',
  'src': 'grants1.png',
},
{
  'id': '32',
  'src': 'grants2.png',
},
{
  'id': '33',
  'src': 'hair sketch-1.png',
},
{
  'id': '34',
  'src': 'Indigo.PNG',
},
{
  'id': '35',
  'src': 'heart from elementary school-1.png',
},
{
  'id': '36',
  'src': 'hill-1.png',
},
{
  'id': '37',
  'src': 'holdhands.JPEG',
},
{
  'id': '38',
  'src': 'horsey.JPG',
},
{
  'id': '39',
  'src': 'house.jpg',
},
{
  'id': '40',
  'src': 'house2.jpg',
},
{
  'id': '41',
  'src': 'house3.jpg',
},
{
  'id': '42',
  'src': 'house4.jpg',
},
{
  'id': '43',
  'src': 'jewishclassroomsketch.png',
},
{
  'id': '44',
  'src': 'Kai_s_Cats.png',
},
{
  'id': '45',
  'src': 'key to the locket-1.png',
},
{
  'id': '46',
  'src': 'kid multidimensional sketch-1.png',
},
{
  'id': '47',
  'src': 'know.png',
},
{
  'id': '48',
  'src': 'lollipop rain girl comic-1.png',
},
{
  'id': '49',
  'src': 'me from 7th grade I think-1.png',
},
{
  'id': '50',
  'src': 'mosaic doodle-1.png',
},
{
  'id': '51',
  'src': 'mrs. _ her grandbaby.png',
},
{
  'id': '52',
  'src': 'moreplant.png',
},
{
  'id': '53',
  'src': 'Mrs._Doneghy_s_Pic.png',
},
{
  'id': '54',
  'src': 'mushrooms.JPEG',
},
{
  'id': '55',
  'src': 'no doubt logos-1.png',
},
{
  'id': '56',
  'src': 'nodoubtlogo.PNG',
},
{
  'id': '57',
  'src': 'pandashirt.jpg',
},
{
  'id': '58',
  'src': 'pear.JPEG',
},
{
  'id': '59',
  'src': 'penguin and owl-1.png',
},
{
  'id': '60',
  'src': 'plant1.png',
},
{
  'id': '61',
  'src': 'plant2.png',
},
{
  'id': '62',
  'src': 'plantchalk.png',
},
{
  'id': '63',
  'src': 'pumpkin.JPG',
},
{
  'id': '64',
  'src': 'rainbowdoodle.png',
},
{
  'id': '65',
  'src': 'rainbowflowers.jpg',
},
{
  'id': '66',
  'src': 'rainbowplant.JPG',
},
{
  'id': '67',
  'src': 'reallybadlorrainethatneedstogetredrawn.png',
},
{
  'id': '68',
  'src': 'Remi.PNG',
},
{
  'id': '69',
  'src': 'rift.JPG',
},
{
  'id': '70',
  'src': 'sea.jpg',
},
{
  'id': '71',
  'src': 'self portrait art-1.png',
},
{
  'id': '72',
  'src': 'sisss.PNG',
},
{
  'id': '73',
  'src': 'Sisterly_Love.png',
},
{
  'id': '74',
  'src': 'squares.png',
},
{
  'id': '75',
  'src': 'Stephenson_s_Dog.png',
},
{
  'id': '76',
  'src': 'superbabies.png',
},
{
  'id': '77',
  'src': 'tulsi witch-1.png',
},
{
  'id': '78',
  'src': 'treee-1.png',
},
{
  'id': '79',
  'src': 'uh oh weird dimensions and aliens!-1.png',
},
{
  'id': '80',
  'src': 'typewriter.PNG',
},
{
  'id': '81',
  'src': 'Untitled-Artwork.PNG',
},
{
  'id': '82',
  'src': 'vanellopesketch.png',
},
{
  'id': '83',
  'src': 'vanellope character designing-1.png',
},
{
  'id': '84',
  'src': 'wateringcan.PNG',
},
{
  'id': '85',
  'src': 'witchdoodle.png',
},
{
  'id': '86',
  'src': 'wooooo-1.png',
},
{
  'id': '87',
  'src': 'camile.jpg',
},
{
  'id': '88',
  'src': 'camp everwood-1.png',
},
{
  'id': '89',
  'src': 'Bubblegum-Rose.PNG',
},
{
  'id': '90',
  'src': 'Buddy___Sammy.png',
},
{
  'id': '90',
  'src': 'business.png',
},
{
  'id': '91',
  'src': 'darrowsiblings.JPG',
},
{
  'id': '92',
  'src': 'meee.PNG',
},
{
  'id': '93',
  'src': 'dedo1.jpg',
},
{
  'id': '94',
  'src': 'dedo2.jpg',
},
{
  'id': '95',
  'src': 'dedo3.jpg',
},
{
  'id': '96',
  'src': 'dedo4.jpg',
},
{
  'id': '97',
  'src': 'dedo5.jpg',
},
{
  'id': '98',
  'src': 'dedo6.jpg',
},
{
  'id': '99',
  'src': 'dedo7.jpg',
},
{
  'id': '100',
  'src': 'dedo8.PNG',
},
{
  'id': '101',
  'src': 'dedo9.jpg',
},
{
  'id': '102',
  'src': 'invis1.PNG',
},
{
  'id': '103',
  'src': 'invis2.PNG',
},
{
  'id': '104',
  'src': 'invis3.PNG',
},
{
  'id': '105',
  'src': 'invis4.PNG',
},
{
  'id': '106',
  'src': 'invis5.GIF',
},
{
  'id': '107',
  'src': 'invis6.PNG',
},
{
  'id': '108',
  'src': 'invis7.jpg',
},
{
  'id': '109',
  'src': 'invis8.jpg',
},
{
  'id': '110',
  'src': 'invis9.jpg',
},
{
  'id': '111',
  'src': 'ghost1.jpg',
},
{
  'id': '112',
  'src': 'ghost2.jpg',
},
{
  'id': '113',
  'src': 'gigi and bepa.jpg',
},
{
  'id': '114',
  'src': '_Mom_Spot_The_Difference 1.PNG',
},
{
  'id': '115',
  'src': '_Mom_Spot_The_Difference.PNG',
},
{
  'id': '116',
  'src': 'aura.PNG',
},
{
  'id': '117',
  'src': 'growth.PNG',
},
{
  'id': '118',
  'src': 'no doubt.PNG',
},
{
  'id': '119',
  'src': 'Tay_.PNG',
},
{
'id': '120',
'src': 'profile pic.png',
},
{
  'id': '121',
  'src': '0.png',
},
{
  'id': '122',
  'src': '1.png',
}
];


let carousel3 =  [
{
  'id': '1',
  'src': 'Amelia-(WD).PNG',
},
{
  'id': '2',
  'src': 'Auggie-(WD).PNG',
},
{
  'id': '3',
  'src': 'Clare-(WD).PNG',
},
{
  'id': '4',
  'src': 'Edith-(WD).PNG',
},
{
  'id': '5',
  'src': 'Ending_(WD).png',
},
{
  'id': '6',
  'src': 'Everett-(WD).PNG',
},
{
  'id': '7',
  'src': 'Laurence-(WD).PNG',
},
{
  'id': '8',
  'src': 'Lottie-(WD).PNG',
},
{
  'id': '9',
  'src': 'Peren-(WD).PNG',
},
{
  'id': '10',
  'src': 'whoopsiedaisiesposter.PNG',
},
{
  'id': '11',
  'src': 'whoopsie daisies concept game-1.png',
},
{
  'id': '12',
  'src': 'thanksforplayingbetter.PNG',
},
{
  'id': '13',
  'src': 'map.JPG',
},
];

let carousel6 =  [
  {
    'id': '1',
    'src': 'Amelia-(WD).PNG',
  },
  {
    'id': '2',
    'src': 'Auggie-(WD).PNG',
  },
  {
    'id': '3',
    'src': 'Clare-(WD).PNG',
  },
  {
    'id': '4',
    'src': 'Edith-(WD).PNG',
  },
  {
    'id': '5',
    'src': 'Ending_(WD).png',
  },
  {
    'id': '6',
    'src': 'Everett-(WD).PNG',
  },
  {
    'id': '7',
    'src': 'Laurence-(WD).PNG',
  },
  {
    'id': '8',
    'src': 'Lottie-(WD).PNG',
  },
  {
    'id': '9',
    'src': 'Peren-(WD).PNG',
  },
  {
    'id': '10',
    'src': 'whoopsiedaisiesposter.PNG',
  },
  {
    'id': '11',
    'src': 'whoopsie daisies concept game-1.png',
  },
  {
    'id': '12',
    'src': 'thanksforplayingbetter.PNG',
  },
  {
    'id': '13',
    'src': 'map.JPG',
  },
  ];
  

let carousel4 =  [
  {
    'id': '1',
    'src': 'base1.jpg',
  },
  {
    'id': '2',
    'src': 'base2.jpg',
  },
  {
    'id': '3',
    'src': 'base3.jpg',
  },
  {
    'id': '4',
    'src': 'base4.jpg',
  },
  {
    'id': '5',
    'src': 'base5.jpg',
  },
  {
    'id': '6',
    'src': 'base6.jpg',
  },
  {
    'id': '7',
    'src': 'base7.jpg',
  },
  {
    'id': '8',
    'src': 'basea-1.PNG',
  },
  {
    'id': '9',
    'src': 'basea-2.PNG',
  },
  {
    'id': '10',
    'src': 'basea-3.PNG',
  },
  {
    'id': '11',
    'src': 'basea-4.PNG',
  },
  {
    'id': '12',
    'src': 'basea-5.PNG',
  },
  {
    'id': '13',
    'src': 'basea-6.PNG',
  },
  {
    'id': '14',
    'src': 'basea-7.PNG',
  },
  {
    'id': '15',
    'src': 'basea-8.PNG',
  },
  {
    'id': '16',
    'src': 'basea-9.PNG',
  },
  {
    'id': '17',
    'src': 'basea-10.PNG',
  },
  {
    'id': '18',
    'src': 'basea-11.PNG',
  },
  {
    'id': '19',
    'src': 'basea-12.PNG',
  },
  {
    'id': '20',
    'src': 'character maker-1.png',
  },
  {
    'id': '21',
    'src': 'characterLayout.JPG',
  },
  {
    'id': '22',
    'src': 'charactermakermockup.png',
  },
  {
    'id': '23',
    'src': 'ears.png',
  },
  {
    'id': '24',
    'src': 'ears1.jpg',
  },
  {
    'id': '25',
    'src': 'ears2.jpg',
  },
  {
    'id': '26',
    'src': 'eyes.jpg',
  },
  {
    'id': '27',
    'src': 'eyeseyebrows.png',
  },
  {
    'id': '28',
    'src': 'headshapes.png',
  },
  {
    'id': '29',
    'src': 'hair1.png',
  },
  {
    'id': '30',
    'src': 'hair2.png',
  },
  {
    'id': '31',
    'src': 'hair3.png',
  },
  {
    'id': '32',
    'src': 'hair4.png',
  },
  {
    'id': '33',
    'src': 'hats.png',
  },
  {
    'id': '34',
    'src': 'horns1.jpg',
  },
  {
    'id': '35',
    'src': 'humanlegs.png',
  },
  {
    'id': '36',
    'src': 'humannoses.png',
  },
  {
    'id': '37',
    'src': 'jackets1.png',
  },
  {
    'id': '38',
    'src': 'jackets2.png',
  },
  {
    'id': '39',
    'src': 'jackets3.png',
  },
  {
    'id': '40',
    'src': 'jackets4.png',
  },
  {
    'id': '41',
    'src': 'jackets5.png',
  },
  {
    'id': '42',
    'src': 'jackets6.png',
  },
  {
    'id': '43',
    'src': 'jackets7.png',
  },
  {
    'id': '44',
    'src': 'jewelry1.png',
  },
  {
    'id': '45',
    'src': 'jewelry2.png',
  },
  {
    'id': '46',
    'src': 'jewelry3.png',
  },
  {
    'id': '47',
    'src': 'jewelry4.png',
  },
  {
    'id': '48',
    'src': 'jewelry5.png',
  },
  {
    'id': '49',
    'src': 'jewelry6.png',
  },
  {
    'id': '50',
    'src': 'legs1.jpg',
  },
  {
    'id': '51',
    'src': 'legs2.jpg',
  },
  {
    'id': '52',
    'src': 'legs3.jpg',
  },
  {
    'id': '53',
    'src': 'mouths.png',
  },
  {
    'id': '54',
    'src': 'nose1.jpg',
  },
  {
    'id': '55',
    'src': 'overalls1.png',
  },
  {
    'id': '56',
    'src': 'pants1.png',
  },
  {
    'id': '57',
    'src': 'pants2.png',
  },
  {
    'id': '58',
    'src': 'pants3.png',
  },
  {
    'id': '59',
    'src': 'pattern1.jpg',
  },
  {
    'id': '60',
    'src': 'pattern2.jpg',
  },
  {
    'id': '61',
    'src': 'pattern3.jpg',
  },
  {
    'id': '62',
    'src': 'shells1.jpg',
  },
  {
    'id': '63',
    'src': 'shirts1.png',
  },
  {
    'id': '64',
    'src': 'shirts2.png',
  },
  {
    'id': '65',
    'src': 'shirts3.png',
  },
  {
    'id': '66',
    'src': 'shirts4.png',
  },
  {
    'id': '67',
    'src': 'shirts5.png',
  },
  {
    'id': '68',
    'src': 'shirts6.png',
  },
  {
    'id': '69',
    'src': 'shirts7.png',
  },
  {
    'id': '70',
    'src': 'shirts8.png',
  },
  {
    'id': '71',
    'src': 'shirts9.png',
  },
  {
    'id': '72',
    'src': 'shirts10.png',
  },
  {
    'id': '73',
    'src': 'shirts11.png',
  },
  {
    'id': '74',
    'src': 'shirts12.png',
  },
  {
    'id': '75',
    'src': 'shoes.png',
  },
  {
    'id': '76',
    'src': 'skirts1.png',
  },
  {
    'id': '77',
    'src': 'skirts2.png',
  },
  {
    'id': '78',
    'src': 'sleeves1.png',
  },
  {
    'id': '79',
    'src': 'sleeves2.png',
  },
  {
    'id': '80',
    'src': 'tails1.jpg',
  },
  {
    'id': '81',
    'src': 'tails2.jpg',
  },
  {
    'id': '82',
    'src': 'torso.png',
  },
  {
    'id': '83',
    'src': 'hands.png',
  },
  {
    'id': '84',
    'src': 'arm.png',
  },
  {
    'id': '85',
    'src': 'shapes.png',
  },
  {
    'id': '86',
    'src': 'worldbuildlogo.PNG',
  },
  {
    'id': '87',
    'src': 'Left_Eyebrows-1.PNG',
  },
  {
    'id': '88',
    'src': 'Left_Eyebrows-2.PNG',
  },
  {
    'id': '89',
    'src': 'Left_Eyebrows-3.PNG',
  },
  {
    'id': '90',
    'src': 'Left_Eyebrows-4.PNG',
  },
  {
    'id': '91',
    'src': 'Left_Eyebrows-5.PNG',
  },
  {
    'id': '92',
    'src': 'Left_Eyebrows-6.PNG',
  },
  {
    'id': '93',
    'src': 'Left_Eyebrows-7.PNG',
  },
  {
    'id': '94',
    'src': 'Left_Eyebrows-8.PNG',
  },
  {
    'id': '95',
    'src': 'Left_Eyebrows-9.PNG',
  },
  {
    'id': '96',
    'src': 'Right_Eyebrows-1.PNG',
  },
  {
    'id': '97',
    'src': 'Right_Eyebrows-2.PNG',
  },
  {
    'id': '98',
    'src': 'Right_Eyebrows-3.PNG',
  },
  {
    'id': '99',
    'src': 'Right_Eyebrows-4.PNG',
  },
  {
    'id': '100',
    'src': 'Right_Eyebrows-5.PNG',
  },
  {
    'id': '101',
    'src': 'Right_Eyebrows-6.PNG',
  },
  {
    'id': '102',
    'src': 'Right_Eyebrows-7.PNG',
  },
  {
    'id': '103',
    'src': 'Right_Eyebrows-8.PNG',
  },
  {
    'id': '104',
    'src': 'Right_Eyebrows-9.PNG',
  },
  {
    'id': '105',
    'src': 'Right_Eyebrows.PNG',
  },
  {
    'id': '106',
    'src': 'Face_Shape-1.PNG',
  },
  {
    'id': '107',
    'src': 'Face_Shape-2.PNG',
  },
  {
    'id': '108',
    'src': 'Face_Shape-3.PNG',
  },
  {
    'id': '109',
    'src': 'Face_Shape-4.PNG',
  },
  {
    'id': '110',
    'src': 'Face_Shape-5.PNG',
  },
  {
    'id': '111',
    'src': 'Face_Shape-9.PNG',
  },
  {
    'id': '112',
    'src': 'Face_Shape-7.PNG',
  },
  {
    'id': '113',
    'src': 'Face_Shape-8.PNG',
  },
  {
    'id': '114',
    'src': 'Face_Shape-6.PNG',
  },
  {
    'id': '115',
    'src': 'Noses.PNG',
  },
  {
    'id': '116',
    'src': 'Right_Ears-1.PNG',
  },
  {
    'id': '117',
    'src': 'Right_Ears-2.PNG',
  },
  {
    'id': '118',
    'src': 'Right_Ears-3.PNG',
  },
  {
    'id': '119',
    'src': 'Right_Ears-4.PNG',
  },
  {
    'id': '120',
    'src': 'Right_Ears-5.PNG',
  },
  {
    'id': '121',
    'src': 'Right_Ears-6.PNG',
  },
  {
    'id': '122',
    'src': 'Right_Ears-7.PNG',
  },
  {
    'id': '123',
    'src': 'Right_Ears-8.PNG',
  },
  {
    'id': '124',
    'src': 'Right_Ears-9.PNG',
  },
  {
    'id': '125',
    'src': 'Left_Ears-1.PNG',
  },
  {
    'id': '126',
    'src': 'Left_Ears-2.PNG',
  },
  {
    'id': '127',
    'src': 'Left_Ears-3.PNG',
  },
  {
    'id': '128',
    'src': 'Left_Ears-4.PNG',
  },
  {
    'id': '129',
    'src': 'Left_Ears-5.PNG',
  },
  {
    'id': '130',
    'src': 'Left_Ears-6.PNG',
  },
  {
    'id': '131',
    'src': 'Left_Ears-7.PNG',
  },
  {
    'id': '132',
    'src': 'Left_Ears-8.PNG',
  },
  {
    'id': '133',
    'src': 'Left_Ears-9.PNG',
  },
  {
    'id': '134',
    'src': 'Noses-2.PNG',
  },
  {
    'id': '135',
    'src': 'Noses-3.PNG',
  },
  {
    'id': '136',
    'src': 'Noses-4.PNG',
  },
  {
    'id': '137',
    'src': 'Noses-5.PNG',
  },
  {
    'id': '138',
    'src': 'Noses-6.PNG',
  },
  {
    'id': '139',
    'src': 'Noses-7.PNG',
  },
  {
    'id': '140',
    'src': 'Noses-8.PNG',
  },
  {
    'id': '141',
    'src': 'Noses-9.PNG',
  },
  {
    'id': '142',
    'src': 'Bangs_-1.PNG',
  },
  {
    'id': '143',
    'src': 'Bangs_-2.PNG',
  },
  {
    'id': '144',
    'src': 'Bangs_-3.PNG',
  },
  {
    'id': '145',
    'src': 'Bangs_-4.PNG',
  },
  {
    'id': '146',
    'src': 'Bangs_-5.PNG',
  },
  {
    'id': '147',
    'src': 'Bangs_-6.PNG',
  },
  {
    'id': '148',
    'src': 'Bangs_-7.PNG',
  },
  {
    'id': '149',
    'src': 'Bangs_-8.PNG',
  },
  {
    'id': '150',
    'src': 'Bangs_-9.PNG',
  },
  {
    'id': '151',
    'src': 'Hair-1.PNG',
  },
  {
    'id': '152',
    'src': 'Hair-2.PNG',
  },
  {
    'id': '153',
    'src': 'Hair-3.PNG',
  },
  {
    'id': '154',
    'src': 'Hair-4.PNG',
  },
  {
    'id': '155',
    'src': 'Hair-5.PNG',
  },
  {
    'id': '156',
    'src': 'Hair-6.PNG',
  },
  {
    'id': '157',
    'src': 'Hair-7.PNG',
  },
  {
    'id': '158',
    'src': 'Hair-8.PNG',
  },
  {
    'id': '159',
    'src': 'Hair-9.PNG',
  },
  {
    'id': '160',
    'src': 'Mouths-1.PNG',
  },
  {
    'id': '161',
    'src': 'Mouths-2.PNG',
  },
  {
    'id': '162',
    'src': 'Mouths-3.PNG',
  },
  {
    'id': '163',
    'src': 'Mouths-4.PNG',
  },
  {
    'id': '164',
    'src': 'Mouths-5.PNG',
  },
  {
    'id': '165',
    'src': 'Mouths-6.PNG',
  },
  {
    'id': '166',
    'src': 'Mouths-7.PNG',
  },
  {
    'id': '167',
    'src': 'Mouths-8.PNG',
  },
  {
    'id': '168',
    'src': 'Mouths-9.PNG',
  },
  {
    'id': '169',
    'src': 'Left_Eyes-1.PNG',
  },
  {
    'id': '170',
    'src': 'Left_Eyes-2.PNG',
  },
  {
    'id': '172',
    'src': 'Left_Eyes-3.PNG',
  },
  {
    'id': '173',
    'src': 'Left_Eyes-4.PNG',
  },
  {
    'id': '174',
    'src': 'Left_Eyes-5.PNG',
  },
  {
    'id': '175',
    'src': 'Left_Eyes-6.PNG',
  },
  {
    'id': '176',
    'src': 'Left_Eyes-7.PNG',
  },
  {
    'id': '177',
    'src': 'Left_Eyes-8.PNG',
  },
  {
    'id': '178',
    'src': 'Left_Eyes-9.PNG',
  },
  {
    'id': '179',
    'src': 'Right_Eyes-1.PNG',
  },
  {
    'id': '180',
    'src': 'Right_Eyes-2.PNG',
  },
  {
    'id': '181',
    'src': 'Right_Eyes-3.PNG',
  },
  {
    'id': '182',
    'src': 'Right_Eyes-4.PNG',
  },
  {
    'id': '183',
    'src': 'Right_Eyes-5.PNG',
  },
  {
    'id': '184',
    'src': 'Right_Eyes-6.PNG',
  },
  {
    'id': '185',
    'src': 'Right_Eyes-7.PNG',
  },
  {
    'id': '186',
    'src': 'Right_Eyes-8.PNG',
  },
  {
    'id': '187',
    'src': 'Right_Eyes-9.PNG',
  },
  {
    'id': '188',
    'src': 'arms.jpg',
  },
  {
    'id': '189',
    'src': 'left arrow.PNG',
  },
  {
    'id': '190',
    'src': 'right arrow.PNG',
  },
  {
    'id': '190',
    'src': 'shapes.jpg',
  },
];


let carousel5 =  [
  {
    'id': '1',
    'src': 'finishlimebackground.gif',
  },
  {
    'id': '2',
    'src': 'Lemon_Cart.PNG',
  },
  {
    'id': '3',
    'src': 'Luelle_.PNG',
  },
  {
    'id': '4',
    'src': 'suriaubreysketch.png',
  },
  {
    'id': '5',
    'src': 'lemoncap.PNG',
  },
  {
    'id': '6',
    'src': 'Untitled_Artwork (1).PNG',
  },
  {
    'id': '7',
    'src': 'Untitled_Artwork (3).PNG',
  },
  {
    'id': '8',
    'src': 'Untitled_Artwork (4).PNG',
  },
  {
    'id': '9',
    'src': 'Untitled_Artwork (2).PNG',
  },
  {
    'id': '10',
    'src': 'Lemon_Shield.PNG',
  },
  {
    'id': '11',
    'src': 'Power_up_1 (2).PNG',
  },
  {
    'id': '12',
    'src': 'Power_up_1 (1).PNG',
  },
  {
    'id': '13',
    'src': 'Power_up_1.PNG',
  },
  {
    'id': '14',
    'src': 'rock.PNG',
  },
  {
    'id': '15',
    'src': 'fl titlescreen.PNG',
  },
];

const carousel4n = new Carousel(wb, carousel4);
carousel4n.setupCarousel();
console.log("whp: " + wd2)
const exampleCarousel = new Carousel(whp, carousel1);
exampleCarousel.setupCarousel();
const carousel2n = new Carousel(dd, carousel2);
carousel2n.setupCarousel();
const carousel3n = new Carousel(wd, carousel3);
carousel3n.setupCarousel();
const carousel5n = new Carousel(fl, carousel5);
carousel5n.setupCarousel();

// Setup carousel and methods


//whp: whp drafts
//dd: decent doodles
//wd: whoopsie daisies
//wb: worldbuild
//fl: finish lime
