export function validateWinnerData(data) {
    const errors = [];
    
    if (!data.eventId) errors.push('Event ID is required');
    if (!data.personId) errors.push('Person ID is required');
    if (!data.rank) errors.push('Rank is required');
    if (data.pointsEarned == null || data.pointsEarned < 0) 
      errors.push('Points earned must be a positive number');
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  