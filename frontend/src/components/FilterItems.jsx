const TYPE_OPTIONS = ['Lost', 'Found'];
const CATEGORY_OPTIONS = ['Electronics', 'Valuables', 'Documents'];
const LOCATION_OPTIONS = [
  'Library',
  'Cafeteria',
  'Main Auditorium',
  'Sports Complex',
  'Parking Area',
  'Lecture Hall',
  'Hostel',
];

function FilterItems({ filters, onChange }) {
  const handleChange = (field) => (e) => {
    onChange({ ...filters, [field]: e.target.value });
  };

  return (
    <div className="filter-items">
      <select
        value={filters.type}
        onChange={handleChange('type')}
        aria-label="Filter by type"
      >
        <option value="">All Types</option>
        {TYPE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={filters.location}
        onChange={handleChange('location')}
        aria-label="Filter by location"
      >
        <option value="">All Locations</option>
        {LOCATION_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={filters.category}
        onChange={handleChange('category')}
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {CATEGORY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterItems;
