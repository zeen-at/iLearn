import Not from '../../assets/not.jpeg'
import NavBar from '../../components/navBar/navBar';
import './NotFound.css'


const NotFound = () => {
    return ( 
        <>
        <NavBar />
        <div className='NotFound'>
        <img className='NotFound-img' src={Not} alt="background" />
        </div>
        </>
     );
}
 
export default NotFound;