// src/pages/api/admin/winners/[id].js
import { 
  updateEventWinner, 
  deleteEventWinner 
} from '@/db/queries/winners';
import { withValidation } from '@/middleware/with-validation';
import { validateWinnerData } from '@/utils/validate-winner';  // Assuming you have a validation function

// Update an existing event winner
async function handleUpdateWinner(req, res) {
  const { id } = req.query;  // Fetch winner by ID
  
  try {
    // Ensure that req.body contains the required data
    const { isValid, errors } = validateWinnerData(req.body);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid winner data', details: errors });
    }

    const updatedWinner = await updateEventWinner(id, req.body);  // Update winner
    if (!updatedWinner) {
      return res.status(404).json({ error: 'Winner not found' });
    }

    res.status(200).json(updatedWinner);  // Respond with updated winner
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).json({ error: 'Failed to update event winner', details: error.message });
  }
}

// Delete an event winner by their ID
async function handleDeleteWinner(req, res) {
  const { id } = req.query;  // Fetch winner by ID
  
  try {
    const deletedWinner = await deleteEventWinner(id);  // Remove winner
    if (!deletedWinner) {
      return res.status(404).json({ error: 'Winner not found' });
    }

    res.status(200).json({ message: 'Winner deleted successfully', deletedWinner });
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).json({ error: 'Failed to delete event winner', details: error.message });
  }
}

// Export handler for PUT and DELETE requests
export default withValidation({
  PUT: handleUpdateWinner,   // Handle PUT request for updating winner
  DELETE: handleDeleteWinner // Handle DELETE request for removing winner
});
