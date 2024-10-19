import axios from 'axios';

const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
    } else {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', formData);
            console.log('User created:', response.data);
       
        } catch (error) {
            console.error('Error signing up:', error.response.data);
            
        }
    }
};