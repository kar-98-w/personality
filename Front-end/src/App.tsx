import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('');
  const [sculptureList, setSculptureList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/marron/personalities') // Fetch all personalities
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
    
      .then(data => {
        setLoading(false);
        setSculptureList(data);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
        console.error("Could not fetch personalities:", error);
      });
  }, []);

  function handleSelectPerson(event) {
    const selectedName = event.target.value;
    setSelectedPerson(selectedName);
    const newIndex = sculptureList.findIndex(sculpture => sculpture.trait === selectedName);
    if (newIndex !== -1) {
      setIndex(newIndex);
    }
  }

  function handleNextClick() {
    setIndex((prevIndex) => (prevIndex + 1) % sculptureList.length);
  }

  function handleBackClick() {
    setIndex((prevIndex) => (prevIndex - 1 + sculptureList.length) % sculptureList.length);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  if (loading) {
    return <div>Loading SOFTWARE DEVELOPERS...</div>;
  }

  if (error) {
    return <div>Error loading SOFTWARE DEVELOPERS: {error}</div>;
  }

  if (!sculptureList || sculptureList.length === 0) {
    return <div>No SOFTWARE DEVELOPERS found.</div>;
  }

  let sculpture = sculptureList[index];


  return (
    <div className="gallery-container">
      <h2>SOFTWARE DEVELOPERS</h2>
      <h3>Karl Moses Marron - C-PEITEL3</h3>

      <Card variant="outlined" className="sculpture-card">
        <CardContent>
          <Typography variant="h5">
            <i>{sculpture.trait}</i>
          </Typography>
          <Typography variant="body2">
            ({index + 1} of {sculptureList.length})
          </Typography>
          <img src={sculpture.url || 'https://allthatsinteresting.com/wordpress/wp-content/uploads/2019/08/spartacus-statue-from-below.jpg'} alt={sculpture.alt || sculpture.trait} className="sculpture-image" />
        </CardContent>
      </Card>


      <FormControl component="fieldset">
        <FormLabel id="person-radio-group">Famous Personalities</FormLabel>
        <RadioGroup
          aria-labelledby="person-radio-group"
          name="famousPerson"
          value={selectedPerson}
          onChange={handleSelectPerson}
          row
        >
          {sculptureList.map((person) => (
            <FormControlLabel
              key={person.trait}
              value={person.trait}
              control={<Radio />}
              label={person.trait}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && (
        <Card variant="outlined" className="sculpture-card">
          <CardContent>
            <Typography variant="body1">{sculpture.description}</Typography>
          </CardContent>
        </Card>
      )}
      <div className="button-group">
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
}