import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import AlertMessage from '../components/AlertMessage';
import Loading from '../components/Loading';

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadSavedJobs = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await api.get('/saved-jobs');
      setJobs(res.data.jobs);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load saved jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const handleRemove = async (jobId) => {
    setError('');
    setMessage('');

    try {
      await api.delete(`/saved-jobs/${jobId}`);
      setJobs((currentJobs) => currentJobs.filter((job) => job.id !== jobId));
      setMessage('Job removed from your saved jobs.');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not remove saved job');
    }
  };

  return (
    <div>
      <h1 className="h3 mb-1">Saved Jobs</h1>
      <p className="text-secondary mb-4">
        Keep track of opportunities you want to explore later.
      </p>

      <AlertMessage message={error} />
      <AlertMessage message={message} />

      {loading ? (
        <Loading />
      ) : jobs.length === 0 ? (
        <div className="card">
          <div className="card-body">
            <p className="mb-2">You haven't saved any jobs yet.</p>
            <Link className="btn btn-primary btn-sm" to="/jobs">
              Browse Jobs
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-3">
          {jobs.map((job) => (
            <div className="col-12 col-xl-6" key={job.id}>
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h2 className="h5">{job.title}</h2>
                  <p className="text-secondary mb-2">
                    {job.company_name || job.employer_name || 'Company not listed'}
                  </p>
                  <p className="small text-secondary">
                    {job.location} · {job.job_type}
                    {job.salary_range ? ` · ${job.salary_range}` : ''}
                  </p>
                  <p className="flex-grow-1">
                    {job.description?.slice(0, 160)}
                    {job.description?.length > 160 ? '...' : ''}
                  </p>
                  <div className="d-flex gap-2 flex-wrap">
                    <Link className="btn btn-primary btn-sm" to={`/jobs/${job.id}`}>
                      View Job
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(job.id)}
                    >
                      Remove Saved Job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
