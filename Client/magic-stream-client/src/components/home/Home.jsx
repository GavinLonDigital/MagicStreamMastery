import {useState, useEffect} from 'react';
import axiosClient from '../../api/axiosConfig'
import Movies from '../movies/Movies';
import Spinner from '../spinner/Spinner';

const Home =({updateMovieReview}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState();

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setMessage("");
            try{
                const response = await axiosClient.get('/movies');
                setMovies(response.data);
                if (response.data.length === 0){
                    setMessage('There are currently no movies available')
                }

            }catch(error){
                console.error('Error fetching movies:', error)
                setMessage("Error fetching movies")
            }finally{
                setLoading(false)
            }
        }
        fetchMovies();
    }, []);

    return (
        <>
        <h2>Magic Stream Movies</h2>
            {loading ? (
                <Spinner/>
            ):  (
                <Movies movies ={movies} updateMovieReview={updateMovieReview} message ={message}/>
            )}
        </>

    );

};

export default Home;



