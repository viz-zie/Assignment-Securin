// App.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Drawer } from './components/ui/Drawer';
import { Table,TableBody,TableHeader,TableCell,TableRow } from './components/ui/Table';
import { Input } from './components/ui/Input';
import { Pagination } from './components/ui/Pagination';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ title: '', cuisine: '', rating: '' });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const fetchData = async () => {
    try {
      const params = { page, limit };
      const response = await axios.get('/api/recipes', { params });
      setRecipes(response.data.data);
      setTotal(response.data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchFiltered = async () => {
    try {
      const response = await axios.get('/api/recipes/search', { params: filters });
      setRecipes(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (filters.title || filters.cuisine || filters.rating) fetchFiltered();
    else fetchData();
  }, [page, limit, filters]);

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <Input placeholder="Search Title" onChange={e => setFilters({ ...filters, title: e.target.value })} />
        <Input placeholder="Cuisine" onChange={e => setFilters({ ...filters, cuisine: e.target.value })} />
        <Input placeholder="Rating >=" type="number" onChange={e => setFilters({ ...filters, rating: e.target.value })} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Cuisine</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Total Time</TableCell>
            <TableCell>Serves</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map(recipe => (
            <TableRow key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
              <TableCell>{recipe.title.slice(0, 25)}...</TableCell>
              <TableCell>{recipe.cuisine}</TableCell>
              <TableCell>{'⭐'.repeat(Math.round(recipe.rating))}</TableCell>
              <TableCell>{recipe.total_time} mins</TableCell>
              <TableCell>{recipe.serves}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        totalItems={total}
        itemsPerPage={limit}
        currentPage={page}
        onPageChange={p => setPage(p)}
        onLimitChange={l => setLimit(l)}
      />

      <Drawer isOpen={!!selectedRecipe} onClose={() => setSelectedRecipe(null)}>
        {selectedRecipe && (
          <div className="p-4">
            <h2 className="text-xl font-bold">{selectedRecipe.title} - {selectedRecipe.cuisine}</h2>
            <p className="mt-2"><b>Description:</b> {selectedRecipe.description}</p>
            <p className="mt-2"><b>Total Time:</b> {selectedRecipe.total_time} mins</p>
            <details>
              <summary className="cursor-pointer mt-1">Show Prep and Cook Time</summary>
              <p><b>Prep:</b> {selectedRecipe.prep_time} mins</p>
              <p><b>Cook:</b> {selectedRecipe.cook_time} mins</p>
            </details>
            <div className="mt-4">
              <h3 className="font-semibold">Nutrition</h3>
              <ul className="list-disc ml-5">
                {Object.entries(selectedRecipe.nutrients).map(([key, val]) => (
                  <li key={key}><b>{key}:</b> {val}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
