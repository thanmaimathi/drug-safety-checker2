'use client';

import { useTheme, useWidgetState, useWidgetSDK } from '@nitrostack/widgets';

interface SafetyReportData {
  drug?: {
    id: string;
    name: string;
    activeIngredients: string[];
    strength: string;
    manufacturer: string;
    imageUrl: string;
    approved: boolean;
    formulation: string;
  } | null;
  isAuthentic: boolean;
  warning: string | null;
  error?: string;
  drugId?: string;
}

export default function SafetyReport() {
  const theme = useTheme();
  const { getToolOutput } = useWidgetSDK();
  const [state, setState] = useWidgetState<{ expanded: boolean }>(() => ({ expanded: false }));

  const data = getToolOutput<SafetyReportData>();

  if (!data) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: theme === 'dark' ? '#fff' : '#000' }}>
        Loading...
      </div>
    );
  }

  if (data.error) {
    return (
      <div style={{ padding: 24, color: theme === 'dark' ? '#fff' : '#000' }}>
        <h3>Drug Lookup Error</h3>
        <p>{data.error}</p>
        <p style={{ opacity: 0.8 }}>Requested ID: {data.drugId}</p>
      </div>
    );
  }

  const drug = data.drug;

  return (
    <div style={{ padding: 20, maxWidth: 720, color: theme === 'dark' ? '#fff' : '#000' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Safety Report</h2>
        <div style={{ marginLeft: 'auto', fontSize: 14, opacity: 0.9 }}>
          Authentic: {data.isAuthentic ? '✅' : '❌'}
        </div>
      </div>

      {!drug ? (
        <div style={{ padding: 12, borderRadius: 8, background: '#f3f4f6' }}>
          <p>No drug details available.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 16 }}>
          <img src={drug.imageUrl} alt={drug.name} style={{ width: 140, height: 140, objectFit: 'cover', borderRadius: 8 }} />

          <div style={{ flex: 1 }}>
            <h3 style={{ margin: '0 0 8px 0' }}>{drug.name}</h3>
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>{drug.manufacturer}</div>

            <div style={{ fontSize: 14, marginBottom: 8 }}>
              <strong>Strength:</strong> {drug.strength}
            </div>

            <div style={{ marginBottom: 8 }}>
              <strong>Active Ingredients:</strong>
              <ul style={{ margin: '6px 0 0 18px' }}>
                {drug.activeIngredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 8 }}>
              <button
                onClick={() => setState({ expanded: !state?.expanded })}
                style={{ padding: '8px 12px', borderRadius: 8, cursor: 'pointer' }}
              >
                {state?.expanded ? 'Hide Details' : 'Show Details'}
              </button>

              {state?.expanded && (
                <div style={{ marginTop: 12, fontSize: 13, opacity: 0.9 }}>
                  <div><strong>Formulation:</strong> {drug.formulation}</div>
                  <div style={{ marginTop: 8 }}><strong>Approved:</strong> {drug.approved ? 'Yes' : 'No'}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {data.warning && (
        <div style={{ marginTop: 16, padding: 12, background: '#fff3cd', borderRadius: 8 }}>
          <strong>Warning:</strong>
          <div style={{ marginTop: 6 }}>{data.warning}</div>
        </div>
      )}
    </div>
  );
}
