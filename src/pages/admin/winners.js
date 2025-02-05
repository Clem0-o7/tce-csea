import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCombobox } from 'downshift';

export default function WinnersAdminPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState([]);
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [winners, setWinners] = useState([]);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    eventId: '',
    personId: '',
    rank: '',
    pointsEarned: 0,
    year: new Date().getFullYear().toString(),
    isTeam: false,
    teamName: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const eventsResponse = await fetch('/api/admin/events');
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
      } catch (error) {
        setError('Failed to fetch events');
      }
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    async function fetchWinners() {
      if (selectedEvent) {
        try {
          const winnersResponse = await fetch(`/api/admin/winners?eventId=${selectedEvent}`);
          const winnersData = await winnersResponse.json();
          
          // Ensure winnersData is an array before setting the state
          if (Array.isArray(winnersData)) {
            setWinners(winnersData);
          } else {
            setError('Invalid data format for winners');
          }
        } catch (error) {
          setError('Failed to fetch winners');
        }
      }
    }
    fetchWinners();
  }, [selectedEvent]);

  const handleSearchPersons = async (term) => {
    if (term.length < 2) return;
    try {
      const response = await fetch(`/api/admin/winners?searchTerm=${term}`);
      const personsData = await response.json();
      setPersons(personsData);
      setFilteredPersons(personsData);
    } catch (error) {
      setError('Failed to search persons');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/winners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save winner');

      setSuccess('Winner added successfully');
      setFormData({
        eventId: selectedEvent,
        personId: '',
        rank: '',
        pointsEarned: 0,
        year: new Date().getFullYear().toString(),
        isTeam: false,
        teamName: ''
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
    selectedItem,
    setInputValue
  } = useCombobox({
    items: filteredPersons,
    onInputValueChange: ({ inputValue }) => {
      setSearchTerm(inputValue);
      const filtered = persons.filter((person) =>
        person.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        person.registerNumber.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredPersons(filtered);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      setFormData((prev) => ({ ...prev, personId: selectedItem?.id || '' }));
    },
    itemToString: (item) => (item ? `${item.name} (${item.registerNumber})` : '')
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Manage Winners</h1>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Add Winner</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Select Event</Label>
                  <Select
                    value={selectedEvent}
                    onValueChange={setSelectedEvent}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Event" />
                    </SelectTrigger>
                    <SelectContent>
                      {events.map((event) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Search Person</Label>
                  <div className="relative">
                    <Input
                      {...getInputProps({
                        placeholder: 'Search by name or register number'
                      })}
                    />
                    <ul
                      {...getMenuProps()}
                      className={`absolute z-10 w-full bg-white border rounded-md shadow-md max-h-56 overflow-auto ${
                        isOpen ? '' : 'hidden'
                      }`}
                    >
                      {isOpen &&
                        filteredPersons.map((item, index) => (
                          <li
                            key={item.id}
                            {...getItemProps({ item, index })}
                            className={`px-4 py-2 cursor-pointer ${
                              highlightedIndex === index
                                ? 'bg-gray-100'
                                : ''
                            }`}
                          >
                            {item.name} ({item.registerNumber})
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rank</Label>
                  <Select
                    value={formData.rank}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, rank: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Rank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first">First</SelectItem>
                      <SelectItem value="second">Second</SelectItem>
                      <SelectItem value="third">Third</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Points Earned</Label>
                  <Input
                    type="number"
                    value={formData.pointsEarned}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pointsEarned: parseInt(e.target.value)
                      }))
                    }
                  />
                </div>
              </div>

              <Button type="submit" disabled={!selectedEvent}>
                Add Winner
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Event Winners</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Rank
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Points Earned
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {winners.map((winner) => (
                  <tr key={winner.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {winner.personName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {winner.rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {winner.pointsEarned}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(winner)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(winner.id)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
