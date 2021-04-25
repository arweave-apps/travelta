import Auto from '../../pages/Auto';
import Avia from '../../pages/Avia';
import Hotel from '../../pages/Hotel';
import Tour from '../../pages/Tour';
import Train from '../../pages/Train';

const paths = [
  { url: '/avia', name: 'Авиа билеты', component: Avia },
  { url: '/train', name: 'Ж/д билеты', component: Train },
  { url: '/auto', name: 'Прокат авто', component: Auto },
  { url: '/hotel', name: 'Отели', component: Hotel },
  { url: '/tour', name: 'Туры', component: Tour },
];

export default paths;
