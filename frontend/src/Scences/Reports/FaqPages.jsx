import React from 'react'
const FaqPages = () => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/getfaq')
      .then(result => setPatients(result.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      
    </div>
  )
}

export default FaqPages
