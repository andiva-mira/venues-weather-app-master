import {ForecastApiCall} from './modules/ForecastCall';
import {VenuesApiCall} from './modules/VenuesCall';
import {CirclesAnimation} from './modules/CirclesAnimation';
import ContentExpand from './modules/ContentExpand';
import CloseContent from './modules/CloseContent';
import SvgLoad from'./modules/SvgLoad';
import attractions from '../images/attractions.svg?url';
import cloudPair from '../images/icons/cloud-pair.svg?url';
import cloud from '../images/icons/cloud.svg?url';
import airBalloon from '../images/icons/air-balloon.svg?url';
import arrow from '../images/icons/arrow.svg?url';


const weatherCall = ForecastApiCall();
const venuesCall = VenuesApiCall(); 
const circlesAnim = CirclesAnimation();
new ContentExpand();
new CloseContent();

const svgAttr = [attractions ];
new SvgLoad("#canvas", svgAttr);

const svgRight = [cloudPair, cloud, airBalloon];
new SvgLoad("#contentRightCanvas", svgRight );

const svgLeft = [cloudPair, cloud, airBalloon];
new SvgLoad("#contentLeftCanvas", svgLeft );

const svgBtn = [arrow];
new SvgLoad("#btnCanvas", svgBtn);
