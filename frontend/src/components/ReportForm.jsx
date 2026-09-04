import React, { useState } from 'react';
import { createItem } from '../api';
import { CheckCircle, AlertCircle, Loader2, MapPin, Send } from 'lucide-react';

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

const ReportForm = () => {
  const [formData, setFormData] = useState({
    type: 'Lost',
    name: '',
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
    // Clear individual field error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Item name is required.';
    if (formData.name.trim().length > 0 && formData.name.trim().length < 2) newErrors.name = 'Item name must be at least 2 characters.';
    if (!formData.location) newErrors.location = 'Please select a location.';
    if (!formData.description.trim()) newErrors.description = 'A description is required to help identify the item.';
    if (formData.description.trim().length > 0 && formData.description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters.';
    if (!formData.contactInfo.trim()) newErrors.contactInfo = 'Contact info is required so the owner/finder can reach you.';
    if (formData.imageUrl && !formData.imageUrl.match(/^https?:\/\/.+/)) newErrors.imageUrl = 'Please enter a valid URL starting with http:// or https://';
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
      const dataToSubmit = { ...formData, date: new Date().toISOString() };
      await createItem(dataToSubmit);
      setSuccess(`Your ${formData.type.toLowerCase()} item "${formData.name}" has been reported successfully!`);
      setFormData({
        type: 'Lost',
        name: '',
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

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
          <MapPin size={20} className="text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Report Lost or Found Item</h2>
          <p className="text-sm text-slate-500">Fill in the details below to create a report.</p>
        </div>
      </div>

      {/* Global error */}
      {errors.submit && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6">
          <AlertCircle size={20} className="shrink-0" />
          <span className="text-sm">{errors.submit}</span>
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl mb-6">
          <CheckCircle size={20} className="shrink-0" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Report Type Toggle */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-3">Report Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'Lost' })}
              className={`py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                formData.type === 'Lost'
                  ? 'bg-red-500/15 border-red-500/40 text-red-400 glow-indigo'
                  : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600'
              }`}
            >
              🔍 Lost Item
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'Found' })}
              className={`py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                formData.type === 'Found'
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 glow-emerald'
                  : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600'
              }`}
            >
              📦 Found Item
            </button>
          </div>
        </div>

        {/* Item Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">Item Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-300 ${
              errors.name ? 'border-red-500/50' : 'border-slate-700/50 hover:border-slate-600'
            }`}
            placeholder="e.g. Black Leather Wallet, Student ID Card"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
        </div>

        {/* Location Dropdown */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1.5">Location at SLIIT</label>
          <select
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className={`w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-300 appearance-none ${
              errors.location ? 'border-red-500/50' : 'border-slate-700/50 hover:border-slate-600'
            } ${!formData.location ? 'text-slate-500' : ''}`}
          >
            <option value="">Select a location...</option>
            {SLIIT_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          {errors.location && <p className="text-red-400 text-xs mt-1.5">{errors.location}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1.5">Description</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-300 resize-none ${
              errors.description ? 'border-red-500/50' : 'border-slate-700/50 hover:border-slate-600'
            }`}
            placeholder="Provide unique details to help identify the item (color, brand, any distinguishing marks)..."
          />
          {errors.description && <p className="text-red-400 text-xs mt-1.5">{errors.description}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-300 mb-1.5">
            Image URL <span className="text-slate-600">(Optional)</span>
          </label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-300 ${
              errors.imageUrl ? 'border-red-500/50' : 'border-slate-700/50 hover:border-slate-600'
            }`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.imageUrl && <p className="text-red-400 text-xs mt-1.5">{errors.imageUrl}</p>}
          {formData.imageUrl && !errors.imageUrl && formData.imageUrl.match(/^https?:\/\/.+/) && (
            <div className="mt-3 rounded-xl overflow-hidden border border-slate-700/50">
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-full h-40 object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div>
          <label htmlFor="contactInfo" className="block text-sm font-medium text-slate-300 mb-1.5">Contact Information</label>
          <input
            type="text"
            name="contactInfo"
            id="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            className={`w-full bg-slate-800/60 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-all duration-300 ${
              errors.contactInfo ? 'border-red-500/50' : 'border-slate-700/50 hover:border-slate-600'
            }`}
            placeholder="Email or phone number (e.g. nimal@sliit.lk or 077 123 4567)"
          />
          {errors.contactInfo && <p className="text-red-400 text-xs mt-1.5">{errors.contactInfo}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} />
              Submit Report
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
