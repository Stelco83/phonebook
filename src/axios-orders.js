    import axios from 'axios';


    const instance = axios.create({
       baseURL : 'https://phonebook-e11ec.firebaseio.com/'  
    });
    
   
    export default instance;