import homeSale from "../assets/images/home-sale.webp";
import tvMegamenu from "../assets/images/tvMegamenu.webp";
import tvMegamenu2 from "../assets/images/tvMegamenu2.webp";
import gadget from "../assets/images/gadget.webp";
import gadget2 from "../assets/images/gadget2.webp";
import LaptopsAndPCs from "../assets/images/LaptopsAndPCs.webp";
import mobileMenu from "../assets/images/mobileMenu.webp";
import menuGps from "../assets/images/menuGps.webp";

export const megaMenuData = {
  home: [
    {
      id: "h-1",
      title: "Most Used Links",
      links: [
        { label: "New Arrivals", url: "" },
        { label: "Best Sellers", url: "" },
        { label: "Today's deals", url: "" },
        { label: "Plash Sale", url: "" },
        { label: "Pre-Order", url: "" },
        { label: "Upcoming Products", url: "" },
      ],
    },
    {
      id: "h-2",
      title: "Gaming Setup",
      links: [
        { label: "Gaming Pc", url: "" },
        { label: "Gaminng Laptop", url: "" },
        { label: "RGB Accessories", url: "" },
      ],
    },
    {
      id: "h-3",
      title: "Student Essentials",
      links: [
        { label: "Budget Laptop", url: "" },
        { label: "Tablet", url: "" },
        { label: "Headphones", url: "" },
      ],
    },
    {
      id: "h-4",
      title: "Work From Home",
      links: [
        { label: "Monitor", url: "" },
        { label: "Webcam", url: "" },
        { label: "Keyboards", url: "" },
        { label: "UPS", url: "" },
      ],
    },
    {
      id: "h-5",
      title: "Work From Home",
      links: [
        { label: "Monitor", url: "" },
        { label: "Webcam", url: "" },
        { label: "Keyboards", url: "" },
        { label: "UPS", url: "" },
      ],
    },
    {
      id: "h-6",
      type: "img",
      title: "Flash Sale",
      url: "",
      subtitle: "Catch the hottest deals!",
      image: {
        src: homeSale,
        alt: "flash sale img",
      },
    },
  ],

  TVandAudio: [
    {
      id: "h-1",
      title: "Television",
      links: [
        { label: "Smart TVs", url: "" },
        { label: "4K TVs", url: "" },
        { label: "Full HD TVs", url: "" },
        { label: "Large Screen TVs", url: "" },
        { label: "32 inch TVs", url: "" },
        { label: "39-43 inch TV", url: "" },
        { label: "48 & Above", url: "" },
      ],
    },
    {
      id: "h-2",
      title: " Home Audio/Video",
      links: [
        { label: "Speakers", url: "" },
        { label: "Home Theaters", url: "" },
        { label: "Projectors", url: "" },
        { label: "Headphones", url: "" },
        { label: "Noise Cancelling Headphones", url: "" },
        { label: "Soundbars", url: "" },
        { label: "Headphones with Mic", url: "" },
      ],
    },
    {
      id: "h-3",
      title: "Shop by Brand",
      links: [
        { label: "VU", url: "" },
        { label: "Mi LED Smart TVs", url: "" },
        { label: "Samsung", url: "" },
        { label: "Panasonic", url: "" },
        { label: "TCL", url: "" },
        { label: "Sanyo", url: "" },
        { label: "Micromax", url: "" },
      ],
    },
    {
      id: "h-4",
      title: "Work From Home",
      links: [
        { label: "Monitor", url: "" },
        { label: "Webcam", url: "" },
        { label: "Keyboards", url: "" },
        { label: "UPS", url: "" },
      ],
    },
    {
      id: "h-5",
      title: "Shop by Brand",
      links: [
        { label: "Sony", url: "" },
        { label: "Ultimate ears", url: "" },
        { label: "Philips", url: "" },
        { label: "Protronics", url: "" },
        { label: "Saregama", url: "" },
        { label: "Harmon Kardon", url: "" },
      ],
    },
    {
      id: "h-6",
      title: "Other Home Entertainment",
      links: [
        { label: "Home Theater Systems", url: "" },
        { label: "Projectors & Accessoires", url: "" },
        { label: "Set top Boxes", url: "" },
        { label: "Streaming Media Players", url: "" },
        { label: "DVD & Blu-ray Players", url: "" },
        { label: "Audio-video Accessories", url: "" },
      ],
    },
    {
      id: "h-8",
      type: "img",
      image: {
        src: tvMegamenu,
        alt: "flash sale img",
        url: "",
      },
    },
    {
      id: "h-9",
      type: "img",
      image: {
        src: tvMegamenu2,
        alt: "flash sale img",
        url: "",
      },
    },
  ],

  component: [
    {
      id: "h-2",
      title: "CPU Cooler",
      links: [
        { label: "MSI", url: "" },
        { label: "Antec", url: "" },
        { label: "Cooler Master", url: "" },
        { label: "Cougar", url: "" },
        { label: "ARCTIC", url: "" },
        { label: "Gigabyte", url: "" },
        { label: "DeepCool", url: "" },
        { label: "upHere", url: "" },
        { label: "All CPU Cooler", url: "" },
      ],
    },
    {
      id: "h-4",
      title: "Motherboard",
      links: [
        { label: "MSI (Intel)", url: "" },
        { label: "MSI (AMD)", url: "" },
        { label: "ASRock (Intel)", url: "" },
        { label: "ASRock (AMD)", url: "" },
        { label: "GIGABYTE (Intel)", url: "" },
        { label: "GIGABYTE (AMD)", url: "" },
        { label: "ASUS (Intel)", url: "" },
        { label: "ASUS (AMD)", url: "" },
      ],
    },
    {
      id: "h-5",
      title: "Graphics Card",
      links: [
        { label: "Colorful", url: "" },
        { label: "INNO3D", url: "" },
        { label: "PNY", url: "" },
        { label: "ASUS", url: "" },
        { label: "GIGABYTE", url: "" },
        { label: "NVIDIA", url: "" },
        { label: "ZOTAC", url: "" },
        { label: "Manli", url: "" },
        { label: "All Graphics Card", url: "" },
      ],
    },
    {
      id: "h-6",
      title: "RAM",
      links: [
        { label: "TEAM", url: "" },
        { label: "Colorful", url: "" },
        { label: "PNY", url: "" },
        { label: "Kingston", url: "" },
        { label: "Corsair", url: "" },
        { label: "Lexar", url: "" },
        { label: "Netac", url: "" },
        { label: "Adata", url: "" },
        { label: "All RAM", url: "" },
      ],
    },
    {
      id: "h-7",
      title: "Power Supply",
      links: [
        { label: "Corsair", url: "" },
        { label: "Cooler Master", url: "" },
        { label: "DeepCool", url: "" },
        { label: "Thermaltake", url: "" },
        { label: "Antec", url: "" },
        { label: "Gigabyte", url: "" },
        { label: "ASUS", url: "" },
        { label: "MSI", url: "" },
        { label: "All Power Supplies", url: "" },
      ],
    },
    {
      id: "h-8",
      title: "SSD",
      links: [
        { label: "Samsung", url: "" },
        { label: "Kingston", url: "" },
        { label: "Western Digital", url: "" },
        { label: "Lexar", url: "" },
        { label: "Adata", url: "" },
        { label: "TeamGroup", url: "" },
        { label: "Netac", url: "" },
        { label: "Crucial", url: "" },
        { label: "All SSD", url: "" },
      ],
    },
    {
      id: "h-9",
      title: "Hard Disk Drive",
      links: [
        { label: "Seagate", url: "" },
        { label: "Western Digital", url: "" },
        { label: "Toshiba", url: "" },
        { label: "Internal HDD", url: "" },
        { label: "External HDD", url: "" },
        { label: "Surveillance HDD", url: "" },
        { label: "NAS HDD", url: "" },
        { label: "All HDD", url: "" },
      ],
    },
    {
      id: "h-10",
      title: "Casing",
      links: [
        { label: "Mid Tower", url: "" },
        { label: "Full Tower", url: "" },
        { label: "Mini Tower", url: "" },
        { label: "Gaming Case", url: "" },
        { label: "RGB Case", url: "" },
        { label: "Corsair", url: "" },
        { label: "NZXT", url: "" },
        { label: "Cooler Master", url: "" },
        { label: "All Casing", url: "" },
      ],
    },
    {
      id: "h-11",
      title: "Optical Disk Drive",
      links: [
        { label: "Internal DVD Writer", url: "" },
        { label: "External DVD Writer", url: "" },
        { label: "ASUS", url: "" },
        { label: "LG", url: "" },
        { label: "Lite-On", url: "" },
        { label: "Blu-ray Drive", url: "" },
        { label: "Portable DVD Drive", url: "" },
        { label: "All Optical Drives", url: "" },
      ],
    },
    {
      id: "h-1",
      title: "Processor",
      links: [
        { label: "AMD", url: "" },
        { label: "Intel", url: "" },
      ],
    },
    {
      id: "h-3",
      title: "Water / Liquid Cooler",
      links: [
        { label: "EKWB", url: "" },
        { label: "Corsair", url: "" },
        { label: "Cooler Master", url: "" },
        { label: "NZXT", url: "" },
      ],
    },
  ],

  Gadgets: [
    {
      id: "e-3",
      title: "Computers & Accessories",
      links: [
        { label: "Laptops", url: "" },
        { label: "Desktops", url: "" },
        { label: "Monitors", url: "" },
        { label: "Networking Devices", url: "" },
        { label: "Computer Accessories", url: "" },
      ],
    },
    {
      id: "e-4",
      title: "Peripherals",
      links: [
        { label: "Hard Drives", url: "" },
        { label: "Pen Drives & Memory Cards", url: "" },
        { label: "Printers & Ink", url: "" },
        { label: "Mouse", url: "" },
        { label: "Webcams", url: "" },
      ],
    },
    {
      id: "e-5",
      type: "img",
      image: {
        src: gadget,
        alt: "camera collection banner",
        url: "",
      },
    },
    {
      id: "e-6",
      type: "img",
      image: {
        src: gadget2,
        alt: "watch collection banner",
        url: "",
      },
    },
    {
      id: "e-7",
      title: "Cameras",
      links: [
        { label: "DSLR", url: "" },
        { label: "Lenses", url: "" },
        { label: "Security & Surveillance", url: "" },
        { label: "Binoculars & Telescopes", url: "" },
        { label: "Camcorders", url: "" },
      ],
    },
    {
      id: "e-8",
      title: "Watches",
      links: [
        { label: "Men's Watches", url: "" },
        { label: "Women's Watches", url: "" },
        { label: "Premium Watches", url: "" },
        { label: "Kids Watches", url: "" },
        { label: "Deals on Watches", url: "" },
      ],
    },
    {
      id: "e-11",
      title: "Accessories",
      links: [
        { label: "Mouse", url: "" },
        { label: "Keyboards", url: "" },
        { label: "Hard Drives", url: "" },
        { label: "Headphones", url: "" },
        { label: "Speakers", url: "" },
      ],
    },
    {
      id: "e-12",
      title: "Gadgets",
      links: [
        { label: "Fire TV Stick", url: "" },
        { label: "Google Chromecast", url: "" },
        { label: "Set Top Box", url: "" },
        { label: "Accessories", url: "" },
        { label: "Deals of the Day", url: "" },
      ],
    },
  ],
  LaptopAndPc: [
    {
      id: "lp-1",
      title: "Laptops",
      links: [
        { label: "Thin and Light Laptops", url: "" },
        { label: "2-in-1 Laptops", url: "" },
        { label: "Gaming Laptops", url: "" },
        { label: "Budget Laptops", url: "" },
        { label: "Business Laptops", url: "" },
      ],
    },
    {
      id: "lp-2",
      title: "Shop By Brand",
      links: [
        { label: "Apple", url: "" },
        { label: "HP", url: "" },
        { label: "Dell", url: "" },
        { label: "Lenovo", url: "" },
        { label: "Acer", url: "" },
      ],
    },
    {
      id: "lp-3",
      title: "Tablets",
      links: [
        { label: "Lenovo", url: "" },
        { label: "Apple", url: "" },
        { label: "Samsung", url: "" },
        { label: "Micromax", url: "" },
        { label: "iBall", url: "" },
      ],
    },
    {
      id: "lp-7a",
      title: "Best Processors",
      links: [
        { label: "Intel Core i9-7980XE", url: "" },
        { label: "AMD Threadripper 1950X", url: "" },
        { label: "AMD Ryzen 5 1600X", url: "" },
        { label: "Intel Core i7-8700K", url: "" },
      ],
    },
    {
      id: "lp-7b",
      title: "Best Processors ",
      links: [
        { label: "AMD Ryzen 7 1800X", url: "" },
        { label: "Intel Core i5-7600K", url: "" },
        { label: "AMD Ryzen 3 1300X", url: "" },
      ],
    },
    {
      id: "lp-5",
      title: "Processors",
      links: [
        { label: "Intel", url: "" },
        { label: "AMD", url: "" },
        { label: "Qualcomm", url: "" },
        { label: "IBM", url: "" },
        { label: "Motorola", url: "" },
      ],
    },
    {
      id: "lp-6",
      title: "Shop By Price",
      links: [
        { label: "Below Rs. 500$", url: "" },
        { label: "500$ - 699$", url: "" },
        { label: "700$ - 799$", url: "" },
        { label: "800$ - 899$", url: "" },
        { label: "900$ and Above", url: "" },
      ],
    },
    {
      id: "lp-4",
      title: "PC Accessories",
      links: [
        { label: "Keyboards", url: "" },
        { label: "Mice", url: "" },
        { label: "Laptop Bags", url: "" },
        { label: "PC Speakers", url: "" },
        { label: "Batteries", url: "" },
      ],
    },
  ],
CameraAndAccessories: [
    {
        id: 'cam-1',
        title: 'Cameras',
        links: [
            { label: 'DSLR Cameras', url: '' },
            { label: 'Digital Cameras', url: '' },
            { label: 'Security & Surveillance', url: '' },
            { label: 'Camcorders', url: '' },
            { label: 'Consoles', url: '' },
        ]
    },
    {
        id: 'cam-2',
        title: 'Shop By Price',
        links: [
            { label: 'Below Rs. 100$', url: '' },
            { label: '101$ - 199$', url: '' },
            { label: '200$ - 299$', url: '' },
            { label: '300$ - 399$', url: '' },
            { label: '400$ and Above', url: '' },
        ]
    },
    {
        id: 'cam-3',
        title: 'Shop By Focal Length',
        links: [
            { label: '8mm - 24mm', url: '' },
            { label: '24mm - 35mm', url: '' },
            { label: '35mm - 85mm', url: '' },
            { label: '85mm - 135mm', url: '' },
            { label: '135mm+', url: '' },
        ]
    },
        {
        id: 'cam-7',
        title: 'Shop By Brands',
        links: [
            { label: 'Canon', url: '' },
            { label: 'Nikon', url: '' },
            { label: 'Pentax', url: '' },
            { label: 'Sony', url: '' },
            { label: 'Apple', url: '' },
            { label: 'Leica', url: '' },
        ]
    },
    {
        id: 'cam-4',
        title: '#Trending',
        links: [
            { label: 'Sony', url: '' },
            { label: 'Nikon', url: '' },
            { label: 'Canon', url: '' },
            { label: 'Sanyo', url: '' },
            { label: 'Samsung', url: '' },
        ]
    },
    {
        id: 'cam-5',
        title: 'Accessories',
        links: [
            { label: 'Headphones', url: '' },
            { label: 'Mouses', url: '' },
            { label: 'Hardrives', url: '' },
            { label: 'Speakers', url: '' },
        ]
    },
    {
        id: 'cam-6',
        title: 'Add-ons',
        links: [
            { label: 'Data Cables', url: '' },
            { label: 'Keypads', url: '' },
            { label: 'Earphones', url: '' },
            { label: 'Lenses', url: '' },
            { label: 'Camera Accessories', url: '' },
        ]
    },
    {
        id: 'cam-8',
        title: 'Shop By Brands',
        links: [
            { label: 'Panasonic', url: '' },
            { label: 'LG', url: '' },
            { label: 'Oppo', url: '' },
            { label: 'Olympus', url: '' },
            { label: 'Sanyo', url: '' },
            { label: 'Samsung', url: '' },
        ]
    },
],
smartphones: [
    {
        id: 'm-1',
        title: 'Accessories',
        links: [
            { label: 'Headsets', url: '' },
            { label: 'Cables & Chargers', url: '' },
            { label: 'Electronic Accessories', url: '' },
            { label: 'Selfie Sticks', url: '' },
            { label: 'Internal Batteries', url: '' },
        ]
    },
    {
        id: 'm-2',
        title: 'Cases & Covers',
        links: [
            { label: 'For iPhone X', url: '' },
            { label: 'For Samsung S9', url: '' },
            { label: 'Below AED 59', url: '' },
            { label: 'For Xiaomi', url: '' },
            { label: 'For iPhone 7', url: '' },
        ]
    },
    {
        id: 'm-3',
        title: 'Tablets',
        links: [
            { label: 'iPads', url: '' },
            { label: 'Samsung', url: '' },
            { label: 'Microsoft Surface', url: '' },
            { label: 'Lenovo', url: '' },
            { label: 'Innjoo', url: '' },
        ]
    },
    {
        id: 'm-4',
        title: 'Shop By Price',
        links: [
            { label: 'For iPhone X', url: '' },
            { label: 'For Samsung S9', url: '' },
            { label: 'Below AED 59', url: '' },
            { label: 'For Xiaomi', url: '' },
            { label: 'For iPhone 7', url: '' },
        ]
    },
    {
        id: 'm-5', 
        title: 'Mobiles',
        links: [
            { label: 'Samsung', url: '' },
            { label: 'Lenovo', url: '' },
            { label: 'Mi', url: '' },
            { label: 'Motorola', url: '' },
            { label: 'Oppo', url: '' },
        ]
    },
    {
        id: 'm-6', 
        title: '#Trending',
        links: [
            { label: 'Oppo', url: '' },
            { label: 'Panasonic', url: '' },
            { label: 'Samsung', url: '' },
            { label: 'Apple', url: '' },
        ]
    },
    {
        id: 'm-8',
        type: 'img',
        image: {
            src: mobileMenu,
            alt: 'mobileMenuImg',
            url: ''
        }
    },
],
GpsAndCar: [
    {
        id: 'car-1',
        title: 'Car Audios',
        links: [
            { label: 'Music Systems', url: '' },
            { label: 'Video Systems', url: '' },
            { label: 'Speakers', url: '' },
            { label: 'Car Monitors', url: '' },
            { label: 'Car Electronics', url: '' },
            { label: 'All Audio Products', url: '' },
        ]
    },
    {
        id: 'car-2',
        title: 'GPS & Tracking',
        links: [
            { label: 'Gps Tracking Devices', url: '' },
            { label: 'GPS Networking Devices', url: '' },
            { label: 'GPS Tracking Sensors', url: '' },
            { label: 'GPS Monitoring', url: '' },
            { label: 'GPS Jammers', url: '' },
            { label: 'GPS Anti-Tracker', url: '' },
            { label: 'GPS Trackers', url: '' },
        ]
    },
    {
        id: 'car-3',
        title: 'Car Parts & Care',
        links: [
            { label: 'Car Parts', url: '' },
            { label: 'Monitoring', url: '' },
            { label: 'Network Jammers', url: '' },
            { label: 'Car & Bike Care', url: '' },
            { label: 'Car Accessories', url: '' },
            { label: 'All Car Products', url: '' },
        ]
    },
    {
        id: 'car-4',
        title: 'GPS Accessories',
        links: [
            { label: 'GPS Accessories', url: '' },
            { label: 'GPS Devices', url: '' },
            { label: 'Accessories & Parts', url: '' },
            { label: 'GPS Monitoring', url: '' },
            { label: 'GPS Tracking Sensors', url: '' },
        ]
    },
    {
        id: 'car-5',
        title: 'Shop By Price',
        links: [
            { label: 'Below Rs. 100$', url: '' },
            { label: '101$ - 199$', url: '' },
            { label: '200$ - 299$', url: '' },
            { label: '300$ - 399$', url: '' },
            { label: '400$ and Above', url: '' },
        ]
    },
    {
        id: 'car-6',
        title: 'Shop By Brand',
        links: [
            { label: 'Sony', url: '' },
            { label: 'Pioneer', url: '' },
            { label: 'JBL', url: '' },
            { label: 'Kenwood', url: '' },
            { label: 'Clarion', url: '' },
        ]
    },
        {
        id: 'car-7',
        type: 'img',
        image: {
            src: menuGps,
            alt: 'menuGpsImg',
            url: ''
        }
    },
]

};
