import camera from '../../assets/images/features/camera.webp'
import desktop from '../../assets/images/features/desktop.webp'
import laptop from '../../assets/images/features/laptop.webp'
import roundcamera from '../../assets/images/features/360camera.webp'

export const featureData = [
    {
        id: 1,
        img: camera,
        alt: 'shop now camelCaseAttributes',
        to: '#',
        variant: 'shop',
        title: 'catch the hottest',
        highlight: 'deals',
        subtitle: 'in cameras',
    },
    {
        id: 2,
        img: desktop,
        alt: 'shop now desktop',
        to: '#',
        variant: 'price',
        title: ' best prices',
        highlight: 'on desktops',
        subtitle: 'shop now from',
        price: '1249',
        decimal: '99',
    },
    {
        id: 3,
        img: laptop,
        alt: 'shop now laptop',
        to: '#',
        variant: 'discount',
        title: 'tablets, smartphones',
        highlight: 'and more',
        discount: '70',
    },
    {

        id: 4,
        img: roundcamera,
        alt: 'roundcamera',
        variant: 'discount',
        title: 'the new',
        highlight: '360 cameras',
        discount: '70',

    }
]