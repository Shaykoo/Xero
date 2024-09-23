import React, { useEffect, useState } from 'react';
import { getReport } from './service/report-service';
import { ReportResponse, ReportRow } from './types/reportTypes';
import './App.css';

const App: React.FC = () => {
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await getReport();
        setReportData(data);
      } catch (err) {
        setError('Failed to fetch the Report');
      }
    };

    fetchReport();
  }, []);

  const toggleSection = (sectionTitle: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  if (error) return <p className="error">{error}</p>;
  if (!reportData) return <p className="loading">Loading.....</p>;

  return (
    <div>
      <h1>Report: {reportData.Reports[0].ReportName}</h1>
      <div>
        {reportData.Reports[0].ReportTitles.map((title, index) => (
          <span key={index} className="titleCapsule">
            {title}
          </span>
        ))}
      </div>
      {reportData.Reports[0].Rows.map((row: ReportRow, index: number) => {
        if (row.RowType === 'Section') {
          return (
            <div key={index}>
              <div className="sectionHeader" onClick={() => toggleSection(row.Title!)}>
                <strong>{row.Title}</strong>
              </div>
              {openSections[row.Title!] && row.Rows?.map((subRow, subIndex) => (
                <div key={subIndex} style={{ paddingLeft: '20px' }}>
                  {subRow.RowType === 'Row' && (
                    <div className="rowDetails">
                      {subRow.Cells.map((cell, cellIndex) => (
                        <span key={cellIndex} className="cellValue">{cell.Value || 'N/A'}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default App;
