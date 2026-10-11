
import { useEffect, useState } from 'react';
import api from '../services/api';
import Loading from '../components/Loading';
import StatusBadge from '../components/StatusBadge';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api
      .get('/applications/my-applications')
      .then((res) => setApplications(res.data.applications))
      .catch((err) => {
        console.error('Failed to load applications:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const statuses = ['All', 'Pending', 'Shortlisted', 'Rejected', 'Hired'];

  const filteredApplications =
    filter === 'All'
      ? applications
      : applications.filter(
          (app) => app.status?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="h3 mb-3">My Applications</h1>

        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="border rounded p-3 h-100">
              <div className="text-secondary small">Total applications</div>
              <h3 className="mb-0">{applications.length}</h3>
            </div>
          </div>

          {statuses.slice(1).map((status) => (
            <div className="col-6 col-md-3" key={status}>
              <div className="border rounded p-3 h-100">
                <div className="text-secondary small">{status}</div>
                <h3 className="mb-0">
                  {
                    applications.filter(
                      (app) =>
                        app.status?.toLowerCase() === status.toLowerCase()
                    ).length
                  }
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          <label htmlFor="application-status-filter" className="form-label mb-0">
            Filter by status:
          </label>

          <select
            id="application-status-filter"
            className="form-select"
            style={{ maxWidth: '220px' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Job</th>
                <th>Company</th>
                <th>Applied</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td>{app.job_title}</td>
                  <td>{app.company_name}</td>
                  <td>{String(app.applied_at).slice(0, 10)}</td>
                  <td><StatusBadge status={app.status} /></td>
                </tr>
              ))}

              {!filteredApplications.length && (
                <tr>
                  <td colSpan="4" className="text-secondary">
                    {applications.length
                      ? `No applications with status "${filter}".`
                      : 'No applications found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
