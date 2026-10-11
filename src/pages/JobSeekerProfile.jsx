
import { useEffect, useState } from 'react';
import api, { uploadUrl } from '../services/api';
import AlertMessage from '../components/AlertMessage';
import Loading from '../components/Loading';

const JobSeekerProfile = () => {
  const [form, setForm] = useState({
    phone: '',
    location: '',
    skills: '',
    education: '',
    experience_level: ''
  });
  const [cv, setCv] = useState(null);
  const [currentCv, setCurrentCv] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('/profile')
      .then((res) => {
        if (res.data.profile) {
          setForm({
            phone: res.data.profile.phone || '',
            location: res.data.profile.location || '',
            skills: res.data.profile.skills || '',
            education: res.data.profile.education || '',
            experience_level: res.data.profile.experience_level || ''
          });
          setCurrentCv(res.data.profile.cv_file || '');
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Could not load profile');
      })
      .finally(() => setLoading(false));
  }, []);

  const completedItems = [
    form.phone,
    form.location,
    form.skills,
    form.education,
    form.experience_level,
    cv || currentCv
  ].filter((value) => String(value || '').trim() !== '').length;

  const completion = Math.round((completedItems / 6) * 100);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setSaving(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (cv) data.append('cv', cv);

    try {
      const res = await api.put('/profile/job-seeker', data);
      setCurrentCv(res.data.profile.cv_file || '');
      setCv(null);
      setMessage('Profile saved successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="card-body">
        <h1 className="h3 mb-3">Job Seeker Profile</h1>

        <div className="border rounded p-3 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Profile completion</strong>
            <strong>{completion}%</strong>
          </div>

          <div
            className="progress"
            role="progressbar"
            aria-label="Profile completion"
            aria-valuenow={completion}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar"
              style={{ width: `${completion}%` }}
            />
          </div>

          <p className="small text-secondary mt-2 mb-0">
            {completedItems} of 6 profile items completed.
            {completion === 100
              ? ' Your profile is complete!'
              : ' Complete the remaining fields to improve your profile.'}
          </p>
        </div>

        <AlertMessage type="success" message={message} />
        <AlertMessage message={error} />

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              className="form-control"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Experience level</label>
            <input
              className="form-control"
              value={form.experience_level}
              onChange={(e) =>
                setForm({ ...form, experience_level: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">CV</label>
            <input
              className="form-control"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCv(e.target.files[0] || null)}
            />
            {currentCv && (
              <a
                className="small d-inline-block mt-2"
                href={uploadUrl(currentCv)}
                target="_blank"
                rel="noreferrer"
              >
                View current CV
              </a>
            )}
          </div>

          <div className="col-12">
            <label className="form-label">Skills</label>
            <textarea
              className="form-control"
              rows="3"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
          </div>

          <div className="col-12">
            <label className="form-label">Education</label>
            <textarea
              className="form-control"
              rows="3"
              value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
            />
          </div>
        </div>

        <button className="btn btn-primary mt-3" disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
};

export default JobSeekerProfile;
