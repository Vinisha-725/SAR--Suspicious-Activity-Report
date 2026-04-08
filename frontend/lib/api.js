const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

async function request(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('sar_token') : null;

  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }

  return res.json();
}

export const api = {
  // Auth
  login: (credentials) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  logout: () =>
    request('/auth/logout', { method: 'POST' }),

  // Dashboard
  getDashboardStats: () => request('/dashboard/stats'),
  getAlertsTrend: (days = 30) => request(`/dashboard/alerts-trend?days=${days}`),
  getRiskDistribution: () => request('/dashboard/risk-distribution'),
  getRecentCases: (limit = 10) => request(`/dashboard/recent-cases?limit=${limit}`),

  // Alerts
  getAlerts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/alerts${qs ? `?${qs}` : ''}`);
  },
  getAlert: (id) => request(`/alerts/${id}`),
  updateAlertStatus: (id, status) =>
    request(`/alerts/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  assignAlert: (id, userId) =>
    request(`/alerts/${id}/assign`, { method: 'PATCH', body: JSON.stringify({ userId }) }),

  // Cases
  getCases: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/cases${qs ? `?${qs}` : ''}`);
  },
  getCase: (id) => request(`/cases/${id}`),
  createCase: (data) =>
    request('/cases', { method: 'POST', body: JSON.stringify(data) }),
  updateCase: (id, data) =>
    request(`/cases/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  getCaseTransactions: (id) => request(`/cases/${id}/transactions`),
  getCaseNotes: (id) => request(`/cases/${id}/notes`),
  addCaseNote: (id, note) =>
    request(`/cases/${id}/notes`, { method: 'POST', body: JSON.stringify({ note }) }),

  // SAR Filing
  getSarDraft: (caseId) => request(`/sar/${caseId}/draft`),
  saveSarDraft: (caseId, data) =>
    request(`/sar/${caseId}/draft`, { method: 'PUT', body: JSON.stringify(data) }),
  submitSar: (caseId, data) =>
    request(`/sar/${caseId}/submit`, { method: 'POST', body: JSON.stringify(data) }),
  getSarList: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/sar${qs ? `?${qs}` : ''}`);
  },

  // Investigations
  getInvestigations: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/investigations${qs ? `?${qs}` : ''}`);
  },
  getInvestigation: (id) => request(`/investigations/${id}`),

  // Audit Logs
  getAuditLogs: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/audit-logs${qs ? `?${qs}` : ''}`);
  },

  // Settings
  getSettings: () => request('/settings'),
  updateSettings: (data) =>
    request('/settings', { method: 'PUT', body: JSON.stringify(data) }),
  getUsers: () => request('/settings/users'),
  inviteUser: (data) =>
    request('/settings/users/invite', { method: 'POST', body: JSON.stringify(data) }),
};