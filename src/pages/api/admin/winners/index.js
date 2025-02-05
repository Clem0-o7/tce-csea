// src/pages/api/admin/winners/index.js
import { 
  createEventWinner, 
  updateEventWinner, 
  deleteEventWinner, 
  getEventWinners,
  searchPersons,
  addPerson // New function to add a person to the persons table
} from '@/db/queries/winners';
import { withValidation } from '@/middleware/with-validation';
import { validateWinnerData } from '@/utils/validate-winner';

// Fetch winners based on eventName
async function handleGetWinners(req, res) {
  const { eventName } = req.query;  // Use eventName instead of eventId
  try {
    const winners = await getEventWinners(eventName);  // Updated query for eventName
    res.status(200).json(winners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Create a new event winner
async function handleCreateWinner(req, res) {
  const { personId, personName, eventName, rank, pointsEarned, year, isTeam, teamName } = req.body;

  try {
    // Validate winner data
    const { isValid, errors } = validateWinnerData(req.body);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid winner data', details: errors });
    }

    // Check if the person exists
    let person = await searchPersons(personName);

    if (!person) {
      // If person doesn't exist, add them to the persons table
      person = await addPerson(personName);
    }

    // Create the winner with the correct personId
    const winner = await createEventWinner({
      personId: person.id,
      eventName,
      rank,
      pointsEarned,
      year,
      isTeam,
      teamName
    });

    res.status(201).json(winner);
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.status(500).json({ error: 'Failed to create event winner', details: error.message });
  }
}

// Search for persons by name or other criteria
async function handleSearchPersons(req, res) {
  const { searchTerm } = req.query;
  try {
    const persons = await searchPersons(searchTerm);
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Export default handler with validation middleware
export default withValidation(validateWinnerData, async (req, res) => {
  switch (req.method) {
    case 'GET':
      return handleGetWinners(req, res);  // Handle GET request for fetching winners
    case 'POST':
      return handleCreateWinner(req, res);  // Handle POST request for creating a winner
    case 'SEARCH':
      return handleSearchPersons(req, res);  // Handle SEARCH request for searching persons
    default:
      return res.status(405).json({ error: 'Method not allowed' });  // Method not allowed for others
  }
});
