import React, { useState } from 'react';
import { createItem } from '../api';

const SLIIT_LOCATIONS = [
  'Main Library',
  'Computing Faculty',
  'Engineering Faculty',
  'Business Faculty',
  'Humanities & Sciences Faculty',
  'Cafeteria',
  'Student Center',
  'Auditorium',
  'Ground Floor Lobby',
  'Parking Area',
  'Sports Complex',
  'Lab 1 - Computing',
  'Lab 2 - Computing',
  'Lab 3 - Computing',
  'Lecture Hall A',
  'Lecture Hall B',
  'Lecture Hall C',
  'Other',
];

const CATEGORY_OPTIONS = [
  'Electronics',
  'Valuables',
  'Documents',
  'Clothing',
  'Books/Stationery',
  'ID Cards',
  'Keys',
  'Other',
];

const ReportForm = () => {
  const [formData, setFormData] = useState({
    type: 'Lost',
    name: '',
    category: 'Other',
    location: '',
    description: '',
    contactInfo: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Item name is required.';
    if (formData.name.trim().length > 0 && formData.name.trim().length < 2) {
      newErrors.name = 'Item name must be at least 2 characters.';
    }
    if (!formData.location) newErrors.location = 'Please select a location.';
    if (!formData.description.trim()) newErrors.description = 'A description is required.';
    if (formData.description.trim().length > 0 && formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters.';
    }
    if (!formData.contactInfo.trim()) newErrors.contactInfo = 'Contact info is required.';
    if (formData.imageUrl && !formData.imageUrl.match(/^https?:\/\/.+/)) {
      newErrors.imageUrl = 'Please enter a valid URL starting with http:// or https://';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await createItem({ ...formData, date: new Date().toISOString() });
      setSuccess(`Your ${formData.type.toLowerCase()} item "${formData.name}" has been reported.`);
      setFormData({
        type: 'Lost',
        name: '',
        category: 'Other',
        location: '',
        description: '',
        contactInfo: '',
        imageUrl: '',
      });
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to submit report. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 sm:p-6">
      {errors.submit && (
        <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{errors.submit}</p>
      )}
      {success && (
        <p className="mb-4 rounded bg-green-50 p-3 text-sm text-green-700">{success}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium">Report type</p>
          <div className="grid grid-cols-2 gap-2">
            {['Lost', 'Found'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type })}
                className={`btn ${formData.type === type ? 'btn-primary' : 'btn-outline'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">Item name</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} className="field" placeholder="e.g. Black wallet" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-medium">Category</label>
            <select id="category" name="category" value={formData.category} onChange={handleChange} className="field">
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="location" className="mb-1 block text-sm font-medium">Location</label>
            <select id="location" name="location" value={formData.location} onChange={handleChange} className="field">
              <option value="">Select a location</option>
              {SLIIT_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium">Description</label>
          <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} className="field" placeholder="Color, brand, and any unique marks" />
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="imageUrl" className="mb-1 block text-sm font-medium">Image URL (optional)</label>
          <input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="field" placeholder="https://example.com/image.jpg" />
          {errors.imageUrl && <p className="mt-1 text-xs text-red-600">{errors.imageUrl}</p>}
        </div>

        <div>
          <label htmlFor="contactInfo" className="mb-1 block text-sm font-medium">Contact</label>
          <input id="contactInfo" name="contactInfo" value={formData.contactInfo} onChange={handleChange} className="field" placeholder="Email or phone" />
          {errors.contactInfo && <p className="mt-1 text-xs text-red-600">{errors.contactInfo}</p>}
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary w-full sm:w-auto">
          {loading ? 'Submitting...' : 'Submit report'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
